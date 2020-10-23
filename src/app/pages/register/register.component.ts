import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message: 'El usuario ya existe' }
    });
  }
}
