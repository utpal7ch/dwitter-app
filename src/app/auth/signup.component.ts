import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../app-core/services/auth-data.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Singup } from '../app-shared/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isValidDeatils: boolean = true;
  private signSubscription: Subscription;
  validationResults: string[];

  constructor(private formBuilder: FormBuilder, private authService: AuthDataService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      fullName: [null, Validators.required],
    });
  }

  onSubmit() {
    const submittedModel = new Singup(this.signupForm.value.userName, this.signupForm.value.password, this.signupForm.value.email, this.signupForm.value.fullName);
    this.signSubscription = this.authService.signup(submittedModel).subscribe(data => {
      this.isValidDeatils = true;
      this.router.navigate(["dweets"]);
    }, error => {
      if (error.status === 400) {
        this.isValidDeatils = false;
        this.validationResults = [];
        (error["error"] as [any]).forEach(item => {
          this.validationResults.push(item.message);
        });
      }
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.signSubscription) {
      this.signSubscription.unsubscribe();
    }
  }

}
