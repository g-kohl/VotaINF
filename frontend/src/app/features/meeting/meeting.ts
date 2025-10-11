import { Component } from '@angular/core';
import { MeetingService, Agenda } from './meeting.service';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  agenda: Agenda | null = null; // Changed from AgendaItem[] to Agenda
  loaded = false;

  constructor(private meetingService : MeetingService) {}

  loadAgenda() {
    this.meetingService.getAgenda().subscribe({
      next: (data) => {
        this.agenda = data; // Now you can assign the whole agenda object
        this.loaded = true;
      },
      error: (err) => {
        console.log('Erro ao carregar pauta:', err);
      }
    });
  }

  submitVotes() {
    // You'll need to use optional chaining here
    if (this.agenda && this.agenda.items) {
      for(const item of this.agenda.items) {
        if(item.vote !== undefined) {
          this.meetingService.vote(item.id, item.vote).subscribe(updated => {
            const idx = this.agenda?.items.findIndex(x => x.id === updated.id);

            if(idx !== undefined && idx >= 0) {
              this.agenda!.items[idx] = updated;
            }

            console.log(`Voto registrado para ${updated.title}:`, updated);
          });
        }
      }
    }
  }
}