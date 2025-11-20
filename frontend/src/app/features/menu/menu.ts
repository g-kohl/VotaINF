import { Component, OnInit } from '@angular/core';
import { AgendaService, Agenda } from '../../services/agenda.service';
import { DatePipe } from '@angular/common';

/**
 * Componente responsável por exibir o menu de reuniões/agendas.
 *
 * Este componente carrega e exibe uma lista de agendas, permitindo a formatação de datas e status para exibição.
 *
 * @remarks
 * Utiliza o serviço `AgendaService` para buscar as agendas e apresenta métodos utilitários para formatação de dados.
 *
 * @example
 * <app-meeting-menu></app-meeting-menu>
 */
@Component({
  selector: 'app-meeting-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  loaded = false;
  agendas: Agenda[] = [];

  /**
   * Cria uma nova instância da classe Menu.
   * 
   * @param agendaService Serviço responsável por gerenciar as operações relacionadas à agenda.
   */
  constructor(
    private agendaService: AgendaService,
  ) { }

  /**
   * Método do ciclo de vida do Angular chamado automaticamente após a criação do componente.
   * Utilizado para inicializar dados ou executar lógica necessária ao iniciar o componente.
   * Neste caso, chama o método `loadAgendas` para carregar as agendas ao iniciar.
   */
  searchId: string = '';
  searchBegin: string = '';
  searchEnd: string = '';

  /**
   * Método do ciclo de vida do Angular chamado automaticamente após a criação do componente.
   * Utilizado para inicializar dados ou executar lógica necessária ao iniciar o componente.
   * Neste caso, chama o método `loadAgendas` para carregar as agendas ao iniciar.
   */
  ngOnInit() {
    this.search();
  }

  /**
   * Carrega todas as agendas utilizando o serviço `agendaService`, ordenando-as por data de início em ordem decrescente.
   * Após o carregamento e ordenação, define a propriedade `loaded` como `true`.
   *
   * @remarks
   * Este método faz uma requisição assíncrona para buscar as agendas e atualiza a lista local de agendas.
   */
  loadAgendas() {
    this.search();
  }

  search() {
    const params: any = {};
    if (this.searchId) params.id = this.searchId;
    if (this.searchBegin) params.begin = this.searchBegin;
    if (this.searchEnd) params.end = this.searchEnd;

    this.agendaService.getAll(params).subscribe(agendas => {
      this.agendas = agendas.sort((a, b) => {
        const dateA = new Date(a.begin).getTime();
        const dateB = new Date(b.begin).getTime();
        return dateB - dateA; // decrescente
      });
      this.loaded = true;
    });
  }

  /**
   * Formata um objeto Date para uma string conforme o formato especificado.
   *
   * @param date - A data a ser formatada. Se não for fornecida, retorna uma string vazia.
   * @param format - O formato desejado para a data (padrão: 'dd/MM/yyyy, HH:mm').
   * @returns A data formatada como string ou uma string vazia se a data não for fornecida.
   */
  private datePipe = new DatePipe('pt-BR');
  formatDate(date?: Date | undefined, format = 'dd/MM/yyyy, HH:mm'): string {
    if (!date) return '';
    return this.datePipe.transform(date, format) ?? '';
  }

  /**
 * Formata o status de uma agenda para uma string legível em português.
 *
 * @param status - O status interno da agenda ('futuro', 'em-andamento', 'finalizada' ou outro).
 * @returns Uma string representando o status em português:
 * - 'Não iniciada' para 'futuro'
 * - 'Em andamento' para 'em-andamento'
 * - 'Encerrada' para 'finalizada'
 * - Erro caso não seja reconhecido
 */
  formatStatus(status: string): string {
    switch (status) {
      case 'futuro':
        return 'Não iniciada';
      case 'em-andamento':
        return 'Em andamento';
      case 'finalizada':
        return 'Encerrada';
      default:
        throw new Error('Status inválido!');
    }

  }

  /**
   * Formata o nome de um local, retornando uma mensagem padrão caso o valor seja indefinido ou vazio.
   *
   * @param place - O nome do local a ser formatado, ou undefined.
   * @returns O nome do local informado ou "Local não informado" se o valor for indefinido ou vazio.
   */
  formatPlace(place: string | undefined): string {
    if (!place || place === '') {
      place = 'Local não informado';
    }
    return place;
  }

  /**
   * Verifica se a agenda está com status "em andamento".
   *
   * @param agenda - O objeto Agenda a ser verificado.
   * @returns `true` se o status da agenda for "em-andamento", caso contrário `false`.
   */
  setOngoing(agenda: Agenda): boolean {
    return agenda.status === 'em-andamento';
  }

  /**
   * Verifica se a agenda foi finalizada.
   *
   * @param agenda - Objeto do tipo Agenda a ser verificado.
   * @returns `true` se o status da agenda for 'finalizada', caso contrário `false`.
   */
  setFinished(agenda: Agenda): boolean {
    return agenda.status === 'finalizada';
  }

  /**
   * Define se a agenda fornecida é do tipo remoto.
   *
   * @param agenda - O objeto Agenda a ser verificado.
   * @returns `true` se o formato da agenda for 'remoto', caso contrário `false`.
   */
  setRemoteAgenda(agenda: Agenda): boolean {
    return agenda.format === 'remoto';
  }

  /**
   * Finaliza uma Agenda manualmente.
   *
   * @param agendaId - O identificador da agenda a ser finalizada manualmente.
   */
  onFinishAgenda(agendaId: number) {
    console.log('finalizar agenda:', agendaId);
    this.agendaService.finishAgenda(agendaId).subscribe({
      next: () => {
        this.loadAgendas();
      },
      error: (err) => {
        console.error('Erro ao finalizar agenda:', err);
      }
    });
  }
}
