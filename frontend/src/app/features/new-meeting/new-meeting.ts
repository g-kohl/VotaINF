import { Component, OnInit } from '@angular/core';
import { AgendaItemService, AgendaItem } from '../../services/agenda-item.service';

@Component({
  selector: 'app-new-meeting',
  standalone: false,
  templateUrl: './new-meeting.html',
  styleUrl: './new-meeting.css'
})
export class NewMeeting implements OnInit {
  agendaItems: AgendaItem[] = [];
  selectedItems: number[] = [];

  constructor(private agendaItemService: AgendaItemService) { }

  ngOnInit(): void {
    this.agendaItemService.getAll().subscribe({
      next: (items) => (this.agendaItems = items),
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
    console.log('Estado do toggle:', state);
  }
}
