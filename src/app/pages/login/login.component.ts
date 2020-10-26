import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public showInvalidUserError = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/ships']);
      }
    });
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login() {
    this.loginService.login(this.form.value).subscribe({
      complete: () => this.router.navigate(['/ships']),
      error: () => this.showInvalidUserError = true
    });
  }

}
