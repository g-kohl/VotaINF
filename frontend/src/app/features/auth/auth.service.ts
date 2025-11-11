import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // endpoint de login, definido em ../backend/src/user/user.controller.ts
  private loginUrl = 'http://localhost:3000/user/login'; 
  
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<any> {
    // 1. O payload precisa ser a estrutura esperada pelo backend
    const credentials = { email, password };    
    // 2. Faz a requisição POST
    return this.http.post(this.loginUrl, credentials);
  }
}