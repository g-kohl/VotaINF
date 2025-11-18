import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  // Assuming 'username' field is used for the user's email
  username = ''; 
  password = '';

  // 2. Inject the AuthService
  constructor(
    private router: Router,
    private authService: AuthService
) { }

  login() {
    // 3. Call the service method, using 'username' as 'email'
    this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
            // SUCCESS: resposta contém o objeto do usuário (sem a senha hasheada)
            console.log('Login successful. User:', response);

            // Use the 'role' property returned from the backend
            // Aqui é apenas uma demonstração, mas o "role" e "nome" precisam estar armazenados em algum lugar
            // para restringir as páginas disponíveis aos usuários com base no "role"
            // e o "nome" também para que seja enviado ao votar

            if (response && response.role === 'admin') {
                this.router.navigate(['/nova-pauta']);
            } else {
                this.router.navigate(['/home']);
            }
        },
        error: (error) => {
            // ERROR: Backend validation failed (e.g., 404/401 status)
            console.error('Login failed:', error);
            // Show a generic error message to the user
            alert('Login failed. Please check your email and password.'); 
        }
    });
  }
}