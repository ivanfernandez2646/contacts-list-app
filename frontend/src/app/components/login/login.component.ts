import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['@', Validators.minLength(2)],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      this.userService.login(username, password)
        .subscribe({
          next: (user) => {
            this.router.navigateByUrl('/home');
            this.snackBar.open('Successful log in', 'OK', { duration: 3000 });
          }
        });
    }
  }

  onUsernameChange(value: string): void {
    let usernameValue = this.loginForm.get('username').value;
    if (usernameValue[0] !== '@') {
      usernameValue = '@' + usernameValue;
      this.loginForm.get('username')
        .setValue(usernameValue);
    }
  }

}
