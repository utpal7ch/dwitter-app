import { Component, OnInit, Input } from '@angular/core';
import { Dweet } from '../app-shared/dweet';

@Component({
  selector: 'app-dweet-dialog',
  templateUrl: './dweet-dialog.component.html',
  styleUrls: ['./dweet-dialog.component.css']
})
export class DweetDialogComponent implements OnInit {
@Input() dweet: Dweet;
  constructor() { }

  ngOnInit() {
  }

}
