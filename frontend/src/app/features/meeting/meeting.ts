import { Component } from '@angular/core';
import { MeetingService, AgendaItem } from './meeting.service';

@Component({
  selector: 'app-meeting',
  standalone: false,
  templateUrl: './meeting.html',
  styleUrl: './meeting.css'
})
export class Meeting {
  agenda: AgendaItem[] = [];
  loaded = false;

  // Exemplo para testar a formatação:
  // pautas = [
  //   { title: '1.1 Afastamento do Prof. Fulano', text: 'Assunto: Solicitação de afastamento do Prof. Fulano de Tal, docente do Instituto de Informática da UFRGS, para realização de estágio pós-doutoral. Descrição: O colegiado do Instituto de Informática apreciaráa solicitação de afastamento do Prof. Fulano de Tal para realização de seupós-doutoramento junto à [nome da instituição de destino], localizada em[cidade, país], sob supervisão do(a) Prof.(a) [nome do(a) supervisor(a)].O período proposto para o afastamento é de [data de início] a [data detérmino], conforme plano de atividades e cronograma apresentados. Oprofessor solicita o afastamento com ônus limitado, conforme a legislaçãovigente e as normas da UFRGS referentes a afastamentos para capacitaçãodocente.' },
  //   { title: '1.2 Aprovação de novo curso', text: 'Texto do item 2...' }
  // ];

  constructor(private meetingService : MeetingService) {}

  ngOnInit() {
    this.loadAgenda();
  }

  loadAgenda() {
    this.meetingService.getAgenda().subscribe({
      next: (data) => {
        this.agenda = data.items.map(item => ({
          ...item,
          vote: item.vote ?? '' // inicializa vote como string vazia se undefined
        }));
        this.loaded = true;
      },
      error: (err) => {
        console.log('Erro ao carregar pauta:', err);
      }
    });
  }

  submitVotes() {
    for(const item of this.agenda) {
      console.log(`${item.id}:`, item.vote);
      if(item.vote !== undefined) {
        this.meetingService.vote(item.id, item.vote).subscribe(updated => {
          //opcional
          const idx = this.agenda.findIndex(x => x.id === updated.id);

          if(idx >= 0)
            this.agenda[idx] = updated;

          console.log(`Voto registrado para ${updated.title}:`, updated);
        })
      }
    }
  }
}
