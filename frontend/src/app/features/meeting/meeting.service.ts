import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AgendaItem {
  id: number;
  title: string;
  votesYes?: number;
  votesNo?: number;
  vote?: boolean;
}

export interface Agenda {
  id: number;
  items: AgendaItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:3000/agenda';

  constructor(private http: HttpClient) { }

  getAgenda(): Observable<Agenda> {
    return this.http.get<Agenda>(this.apiUrl);
  }

  vote(itemId: number, vote: boolean): Observable<AgendaItem> {
    return this.http.post<AgendaItem>(`${this.apiUrl}/vote`, { id: itemId, vote });
  }
}