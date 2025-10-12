export class AgendaItem {
  id: number;
  title: string;
  description: string;
  vote: string;

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.vote = '';
  }
}

export class Agenda {
  id: number;
  items: AgendaItem[];

  constructor(id: number, items: AgendaItem[]) {
    this.id = id;
    this.items = items;
  }
}