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

  login(user: User) {
    return new Observable((observer) => {
      const users = this.users;
      const userValid = !!users.filter(e => e.username === user.username && e.password === user.password).length;

      if (userValid) {
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
        observer.error('USER ALREADY EXISTS');
      } else {
        users.push(user);
  
        localStorage.setItem('users', JSON.stringify(users));

        observer.complete();
      }
    })
  }

}
