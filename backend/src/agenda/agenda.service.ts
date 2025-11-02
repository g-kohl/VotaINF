import { Injectable } from '@nestjs/common';
import { Agenda } from './agenda.entity';

@Injectable()
export class AgendaService {
  // private agenda = new Agenda(1, [
  //   new AgendaItem(
  //     1, 
  //     '1.1 Afastamento do Prof. Fulano',
  //     'O colegiado do Instituto de Informática apreciará a solicitação de afastamento do Prof. Fulano de Tal para realização de seupós-doutoramento junto à [nome da instituição de destino], localizada em[cidade, país], sob supervisão do(a) Prof.(a) [nome do(a) supervisor(a)]. O período proposto para o afastamento é de [data de início] a [data de término], conforme plano de atividades e cronograma apresentados. O professor solicita o afastamento com ônus limitado, conforme a legislação vigente e as normas da UFRGS referentes a afastamentos para capacitação docente.'
  //   ),
  //   new AgendaItem(
  //     2, 
  //     '1.2 Substituição de docente em turma de graduação',
  //     'O colegiado do Instituto de Informática apreciará a proposta de substituição do(a) Prof.(a) [nome do(a) professor(a) atual] pelo(a) Prof.(a) [nome do(a) novo(a) professor(a)] como responsável pela turma da disciplina [código e nome da disciplina], ofertada no [semestre/ano], turno [manhã/tarde/noite]. A mudança é proposta em razão de [motivo — por exemplo: afastamento do docente, sobrecarga de orientações, redistribuição de encargos, ou outra justificativa]. O novo docente indicado possui experiência na área e disponibilidade para assumir a turma, garantindo a continuidade das atividades acadêmicas. Encaminhamento: Deliberação do colegiado sobre a aprovação da substituição docente conforme proposta apresentada pela coordenação do curso e pela chefia do departamento.'
  //   ),
  // ]);

  // getAgenda(): Agenda {
  //   return this.agenda;
  // }
  // // vote: 'approve' | 'reprove' | 'abstain'
  // vote(itemId: number, vote: 'approve' | 'reprove' | 'abstain') {
  //   const item = this.agenda.items.find((i) => i.id === itemId);

  //   if (item) {
  //     item.vote = vote
  //   }

  //   return item;
  // }
}
