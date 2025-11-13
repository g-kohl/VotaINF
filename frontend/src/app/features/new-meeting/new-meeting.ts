import { Component, OnInit } from '@angular/core';
import { AgendaItemService, AgendaItem } from '../../services/agenda-item.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-meeting',
  standalone: false,
  templateUrl: './new-meeting.html',
  styleUrl: './new-meeting.css'
})
export class NewMeeting implements OnInit {
  agendaItems: AgendaItem[] = [];
  selectedItems: number[] = [];
  isRemoteMeeting: boolean = false;
  place: string = '';
  // bound to form-date and form-time components
  beginDate: string = '';
  beginTime: string = '';
  endDate: string = '';
  endTime: string = '';

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
    this.isRemoteMeeting = state;
  }

  formatDateCreation(item: AgendaItem, format = 'dd/MM/yyyy'): string {
    if (!item?.dateCreation) return '';
    const date = new Date(item.dateCreation);
    const pipe = new DatePipe('pt-BR');
    return pipe.transform(date, format) ?? '';
  }

  createMeeting(): void {
    const combine = (date: string | undefined, time: string | undefined) => {
      if (!date) return undefined;
      const t = time ?? '00:00';
      // construct ISO string in local time by using Date constructor with YYYY-MM-DDTHH:MM
      const iso = new Date(date + 'T' + t + ':00');
      return iso.toISOString();
    };

    let beginIso: string | undefined;
    let endIso: string | undefined;

    if (this.isRemoteMeeting) {
      beginIso = combine(this.beginDate, this.beginTime);
      endIso = combine(this.endDate, this.endTime);
    } else {
      beginIso = combine(this.beginDate, this.beginTime) ?? new Date().toISOString();
      endIso = undefined;
    }

    const dto = {
      begin: beginIso,
      end: endIso,
      place: this.place,
      itemIds: this.selectedItems
    };

    // POST to backend /agenda
    fetch('http://localhost:3000/agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    }).then(r => r.json())
      .then(data => {
        console.log('Agenda criada:', data);
        // optional: navigate to meeting page or show confirmation
      })
      .catch(err => console.error('Erro ao criar agenda:', err));
  }

}