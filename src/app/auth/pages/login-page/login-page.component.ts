import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
  );

  login(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => console.log('Todo salio bien'),
        error: msg => {
          Swal.fire('Error', msg, 'error');
        }
      })
  }

}
