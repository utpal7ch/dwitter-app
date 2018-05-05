import { NgModule } from "@angular/core";
import { DweetComponent } from "./dweet.component";
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DweetComponent]
})
export class DweetModule {

}
