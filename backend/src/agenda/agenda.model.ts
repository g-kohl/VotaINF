export class AgendaItem {
  id: number;
  title: string;
  votesYes: number;
  votesNo: number;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.votesYes = 0;
    this.votesNo = 0;
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