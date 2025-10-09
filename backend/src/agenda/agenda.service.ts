import { Injectable } from '@nestjs/common';
import { Agenda, AgendaItem } from './agenda.model';

@Injectable()
export class AgendaService {
  private agenda = new Agenda(1, [
    new AgendaItem(1, 'Aprovar orçamento'),
    new AgendaItem(2, 'Afastamento de professor'),
  ]);

  getAgenda(): Agenda {
    return this.agenda;
  }

  vote(itemId: number, vote: boolean) {
    const item = this.agenda.items.find(i => i.id === itemId);

    if (item) {
      if (vote)
        item.votesYes++;
      else
        item.votesNo++;
    }

    return item;
  }
}
