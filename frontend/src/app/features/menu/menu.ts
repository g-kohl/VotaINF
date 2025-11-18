import { Component } from '@angular/core';
import { AgendaService, Agenda } from '../../services/agenda.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meeting-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  loaded = false;
  agendas: Agenda[] = [];

  constructor(
    private agendaService: AgendaService,
  ) {}

  ngOnInit() {
    this.loadAgendas();
  }

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

  formatDate(date?: Date | undefined, format = 'dd/MM/yyyy, HH:mm'): string {
    if (!date) return '';
    const pipe = new DatePipe('pt-BR');
    return pipe.transform(date, format) ?? '';
  }
}
