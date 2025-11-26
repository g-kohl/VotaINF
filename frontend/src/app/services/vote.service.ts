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

  /**
   * Recupera os votos associados a um item de pauta específico.
   *
   * @param agendaItemId - O identificador do item de pauta para o qual os votos serão buscados.
   * @returns Um Observable contendo os dados dos votos relacionados ao item de pauta informado.
   */
  getVotes(agendaItemId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/agenda-item/${agendaItemId}`);
  }

  /**
   * Retorna uma lista de eleitores para uma determinada pauta.
   *
   * @param agendaId - O identificador da pauta (opcional).
   * @returns Um Observable que emite um array de strings representando os eleitores.
   */
  getVoters(agendaId?: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/agenda/${agendaId}`);
  }
}
