import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() title: string | undefined = '';
  @Input() subtitle: string | undefined = '';
}
