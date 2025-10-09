import { Injectable, NotFoundException } from '@nestjs/common';
import { Pauta } from './pauta.model';

@Injectable()
export class PautasService {
  private pautas: Pauta[] = [
    new Pauta(1, 'Pauta inicial', 0)
  ];
  private nextId = 2;

  findAll(): Pauta[] {
    return this.pautas;
  }

  findOne(id: number): Pauta {
    const p = this.pautas.find(p => p.id === id);
    if (!p) throw new NotFoundException(`Pauta ${id} não encontrada`);
    return p;
  }

  create(titulo: string): Pauta {
    const newP = new Pauta(this.nextId++, titulo, 0);
    this.pautas.push(newP);
    return newP;
  }

  incrementVote(id: number): Pauta {
    const p = this.findOne(id);
    p.votos += 1;
    return p;
  }
}
