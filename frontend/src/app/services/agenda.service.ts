import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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

  getAll(searchParams?: any): Observable<Agenda[]> {
    let params = new HttpParams();
    if (searchParams) {
      if (searchParams.id) params = params.set('id', searchParams.id);
      if (searchParams.begin) params = params.set('begin', searchParams.begin);
      if (searchParams.end) params = params.set('end', searchParams.end);
    }
    return this.http.get<Agenda[]>(this.baseUrl, { params });
  }

  finishAgenda(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/finish-agenda`, { id });
  }

}