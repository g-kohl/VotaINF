import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.css'
})
export class TestimonialCard {
  @Input() title: string = '';
  @Input() start_datetime: string = '';
  @Input() end_datetime: string = '';
  @Input() place: string = '';
  @Input() status: string = '';
  @Input() isRemote: boolean = false;
  @Input() isOngoing: boolean = false;
  @Input() isFinished: boolean = false;
  @Input() agendaId: number = 0;
}
