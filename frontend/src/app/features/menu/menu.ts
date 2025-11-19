import { Component } from '@angular/core';
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
export class Menu {
  loaded = false;
  agendas: Agenda[] = [];

  /**
   * Cria uma nova instância da classe Menu.
   * 
   * @param agendaService Serviço responsável por gerenciar as operações relacionadas à agenda.
   */
  constructor(
    private agendaService: AgendaService,
  ) {}

  /**
   * Método do ciclo de vida do Angular chamado automaticamente após a criação do componente.
   * Utilizado para inicializar dados ou executar lógica necessária ao iniciar o componente.
   * Neste caso, chama o método `loadAgendas` para carregar as agendas ao iniciar.
   */
  ngOnInit() {
    this.loadAgendas();
  }

  /**
   * Carrega todas as agendas utilizando o serviço `agendaService`, ordenando-as por data de início em ordem decrescente.
   * Após o carregamento e ordenação, define a propriedade `loaded` como `true`.
   *
   * @remarks
   * Este método faz uma requisição assíncrona para buscar as agendas e atualiza a lista local de agendas.
   */
  loadAgendas() {
    this.agendaService.getAll().subscribe(agendas => {
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
  formatDate(date?: Date | undefined, format = 'dd/MM/yyyy, HH:mm'): string {
    if (!date) return '';
    const pipe = new DatePipe('pt-BR');
    return pipe.transform(date, format) ?? '';
  }
  
  /**
   * Formata o status de uma votação para uma string legível em português.
   *
   * @param status - O status interno da votação ('futuro', 'em-andamento', 'finalizada' ou outro).
   * @returns Uma string representando o status em português:
   * - 'Não iniciada' para 'futuro'
   * - 'Em andamento' para 'em-andamento'
   * - 'Encerrada' para 'finalizada'
   * - O próprio valor de status caso não seja reconhecido
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

  formatPlace(place: string | undefined): string | undefined {
    switch (place) {
      case null:
      case '':
        return 'Local não informado';
      default:
        return place;
    }
  }

  setOngoing(agenda: Agenda): boolean {
    let isOngoing = false;
    if (agenda.status === 'em-andamento') {
      isOngoing = true;
    }
    return isOngoing;
  }

  setFinished(agenda: Agenda): boolean {
    let isFinished = false;
    if (agenda.status === 'finalizada') {
      isFinished = true;
    }
    return isFinished;
  }


  setRemoteAgenda(agenda: Agenda): boolean {
    let isRemote = false;
    if (agenda.format === 'remoto') {
      isRemote = true;
    }
    return isRemote;
  }

}
