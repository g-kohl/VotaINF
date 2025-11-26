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
 * Componente responsável por gerenciar uma reunião, incluindo o carregamento da agenda, itens da pauta,
 * controle de votação e exibição de resultados.
 *
 * @remarks
 * Utiliza serviços para buscar agendas, itens de pauta, usuários e votos. Controla o estado de carregamento,
 * votos realizados, resultados e lista de votantes. Fornece métodos utilitários para formatação de datas e períodos.
 *
 * @property loaded Indica se a agenda foi carregada com sucesso.
 * @property agenda Agenda atualmente selecionada.
 * @property agendaItems Lista de itens da pauta carregados.
 * @property votedItems Lista de itens da pauta já votados.
 * @property voteDisabled Indica se a votação está desabilitada.
 * @property usersVoted Lista de usuários que já votaram.
 * @property votes Registro dos votos do usuário atual, indexado pelo ID do item da pauta.
 * @property userId Identificador do usuário atual.
 * @property voteResults Resultados dos votos por item da pauta.
 * @property voters Lista de votantes da reunião.
 *
 * @constructor Injeta os serviços de agenda, itens de agenda, usuário, votos e rota ativada.
 *
 * @method ngOnInit Inicializa o componente, carregando usuário, agenda e lista de votantes.
 * @method getAgendaId Obtém o ID da agenda a partir da URL.
 * @method loadAgenda Carrega a agenda selecionada e seus itens.
 * @method loadAgendaItems Carrega os itens da pauta da agenda.
 * @method getVoters Busca e retorna a lista de votantes da pauta.
 * @method getVoteReport Busca e retorna o relatório de votos de um item da pauta.
 * @method formatDate Formata uma data para string conforme padrão especificado.
 * @method formatPeriod Formata o período da agenda em uma string legível.
 * @method onVote Registra a decisão de voto do usuário para um item da pauta.
 * @method submitVotes Envia os votos registrados para o backend.
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

  /**
   * Retorna a lista de votantes para uma determinada pauta.
   * 
   * Se a lista de votantes já estiver carregada em `this.voters`, ela é retornada imediatamente.
   * Caso contrário, faz uma requisição assíncrona para buscar os votantes através do `voteService`.
   * Enquanto a requisição está em andamento, retorna um array vazio.
   * 
   * @param agendaId Opcional. O ID da pauta para a qual os votantes devem ser buscados.
   * @returns Um array de strings representando os votantes, ou um array vazio se os dados ainda não estiverem disponíveis.
   */
  getVoters(agendaId?: number): string[] {
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

  /**
   * Retorna o relatório de votos para um determinado item de pauta.
   *
   * Se o resultado já estiver em cache, retorna imediatamente os dados armazenados.
   * Caso contrário, inicia uma busca assíncrona dos votos e retorna um objeto padrão
   * enquanto os dados não são carregados.
   *
   * @param agendaItemId - O identificador do item de pauta.
   * @returns Um objeto contendo o número de votos aprovados, reprovados, abstenções e a decisão.
   */
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
  
  /**
   * Formata um objeto Date em uma string conforme o formato especificado.
   *
   * @param date - A data a ser formatada. Se não for fornecida, retorna uma string vazia.
   * @param format - O formato desejado para a data (padrão: 'dd/MM/yyyy').
   * @returns A data formatada como string ou uma string vazia se a data não for fornecida.
   */
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
