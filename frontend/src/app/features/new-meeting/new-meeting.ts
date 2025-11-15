import { Component, OnInit } from '@angular/core';
import { AgendaItemService, AgendaItem } from '../../services/agenda-item.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-meeting',
  standalone: false,
  templateUrl: './new-meeting.html',
  styleUrl: './new-meeting.css'
})
/**
 * Componente responsável pela criação de uma nova reunião.
 * 
 * Gerencia a seleção de itens de pauta disponíveis, o tipo de reunião (remota ou presencial)
 * e a formatação de datas para exibição. Utiliza o serviço `AgendaItemService` para buscar
 * os itens de pauta e mantém o estado dos itens selecionados.
 * 
 * @remarks
 * Este componente faz parte do fluxo de criação de reuniões e deve ser utilizado
 * quando for necessário selecionar itens de pauta ainda não pautados.
 * 
 * @example
 * // Exemplo de uso no template:
 * <app-new-meeting></app-new-meeting>
 */
export class NewMeeting implements OnInit {
  agendaItems: AgendaItem[] = [];
  selectedItems: number[] = [];
  isRemoteMeeting: boolean = false;

  constructor(private agendaItemService: AgendaItemService) { }

  /**
   * Método do ciclo de vida do Angular chamado na inicialização do componente.
   * Busca todos os itens de pauta através do serviço `agendaItemService` e filtra apenas aqueles com status 'nao-pautado'.
   * Em caso de erro na requisição, exibe o erro no console.
   */
  ngOnInit(): void {
    this.agendaItemService.getAll().subscribe({
      next: (items) => {
        this.agendaItems = items.filter(item => item.status === 'nao-pautado');
      },
      error: (err) => console.error('Erro ao buscar itens de pauta: ', err)
    });
  }

  toggleItem(id: number, checked: boolean): void {
    if (checked) {
      this.selectedItems.push(id);
    }
    else {
      this.selectedItems = this.selectedItems.filter(itemId => itemId !== id);
    }
  }

  onToggle(state: boolean) {
    this.isRemoteMeeting = state;
  }

  formatDateCreation(item: AgendaItem, format = 'dd/MM/yyyy'): string {
    if (!item?.dateCreation) return '';
    const date = new Date(item.dateCreation);
    const pipe = new DatePipe('pt-BR');
    return pipe.transform(date, format) ?? '';
  }

}