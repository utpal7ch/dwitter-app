import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule ],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule {

}
