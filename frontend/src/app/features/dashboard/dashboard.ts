import { Component } from '@angular/core';
import { AgendaItemService } from '../../services/agenda-item.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  newItem = {
    title: '',
    description: ''
  };

  constructor(private agendaItemService : AgendaItemService) {}

  createAgendaItem() {
    this.agendaItemService.createAgendaItem(this.newItem).subscribe({
      next: () => {
        this.newItem = { title: '', description: ''}
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
