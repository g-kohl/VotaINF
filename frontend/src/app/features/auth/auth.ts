import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  username = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/menu']);
  }
}
