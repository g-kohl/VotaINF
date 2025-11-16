import { Component } from '@angular/core';
import { MeetingService } from './meeting.service';
import { AgendaItemService, AgendaItem } from '../../services/agenda-item.service';
import { AgendaService, Agenda } from '../../services/agenda.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  loaded = false;
  agenda?: Agenda;
  agendaItems: AgendaItem[] = [];
  votedItems: AgendaItem[] = [];
  voteDisabled = false;

  constructor(
    private agendaService: AgendaService,
    private agendaItemService: AgendaItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAgenda();
  }

  loadAgenda() {
    this.agendaService.getAll().subscribe(agendas => {
      const agendaId = this.route.snapshot.queryParamMap.get('agendaId');
      if (agendaId) {
        this.agenda = agendas.find(agenda => String(agenda.id) === agendaId);
        
      } else {
        this.agenda = undefined;
      }
      console.log('Agenda carregada:', this.agenda);
      this.loaded = true;
    });

    this.route.queryParamMap.subscribe(params => {
      const agendaId = params.get('agendaId');
      this.agendaItemService.getAll().subscribe(items => {
        if (agendaId) {
            this.agendaItems = items.filter(item => String(item.agendaId) === agendaId);
        } else {
          this.agendaItems = [];
          console.log("Nenhuma reunião carregada.")
        }
      });
    });
  }

  formatDate(date: Date | undefined, format = 'dd/MM/yyyy'): string {
    if (!date) return '';
    const pipe = new DatePipe('pt-BR');
    return pipe.transform(date, format) ?? '';
  }

  // get allVoted(): boolean {
  //   return this.agenda.length > 0 && this.agenda.every(item => !!item.vote);
  // }

  // submitVotes() {
  //   for(const item of this.agenda) {
  //     console.log(`${item.id}:`, item.vote);
  //     if(item.vote !== undefined) {
  //       this.meetingService.vote(item.id, item.vote).subscribe(updated => {
  //         //opcional
  //         const idx = this.agenda.findIndex(x => x.id === updated.id);

  //         if(idx >= 0)
  //           this.agenda[idx] = updated;

  //         console.log(`Voto registrado para ${updated.title}:`, updated);
  //         this.votedItems = [...this.agenda.map(item => ({ ...item }))];
  //         this.voteDisabled = true;
  //       })
  //     }
  //   }
  // }
}
