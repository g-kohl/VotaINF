import { Component } from '@angular/core';
import { MeetingService, AgendaItem, VoteOption } from './meeting.service';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  // agenda é o array de AgendaItem[] retornado pelo serviço
  agenda: AgendaItem[] | null = null;
  loaded = false;

  constructor(private meetingService : MeetingService) {}

  loadAgenda() {
    this.meetingService.getAgenda().subscribe({
      next: (data) => {
        // O serviço agora retorna um array, não um objeto com .items
        this.agenda = data;
        this.loaded = true;
      },
      error: (err) => {
        console.log('Erro ao carregar pauta:', err);
      }
    });
  }

  /**
   * Submete o voto ao backend e atualiza a lista local com os resultados agregados.
   */
  submitVote(item: AgendaItem, voto: VoteOption) {
    if (item.id !== undefined) {
        this.meetingService.vote(item.id, voto).subscribe({
            next: (updatedItem) => {
                const idx = this.agenda?.findIndex(x => x.id === updatedItem.id);

                if(this.agenda && idx !== undefined && idx >= 0) {
                  // Mantém o userVote para o estado visual do radio button
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

  /**
   * Função auxiliar para calcular o total de votos (para exibição).
   */
  getTotalVotes(item: AgendaItem): number {
    return item.votesSim + item.votesNao + item.votesDiligencia;
  }
}