import { NgModule } from "@angular/core";
import { DweetComponent } from "./dweet.component";
import { CommonModule } from "@angular/common"
import { DweetDialogComponent } from '../dweet-dialog/dweet-dialog.component';


@NgModule({
  imports: [CommonModule],
  declarations: [DweetComponent, DweetDialogComponent]
})
export class DweetModule {

}
