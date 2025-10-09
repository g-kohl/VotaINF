import { Component } from '@angular/core';
import { MeetingService, AgendaItem } from './meeting.service';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  agenda: AgendaItem[] = [];
  loaded = false;

  constructor(private meetingService : MeetingService) {}

  loadAgenda() {
    this.meetingService.getAgenda().subscribe({
      next: (data) => {
        this.agenda = data.items;
        this.loaded = true;
      },
      error: (err) => {
        console.log('Erro ao carregar pauta:', err);
      }
    });
  }

  submitVotes() {
    for(const item of this.agenda) {
      if(item.vote !== undefined) {
        this.meetingService.vote(item.id, item.vote).subscribe(updated => {
          //opcional
          const idx = this.agenda.findIndex(x => x.id === updated.id);

          if(idx >= 0)
            this.agenda[idx] = updated;

          console.log(`Voto registrado para ${updated.title}:`, updated);
        })
      }
    }
  }
}
