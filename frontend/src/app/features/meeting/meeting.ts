import { Component } from '@angular/core';
import { AgendaItemService, AgendaItem } from '../../services/agenda-item.service';
import { AgendaService, Agenda } from '../../services/agenda.service';
import { UserService } from '../../services/user.service';
import { VoteService } from '../../services/vote.service';
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
  votes: Record<number, string> = {};
  userId!: number;
  voteResults: Record<number, { approved: number; reproved: number; abstentions: string[]; decision: string }> = {};
  voters: string[] = [];

  constructor(
    private agendaService: AgendaService,
    private agendaItemService: AgendaItemService,
    private userService: UserService,
    private voteService: VoteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const user = this.userService.getUser();
    this.userId = user.id;
    const agendaId = this.getAgendaId();
    this.loadAgenda(agendaId);
    this.getVoters(agendaId);
  }

  /**
   * Retorna o valor do parâmetro 'agendaId' presente na URL como um número.
   * 
   * @returns O identificador da agenda como número. Caso o parâmetro não exista ou não seja um número válido, retorna NaN.
   */
  getAgendaId(): number {
    const agendaId = this.route.snapshot.queryParamMap.get('agendaId');
    return Number(agendaId);
  }

  /**
   * Carrega uma agenda específica pelo seu ID.
   *
   * Busca em `agendaService` a Agenda correspondente ao ID fornecido.
   * Ao carregar, chama `loadAgendaItems` para carregar os itens da agenda.
   *
   * @param agendaId O identificador da agenda a ser carregada.
   */
  loadAgenda(agendaId: number) {
    this.agendaService.getAll().subscribe({
      next: agendas => {
        this.agenda = agendas.find(agenda => agenda.id === agendaId);
        this.loaded = true;
      },
      error: err => {
        this.agenda = undefined;
        this.loaded = false;
        alert('Erro ao carregar a agenda.');
        console.error('Erro ao carregar a agenda:', err);
      }
    });

    this.loadAgendaItems(agendaId);
  }

  /**
   * Carrega os itens da agenda associados ao ID fornecido.
   *
   * Utiliza o serviço `agendaService` para buscar os itens da agenda a partir do ID informado.
   * Ao obter sucesso, armazena os itens em `agendaItems` e define `loaded` como `true`.
   * Em caso de erro, define `loaded` como `false`, exibe um alerta informando que a reunião não existe
   * e registra o erro no console.
   *
   * @param agendaId O identificador da agenda cujos itens devem ser carregados.
   */
  private loadAgendaItems(agendaId: number) {
    this.agendaService.getAgendaItems(Number(agendaId)).subscribe({
      next: items => {
        this.agendaItems = items;
        this.loaded = true;
        this.agendaItems.forEach(item => {
          this.getVoteReport(item.id);
        });
      },
      error: err => {
        this.loaded = false;
        alert('Esta reunião não existe.');
        console.error('Erro ao carregar itens da agenda:', err);
      }
    });


  }

  getVoters(agendaId?: number): string[] {
    console.log("oi")
    if (this.voters.length > 0) {
      return this.voters;
    }

    this.voteService.getVoters(agendaId).subscribe({
      next: voters => {
        this.voters = voters;
      },
      error: err => {
        console.error("Erro ao carregar lista de votantes:", err);
      }
    });

    return [];
  }

  getVoteReport(agendaItemId: number): { approved: number; reproved: number; abstentions: string[]; decision: string } {
    // Se já temos o resultado em cache, retorna imediatamente
    if (this.voteResults[agendaItemId]) {
      return this.voteResults[agendaItemId];
    }

    // Busca assíncrona, mas retorna undefined por enquanto
    this.voteService.getVotes(agendaItemId).subscribe({
      next: votes => {
        const result = { approved: votes.approved, reproved: votes.reproved, abstentions: votes.abstentions, decision: votes.decision };
        this.voteResults[agendaItemId] = result;
      },
      error: err => {
        console.error("Erro ao carregar relatório de votos:", err);
      }
    });

    return { approved: 0, reproved: 0, abstentions: [], decision: ''  };
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

  onVote(itemId: number, decision: string) {
    this.votes[itemId] = decision;
  }

  submitVotes(){
    const entries = Object.entries(this.votes);

    if(entries.length == 0){
      alert("Nenhum voto selecionado");
      return;
    }

    let pending = entries.length;
    let errors = 0;

    entries.forEach(([itemId, decision]) => {
      this.voteService.submitVote(this.userId, Number(itemId), decision).subscribe({
        next: () => {
          pending--;

          if(pending === 0 && errors === 0) {
            alert("Votos registrados com sucesso");
          }
        },
        error: () => {
          errors++;
          pending--;

          if(pending === 0) {
            alert("Alguns votos não puderam ser registrados");
          }
        }
      });
    });
  }


}
