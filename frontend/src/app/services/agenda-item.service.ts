import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface AgendaItem {
  id: number;
  title: string;
  dateCreation: Date;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AgendaItemService {
  private baseUrl = 'http://localhost:3000/agenda-item';

  constructor(private http: HttpClient) { }

  createAgendaItem(item: { title: string; description?: string }): Observable<any> {
    return this.http.post(this.baseUrl, item);
  }

  getAll(): Observable<AgendaItem[]> {
    return this.http.get<AgendaItem[]>(this.baseUrl);
  }
}