import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  heroes = [
    { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
      { id:21, name: 'Raio' },
      { id:22, name: 'Tempestade' },
      { id:23, name: 'Wolverine' },
      { id:24, name: 'Batman' },
      { id:25, name: 'Aquaman' },
      { id:26, name: 'Mulher Maravilha' },
      { id:27, name: 'Viuva Negra' },
      { id:28, name: 'Hulk' },
      { id:29, name: 'Thor' },
      { id:30, name: 'Zeus' },
      { id:31, name: 'Loki' },
      { id:32, name: 'Homem Aranha' }
  ];

  createDb() {
    return { heroes: this.heroes };
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}