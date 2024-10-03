import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private messageService: MessageService, private http: HttpClient) { }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead

    this.log(`${operation} falhou: ${error.message}`);

    return of(result as T);
  };
}

  getPaginas(page: number, itemsPerPage: number, length: number): Observable<Hero[]>{
   // const params = new HttpParams()
    //.set('page', page.toString())
    //.set('itemsPerPage', itemsPerPage.toString())
    //return this.http.get<Hero[]>(this.heroesUrl)

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      map((result : Hero[]) => {
          // you need to sort, if your data was not sorted

          const sum = itemsPerPage
          
          return result.sort((a : Hero, b: Hero) => {
            if(a.name > b.name) return 1;
            if(a.name < b.name) return -1;
            return 0;
        }).slice(itemsPerPage*page, itemsPerPage*(page+1));
      })
    );
  }

  getHeroesOrd( num: string, page: number, itemsPerPage: number): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      map((result : Hero[]) => {
          return result.sort((a : Hero, b: Hero) => {
            if(num == 'id'){
              if(a.id > b.id) return 1;
              if(a.id < b.id) return -1;
              return 0
            }
            else if(num == 'name'){
              if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0
            }
            else return 0
        }).slice(itemsPerPage*page, itemsPerPage*(page+1));
      })
    );
  }


  /*getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: Heróis encontrados')
    return heroes;
  }*/   
 
  getHeroes(): Observable<Hero[]> {
   
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('heróis encontrado')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }


  /*getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService:  Heróis encontrados id = ${id}.`);
    return of(hero);
  }*/
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`herói encontrado id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`herói atualizado id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  
  addHero(hero: Hero): Observable<Hero> { 
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`herói adicionado w/ id=${newHero.id}`)), // --> criado pelo servidor o id...
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`heroi deletado id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`herói encontrado na busca "${term}"`) :
        this.log(`herói não encontrado "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
