import { Component, OnInit, OnDestroy } from '@angular/core';
import { DweetDataService } from '../app-core/services/dweet-data.service';
import { Subscription } from 'rxjs/Subscription';
import { Dweet } from '../app-shared/dweet';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Dweeter } from '../app-shared/dweeter';
import { DweeterDataService } from '../app-core/services/dweeter-data.service';

@Component({
  selector: 'app-dweet',
  templateUrl: './dweet.component.html',
  styleUrls: ['./dweet.component.css']
})
export class DweetComponent implements OnInit, OnDestroy {

  private getDweetsSubscription: Subscription;
  dweets: Dweet[];
  private dweeterSearchSub = new Subject<string>();
  searchedDweeter$: Observable<Dweeter[]>;

  constructor(private dweetDataService: DweetDataService,
    private dweeterDataService: DweeterDataService,
    private router: Router) {

  }

  ngOnInit() {
    this.searchedDweeter$ = this.dweeterSearchSub.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dweeterDataService.searchDweeter(term)),
    );

    this.getDweetsSubscription = this.dweetDataService.getDweets().subscribe(data => {
      this.dweets = data;
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['unauthorized']);
      }
      console.log(error);
    });
  }

  searchDwitter(term: string) {
    this.dweeterSearchSub.next(term);
  }

  ngOnDestroy(): void {
    if (this.getDweetsSubscription) {
      this.getDweetsSubscription.unsubscribe();
    }
  }

}
