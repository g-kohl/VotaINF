export class AgendaItem {
  id: number;
  title: string;
  votesApprove: number;
  votesReprove: number;
  votesAbstain: number;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.votesApprove = 0;
    this.votesReprove = 0;
    this.votesAbstain = 0;
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