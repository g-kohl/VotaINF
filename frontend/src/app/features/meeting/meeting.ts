import { Component } from '@angular/core';
import { MeetingService, AgendaItem } from './meeting.service';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  loaded = false;
  agenda: AgendaItem[] = [];
  votedItems: AgendaItem[] = [];
  voteDisabled = false;

  constructor(private meetingService : MeetingService) {}

  ngOnInit() {
    this.loadAgenda();
  }

  loadAgenda() {
    this.meetingService.getAgenda().subscribe({
      next: (data) => {
        this.agenda = data.items.map(item => ({
          ...item,
          vote: item.vote ?? '' // inicializa vote como string vazia se undefined
        }));
        this.loaded = true;
      },
      error: (err) => {
        console.log('Erro ao carregar pauta:', err);
      }
    });
  }

  submitVotes() {
    for(const item of this.agenda) {
      console.log(`${item.id}:`, item.vote);
      if(item.vote !== undefined) {
        this.meetingService.vote(item.id, item.vote).subscribe(updated => {
          //opcional
          const idx = this.agenda.findIndex(x => x.id === updated.id);

          if(idx >= 0)
            this.agenda[idx] = updated;

          console.log(`Voto registrado para ${updated.title}:`, updated);
          this.votedItems = [...this.agenda.map(item => ({ ...item }))];
          this.voteDisabled = true;
        })
      }
    }
  }
}
