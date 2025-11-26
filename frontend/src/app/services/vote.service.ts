import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private baseUrl = 'http://localhost:3000/vote';

  constructor(private http: HttpClient) { }

  submitVote(userId: number, agendaItemId: number, decision: string): Observable<any> {
    return this.http.post(this.baseUrl, {
      userId,
      agendaItemId,
      decision
    });
  }

  getVotes(agendaItemId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/agenda-item/${agendaItemId}`);
  }

  getVoters(agendaId?: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/agenda/${agendaId}`);
  }
}
