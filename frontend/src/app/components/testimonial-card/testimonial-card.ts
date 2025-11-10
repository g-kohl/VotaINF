import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
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
}
