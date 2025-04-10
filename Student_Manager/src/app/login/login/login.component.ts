import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import axios from 'axios';  // ✅ Import Axios
@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 adminForm:FormGroup;
 constructor(private fb: FormBuilder,private router: Router) { 

  this.adminForm=this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],

  })
 }
  async onSubmit(){
  if(this.adminForm.valid){
   console.log("login form details "+this.adminForm.value);

   try {
    const response = await axios.post('http://localhost:5000/login', this.adminForm.value);
    console.log('API response:', response.data);
    localStorage.setItem('token', response.data);
    this.router.navigate(['/admin']);


  } catch (error) {
    console.error('API error:', error);
  }
  }
  else{
    console.log('invalid form')
  }

}

}
