import { Component, OnInit } from '@angular/core';
import { AgendaItemService, AgendaItem } from '../../services/agenda-item.service';
import { AgendaService } from '../../services/agenda.service';
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
  agendaItemIds: AgendaItem[] = [];
  selectedItems: number[] = [];
  isRemoteMeeting: boolean = false;

  beginDate: string = '';
  beginTime: string = '';
  endDate: string = '';
  endTime: string = '';
  place: string = '';

  constructor(
    private agendaItemService: AgendaItemService,
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    this.agendaItemService.getAll().subscribe({
      next: (items) => {
        this.agendaItemIds = items.filter(item => item.status === 'nao-pautado');
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

  createMeeting(): void {
    if (this.selectedItems.length === 0) {
      console.warn("Nenhum item de pauta selecionado.");
      return;
    }

    if (!this.beginDate || !this.beginTime) {
      console.warn("Data e horário de início são obrigatórios.");
      return;
    }

    const begin = new Date(`${this.beginDate}T${this.beginTime}`);

    let end: Date | undefined = undefined;

    if (this.endDate && this.endTime) {
      end = new Date(`${this.endDate}T${this.endTime}`);
    }

    const place = this.place?.trim() || undefined;

    const body = {
      begin: begin.toISOString(),
      end: end ? end.toISOString() : undefined,
      place,
      agendaItemIds: this.selectedItems,
    };

    this.agendaService.createAgenda(body).subscribe({
      next: (agenda) => {
        console.log('Reunião criada com sucesso', agenda);
      },
      error: (err) => console.error('Erro ao criar reunião: ', err)
    });
  }
}