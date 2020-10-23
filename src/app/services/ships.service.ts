import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  constructor(
    private http: HttpClient,
  ) { }

  getShips(): Observable<any> {
    return this.http.get('https://swapi.dev/api/starships/');
  }
}
