import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userForm: FormGroup;
  otpForm: FormGroup;
  otpSent = false;
  otpVerified = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      try {
      //  console.log("ONSubmit is called ");
        const response = await axios.post('http://localhost:5000/user/register', this.userForm.value);
        if (response.data.success) {
          this.otpSent = true;
        } else {
          alert('Failed to send OTP');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Something went wrong.');
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  async verifyOtp() {
 //   console.log("verify OTP is called ");
    if (this.otpForm.valid) {
      try {
        const response = await axios.post('http://localhost:5000/user/verify-otp', {
          email: this.userForm.get('email')?.value,
          otp: this.otpForm.get('otp')?.value
        });

        if (response.data.verified) {
          this.otpVerified = true;
        } else {
          alert('Incorrect OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Something went wrong.');
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}
