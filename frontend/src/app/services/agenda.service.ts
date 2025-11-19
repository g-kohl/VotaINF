import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AgendaItem } from "./agenda-item.service";
import { map } from "rxjs";

export interface Agenda {
  id: number;
  begin: Date;
  end?: Date;
  format: string;
  status: string;
  place?: string;
  agendaItemIds: AgendaItem[];
}

export interface CreateAgendaDto {
  begin: string;
  end?: string;
  format: string;
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

  getAll(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.baseUrl);
  }

}