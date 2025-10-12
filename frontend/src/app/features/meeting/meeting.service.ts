import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Os votos possíveis no sistema (Sim, Não, ou Diligência)
export type VoteOption = 'Sim' | 'Nao' | 'Diligencia';

// Interface do item de pauta com os resultados de votos agregados vindos do backend
export interface AgendaItem {
  id: number;
  assunto: string; 
  arquivosAnexos?: string;
  descricao: string;
  dataAprovacao: string | null;

  // Campos de contagem de votos agregados
  votesSim: number;
  votesNao: number;
  votesDiligencia: number;
  
  // Campo para rastrear o voto do usuário no frontend
  userVote?: VoteOption; 
}

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:3000/agenda';

  constructor(private http: HttpClient) { }

  // Retorna um array de itens de pauta (com contagem de votos agregada)
  getAgenda(): Observable<AgendaItem[]> {
    return this.http.get<AgendaItem[]>(this.apiUrl);
  }

  // Envia o voto (que agora é uma string: 'Sim', 'Nao', 'Diligencia')
  vote(itemId: number, voto: VoteOption): Observable<AgendaItem> {
    return this.http.post<AgendaItem>(`${this.apiUrl}/vote`, { id: itemId, voto: voto });
  }
}