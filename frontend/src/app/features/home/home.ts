import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) { }

  navigateToMeeting() {
    this.router.navigate(['/meeting']);
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
