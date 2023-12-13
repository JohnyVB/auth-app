import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group(
    {
      email: ['johny3@google.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    }
  );

  login(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          const last_url = localStorage.getItem('last_url');
          const url = !last_url ? '/dashboard' : last_url;
          this.router.navigateByUrl(url);
        },
        error: msg => Swal.fire('Error', msg, 'error')
      })
  }

}
