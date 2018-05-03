import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../shared/login';
import { AuthDataService } from '../core/services/auth-data.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isValidCredentials: boolean = true;
  private loginSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthDataService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    const submittedModel = new Login(this.loginForm.value.userName, this.loginForm.value.password);
    this.loginSubscription = this.authService.login(submittedModel).subscribe(data => {
      if(data) {
        this.isValidCredentials = true;
        this.router.navigate(["dweets"]);
      } else {
        this.isValidCredentials = false;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
