import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthUser {
  email: string;
  displayName: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

const AUTH_STORAGE_KEY = 'sofia-safar-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly stateSubject = new BehaviorSubject<AuthState>(this.readInitialState());

  readonly state$ = this.stateSubject.asObservable();

  get snapshot(): AuthState {
    return this.stateSubject.value;
  }

  login(email: string, displayName?: string): void {
    const nextState: AuthState = {
      isAuthenticated: true,
      user: {
        email,
        displayName: displayName?.trim() || this.buildDisplayName(email),
      },
    };

    this.persistState(nextState);
    this.stateSubject.next(nextState);
  }

  logout(): void {
    const nextState: AuthState = {
      isAuthenticated: false,
      user: null,
    };

    this.persistState(nextState);
    this.stateSubject.next(nextState);
  }

  private readInitialState(): AuthState {
    if (!isPlatformBrowser(this.platformId)) {
      return { isAuthenticated: false, user: null };
    }

    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedValue) {
      return { isAuthenticated: false, user: null };
    }

    try {
      const parsedState = JSON.parse(storedValue) as AuthState;

      if (parsedState?.isAuthenticated && parsedState.user?.email) {
        return parsedState;
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    return { isAuthenticated: false, user: null };
  }

  private persistState(state: AuthState): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (state.isAuthenticated) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  private buildDisplayName(email: string): string {
    const userPart = email.split('@')[0] || 'Usuario';

    return userPart
      .replace(/[._-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (character) => character.toUpperCase()) || 'Usuario';
  }
}
