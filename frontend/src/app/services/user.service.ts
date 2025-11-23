import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/user/login', {
      username,
      password
    });
  }

  saveSession(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLogged() {
    return this.getUser() !== null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}