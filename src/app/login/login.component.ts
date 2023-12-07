import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,20}$/)]],
      password: ['', [Validators.required,Validators.minLength(4)]]
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  isLoggedin=false


  inValidID=false

  token=false


  onSubmit() {
    console.log('working');
  
    const enteredUsername = this.form.value.username;
    const enteredPassword = this.form.value.password;
  
    if (this.authService.loginUser(enteredUsername, enteredPassword)) {
      sessionStorage.setItem('valid', 'true');
      this.router.navigateByUrl('home');
    } else {
      this.form.reset()  
      this.form.markAllAsTouched()
      this.inValidID = true;
    }
  }
  

  }

