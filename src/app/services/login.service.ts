import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = new BehaviorSubject(null);

  constructor() {
    if (localStorage.getItem('loggedInUser')) {
      this.user.next(JSON.parse(localStorage.getItem('loggedInUser')));
    }
  }

  get users(): User[] {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  }

  login(loginData: User) {
    return new Observable((observer) => {
      const users = this.users;
      const user = users.filter(e => e.username === loginData.username && e.password === loginData.password)[0];

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.user.next(JSON.stringify(user));

        observer.complete();
      } else {
        observer.error('USUARIO Y/O CONTRASEÑA INVALIDO/S');
      }
    })

  }

  register (user: User) {
    return new Observable((observer) => {
      const users = this.users;
      const alreadyExists = !!users.filter(e => e.username === user.username).length;
  
      if (alreadyExists) {
        observer.error('NOMBRE DE USUARIO YA EXISTE');
      } else {
        users.push(user);
  
        localStorage.setItem('users', JSON.stringify(users));

        observer.complete();
      }
    })
  }

  logout() {
    localStorage.removeItem('loggedInUser');

    this.user.next(null);
  }
}
