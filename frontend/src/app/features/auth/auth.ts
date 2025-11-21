import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  login() {
    this.userService.login(this.username, this.password).subscribe({
      next: (user: any) => {
        this.userService.saveSession(user);
        this.router.navigate(['/menu']);
      },
      error: () => {
        alert("Usuário ou senha inválidos");
      }
    });
  }
}
