import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      name: new FormControl(),
      lastname: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    });
  }

  save() {
    this.loginService.register(this.form.value).subscribe({
      complete: () => this.router.navigate(['/login']),
      error: () => this.showDuplicatedUserError()
    });
  }

  showDuplicatedUserError() { 
    // const dialogRef = this.dialog.open(ErrorDialogComponent, {
    //   data: { message: 'El usuario ya existe' }
    // });
  }
}