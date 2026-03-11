import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  uploadDocument(file: File, tipoFormato: string = 'estandar') {

    const formData = new FormData();
    formData.append("file", file);

    const params = new HttpParams().set('tipo_formato', tipoFormato);

    return this.http.post<any>(`${this.API_URL}/analyze`, formData, { params });

  }

}