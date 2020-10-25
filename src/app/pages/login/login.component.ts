import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  login() {
    this.loginService.login(this.form.value).subscribe({
      complete: () => this.router.navigate(['/ships']),
      error: () => this.showInvalidUserError()
    });
  }

  showInvalidUserError() { 
    // const dialogRef = this.dialog.open(ErrorDialogComponent, {
    //   data: { message: 'Usuario y/o contraseña invalido/s' }
    // });
  }

}
