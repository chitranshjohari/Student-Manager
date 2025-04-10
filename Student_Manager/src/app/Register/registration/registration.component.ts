import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';  // ✅ Import Axios

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);

      try {
        const response = await axios.post('http://localhost:5000/user', this.userForm.value);
        console.log('API response:', response.data);
      } catch (error) {
        console.error('API error:', error);
      }

    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
