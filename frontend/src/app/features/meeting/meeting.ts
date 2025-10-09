import { Component } from '@angular/core';

interface AgendaItem {
  id: number;
  title: string;
  vote?: boolean;
}

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  agenda: AgendaItem[] = [];
  loaded = false;

  loadAgenda() {
    this.agenda = [
      { id: 1, title: 'aprovar orçamento' },
      { id: 2, title: 'afastamento de professor' }
    ]

    this.loaded = true;
  }

  submitVotes() {
    console.log('Votos registrados: ', this.agenda);
  }
}
