import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  get users(): User[] {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  }


  get loggedInUser(): User {
    return localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : null;
  }

  login(loginData: User) {
    return new Observable((observer) => {
      const users = this.users;
      const user = users.filter(e => e.username === loginData.username && e.password === loginData.password)[0];

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));

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

}
