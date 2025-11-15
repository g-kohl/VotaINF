import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AgendaItem } from "./agenda-item.service";
import { map } from "rxjs";

export interface Agenda {
  id: number;
  begin: Date;
  end?: Date;
  place?: string;
  agendaItemIds: AgendaItem[];
}

export interface CreateAgendaDto {
  begin: string;
  end?: string;
  place?: string;
  agendaItemIds: number[];
}

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private baseUrl = 'http://localhost:3000/agenda';

  constructor(private http: HttpClient) { }

  createAgenda(agenda: CreateAgendaDto): Observable<Agenda> {
    return this.http.post<Agenda>(this.baseUrl, agenda);
  }

  getToday(): Observable<Agenda> {
    return this.http.get<Agenda>(this.baseUrl).pipe(
      map(agenda => ({
        ...agenda,
        begin: new Date(agenda.begin),
        end: agenda.end ? new Date(agenda.end) : undefined,
      }))
    );
  }
}