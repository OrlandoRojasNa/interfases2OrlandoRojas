
@Injectable({
  providedIn: 'root',
})
export class Data {}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // La URL de tu API de Node.js en Docker
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Obtener especialistas para la agenda
  getEspecialistas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/especialistas`);
  }

  // Obtener productos para el e-commerce
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  // Enviar una nueva cita a la DB
  agendarCita(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agendar`, datos);
  }
}