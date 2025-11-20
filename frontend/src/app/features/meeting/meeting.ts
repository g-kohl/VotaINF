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
/**
 * Representa o componente de uma reunião, responsável por carregar e gerenciar a agenda e seus itens,
 * além de controlar o processo de votação dos itens da pauta.
 *
 * @remarks
 * Esta classe utiliza serviços para buscar agendas e itens de agenda, além de manipular o estado de votação.
 * Os métodos principais incluem o carregamento da agenda, formatação de datas e períodos, e (comentado) o envio dos votos.
 *
 * @example
 * // Instanciação e uso típico:
 * const meeting = new Meeting(agendaService, agendaItemService, route);
 * meeting.ngOnInit();
 *
 * @property loaded Indica se a agenda foi carregada.
 * @property agenda A agenda atualmente selecionada.
 * @property agendaItems Lista de itens da agenda carregados.
 * @property votedItems Lista de itens da agenda que já foram votados.
 * @property voteDisabled Indica se a votação está desabilitada.
 *
 * @constructor Recebe os serviços de agenda, itens de agenda e rota ativada.
 */
export class Meeting {
  loaded = false;
  agenda?: Agenda;
  agendaItems: AgendaItem[] = [];
  votedItems: AgendaItem[] = [];
  voteDisabled = false;
  usersVoted: string[] = [];

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

  formatDate(date?: Date | undefined, format = 'dd/MM/yyyy'): string {
    if (!date) return '';
    const pipe = new DatePipe('pt-BR');
    return pipe.transform(date, format) ?? '';
  }


  /**
   * Formata o período de uma agenda em uma string legível.
   *
   * @param agenda - Objeto do tipo Agenda contendo as datas de início e fim.
   * @returns Uma string formatada representando o período no formato "dd/MM/yyyy HH:mm - dd/MM/yyyy HH:mm" se houver data de fim,
   *          ou apenas a data de início se não houver. Retorna uma string vazia se a data de início não estiver definida.
   */
  formatPeriod(agenda?: Agenda): string {
    if (!agenda?.begin) return '';
    const beginDatetime = this.formatDate(agenda.begin, 'dd/MM/yyyy HH:mm');
    if (agenda?.end) {
      const endDatetime = this.formatDate(agenda.end, 'dd/MM/yyyy HH:mm');
      return `${beginDatetime} - ${endDatetime}`;
    }
    return beginDatetime;
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
