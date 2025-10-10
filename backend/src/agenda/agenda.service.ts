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

  // vote: 'yes' | 'no' | 'abstain'
  vote(itemId: number, vote: string) {
    const item = this.agenda.items.find(i => i.id === itemId);

    if (item) {
      if (vote === 'yes')
        item.votesYes++;
      else if (vote === 'no')
        item.votesNo++;
      else if (vote === 'abstain')
        item.votesAbstain++;
    }

    return item;
  }
}
