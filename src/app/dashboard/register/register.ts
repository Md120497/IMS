// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.html',
//   styleUrl: './register.css',
// })
// export class Register {

// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  regForm: FormGroup;
passwordStrength = 0;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.regForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  onRegister() {
    if (this.regForm.valid) {
      this.auth.register(this.regForm.value);
    }
  }

checkPasswordStrength(event: any) {
  const pwd = event.target.value;
  let strength = 0;
  if (pwd.length > 6) strength += 20;
  if (/[A-Z]/.test(pwd)) strength += 20;
  if (/[0-9]/.test(pwd)) strength += 20;
  if (/[^A-Za-z0-9]/.test(pwd)) strength += 40;
  this.passwordStrength = strength;
}

}