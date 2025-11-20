import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() place: string | undefined = '';
  @Input() status: string = '';
  @Input() isRemote: boolean = false;
  @Input() isOngoing: boolean = false;
  @Input() isFinished: boolean = false;
  @Input() agendaId: number = 0;

  @Output() finishAgendaEvent = new EventEmitter<number>();

  /**
   * Emite um evento para finalizar a agenda atual.
   * 
   * Este método dispara o evento `finishAgendaEvent`, passando o identificador da agenda (`agendaId`)
   * como parâmetro. É utilizado para notificar o componente pai que a agenda foi finalizada manualmente.
   */
  finishAgenda() {
    this.finishAgendaEvent.emit(this.agendaId);
  }   
}
