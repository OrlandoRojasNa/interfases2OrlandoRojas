import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	registeredAt: string;
}

export interface StoredUser extends UserProfile {
	password: string;
}

export interface RegisterPayload {
	name: string;
	email: string;
	phone: string;
	password: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

const USERS_STORAGE_KEY = 'sofia-safar-users';
const CURRENT_USER_STORAGE_KEY = 'sofia-safar-current-user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly currentUserSubject = new BehaviorSubject<UserProfile | null>(this.loadCurrentUser());

	readonly currentUser$: Observable<UserProfile | null> = this.currentUserSubject.asObservable();

	get currentUser(): UserProfile | null {
		return this.currentUserSubject.value;
	}

	/**
	 * Registra un nuevo usuario y lo deja autenticado.
	 */
	register(payload: RegisterPayload): UserProfile {
		const users = this.getUsers();
		const normalizedEmail = payload.email.trim().toLowerCase();

		if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
			throw new Error('Ya existe una cuenta con ese correo electrónico.');
		}

		const user: StoredUser = {
			id: this.createId(),
			name: payload.name.trim(),
			email: normalizedEmail,
			phone: payload.phone.trim(),
			password: payload.password,
			registeredAt: new Date().toISOString(),
		};

		users.push(user);
		this.saveUsers(users);

		const profile = this.toProfile(user);
		this.setCurrentUser(profile);
		return profile;
	}

	/**
	 * Inicia sesión con correo y contraseña.
	 */
	login(payload: LoginPayload): UserProfile {
		const normalizedEmail = payload.email.trim().toLowerCase();
		const user = this.getUsers().find((item) => item.email.toLowerCase() === normalizedEmail);

		if (!user || user.password !== payload.password) {
			throw new Error('Correo o contraseña incorrectos.');
		}

		const profile = this.toProfile(user);
		this.setCurrentUser(profile);
		return profile;
	}

	/**
	 * Cierra la sesión actual y limpia el estado persistido.
	 */
	logout(): void {
		this.setCurrentUser(null);
	}

	private loadCurrentUser(): UserProfile | null {
		return this.readJson<UserProfile>(CURRENT_USER_STORAGE_KEY);
	}

	private getUsers(): StoredUser[] {
		return this.readJson<StoredUser[]>(USERS_STORAGE_KEY) ?? [];
	}

	private saveUsers(users: StoredUser[]): void {
		this.writeJson(USERS_STORAGE_KEY, users);
	}

	private setCurrentUser(user: UserProfile | null): void {
		this.currentUserSubject.next(user);

		if (user) {
			this.writeJson(CURRENT_USER_STORAGE_KEY, user);
			return;
		}

		this.removeItem(CURRENT_USER_STORAGE_KEY);
	}

	private toProfile(user: StoredUser): UserProfile {
		const { password: _password, ...profile } = user;
		return profile;
	}

	private createId(): string {
		if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
			return crypto.randomUUID();
		}

		return `usr-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
	}

	private readJson<T>(key: string): T | null {
		if (typeof window === 'undefined') {
			return null;
		}

		const rawValue = window.localStorage.getItem(key);
		if (!rawValue) {
			return null;
		}

		try {
			return JSON.parse(rawValue) as T;
		} catch {
			return null;
		}
	}

	private writeJson(key: string, value: unknown): void {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(key, JSON.stringify(value));
	}

	private removeItem(key: string): void {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.removeItem(key);
	}
}