import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ship } from '../models/ship.model';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  constructor(
    private http: HttpClient,
  ) { }

  getShips(): Observable<any> {
    return this.http.get('https://swapi.dev/api/starships/').pipe(
      map(this.parseShips)
    );
  }

  getMoreShips(url: string) {
    return this.http.get(url).pipe(
      map(this.parseShips)
    );
  }

  parseShips(ships: any) {
    for (const ship of ships.results) {
      const splittedUrl = ship.url.split('/').filter(e => e);

      ship.id = parseInt(splittedUrl.pop(), 10);
    }

    return ships;
  }

  getShip(id: number): Observable<Ship>{
    let ship: Ship;

    return this.http.get('https://swapi.dev/api/starships/' + id).pipe(
      switchMap((response: Ship) => {
        ship = response;

        return this.getMovies(response.films);
      }),
      map(films => {
        ship.films = films;

        return ship;
      })
    );
  }

  getMovies(urls: string[]): Observable<any[]> {
    const promises = [];

    for(const url of urls) {
      promises.push(this.http.get(url));
    }

    return forkJoin(promises);
  }
}
