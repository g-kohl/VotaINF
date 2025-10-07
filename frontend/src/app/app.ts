import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  message = signal('Conectando ao backend...');

  constructor() {
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(data => this.message.set(data))
      .catch(() => this.message.set('Erro ao conectar com o back-end!'));
  }
}
