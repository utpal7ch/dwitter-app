import { NgModule } from "@angular/core";
import { DweetComponent } from "./dweet.component";
import { CommonModule } from "@angular/common"
import { DweetDialogComponent } from '../dweet-dialog/dweet-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DweetComponent, DweetDialogComponent]
})
export class DweetModule {

}
