import { Component, OnInit, OnDestroy } from '@angular/core';
import { DweetDataService } from '../core/services/dweet-data.service';
import { Subscription } from 'rxjs/Subscription';
import { Dweet } from '../shared/dweet';

@Component({
  selector: 'app-dweet',
  templateUrl: './dweet.component.html',
  styleUrls: ['./dweet.component.css']
})
export class DweetComponent implements OnInit, OnDestroy {

  private getDweetsSubscription: Subscription;
  dweets: Dweet[];

  constructor(private dweetDataService: DweetDataService) { }

  ngOnInit() {
    this.getDweetsSubscription = this.dweetDataService.getDweets().subscribe(data => {
      this.dweets = data;
    });
  }

  ngOnDestroy(): void {
    if(this.getDweetsSubscription) {
      this.getDweetsSubscription.unsubscribe();
    }
  }

}
