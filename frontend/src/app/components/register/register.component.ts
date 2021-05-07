import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username').value;
      const password = this.registerForm.get('password').value;
      this.userService.register(username, password)
        .subscribe({
          next: (user) => {
            console.log(user);
            this.router.navigateByUrl('/home');
            this.snackBar.open('Sign in successfull', 'OK', { duration: 3000 });
          },
          error: (err) => console.log(err)
        });
    }
  }
}
