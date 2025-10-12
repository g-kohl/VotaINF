import { Component, OnInit } from '@angular/core';
import { MeetingService, AgendaItem, VoteOption } from './meeting.service';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting implements OnInit { // Implementamos a interface OnInit
  agenda: AgendaItem[] | null = null;
  loaded = false;

  constructor(private meetingService : MeetingService) {}

  // ************** A SOLUÇÃO CORRETA **************
  // Este método é executado automaticamente na inicialização do componente
  ngOnInit(): void {
    this.loadAgenda();
  }
  // **********************************************

  loadAgenda() {
    this.meetingService.getAgenda().subscribe({
      next: (data) => {
        this.agenda = data;
        this.loaded = true;
      },
      error: (err) => {
        console.log('Erro ao carregar pauta:', err);
        this.agenda = []; 
        this.loaded = true;
      }
    });
  }

  submitVote(item: AgendaItem, voto: VoteOption) {
    if (item.id !== undefined) {
        this.meetingService.vote(item.id, voto).subscribe({
            next: (updatedItem) => {
                const idx = this.agenda?.findIndex(x => x.id === updatedItem.id);

                if(this.agenda && idx !== undefined && idx >= 0) {
                  updatedItem.userVote = voto; 
                  this.agenda[idx] = updatedItem;
                }

                console.log(`Voto registrado para ${updatedItem.assunto}:`, updatedItem);
            },
            error: (err) => {
                console.log('Erro ao registrar voto:', err);
            }
        });
    }
  }

  getTotalVotes(item: AgendaItem): number {
    return (item.votesSim || 0) + (item.votesNao || 0) + (item.votesDiligencia || 0);
  }
}