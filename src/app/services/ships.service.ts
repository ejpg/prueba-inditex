import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  constructor(
    private http: HttpClient,
  ) { }

  getShips(): Observable<any> {
    return this.http.get('https://swapi.dev/api/starships/').pipe(
      map((ships: any) => {
        for (const ship of ships.results) {
          const splittedUrl = ship.url.split('/').filter(e => e);

          ship.id = splittedUrl.pop();
        }

        return ships;
      })
    );
  }
}
