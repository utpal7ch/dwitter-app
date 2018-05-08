import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DweetDataService } from '../app-core/services/dweet-data.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import { Dweet } from '../app-shared/dweet';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Dweeter } from '../app-shared/dweeter';
import { DweeterDataService } from '../app-core/services/dweeter-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DweeterSearchResult } from '../app-shared/dweeter-search-result';
import { AuthDataService } from '../app-core/services/auth-data.service';
import { User } from '../app-shared/user';

@Component({
  selector: 'app-dweet',
  templateUrl: './dweet.component.html',
  styleUrls: ['./dweet.component.css']
})
export class DweetComponent implements OnInit, OnDestroy {

  private getDweetsSubscription: Subscription;
  private followDweeterSubscription: Subscription;
  private createDweetSubscription: Subscription;
  private likeDweetSubscription: Subscription;
  dweets: Dweet[];
  private dweeterSearchSub = new Subject<string>();
  searchedDweeter$: Observable<DweeterSearchResult[]>;
  searchedDweeter: DweeterSearchResult[];
  modalRef: BsModalRef;
  dweetMessage: string;
  loggedInUser: User;

  constructor(private dweetDataService: DweetDataService,
    private dweeterDataService: DweeterDataService,
    private router: Router,
    private modalService: BsModalService,
    private authDataService: AuthDataService,
  ) {
    this.loggedInUser = authDataService.getUserDetails();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.searchedDweeter$ = this.dweeterSearchSub.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dweeterDataService.searchDweeter(term)),
    );

    this.searchedDweeter$.subscribe(item => this.searchedDweeter = item);

    this.getDweetsSubscription = this.dweetDataService.getDweets().subscribe(data => {
      this.dweets = data;
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['unauthorized']);
      }
      console.log(error);
    });
  }

  searchDweeter(term: string) {
    if (term) {
      this.dweeterSearchSub.next(term);
    } else {
      this.searchedDweeter$ = Observable.of();
    }
  }

  followDweeter(followerId: string) {
    this.followDweeterSubscription = this.dweeterDataService.followDweeter(followerId).subscribe(data => {
      if(data) {
        const followedDwitter = this.searchedDweeter.find(item => item._id === followerId);
        followedDwitter.isFollowing = true;
      }
    });
  }

  createDweet() {
    if (this.dweetMessage && this.dweetMessage.trim()) {
      this.createDweetSubscription = this.dweetDataService.createDweet(this.dweetMessage).subscribe(data => {
        window.alert('New Dweet Successfully Created');
        this.dweetMessage = undefined;
      }, error => {
        if (error.status === 401) {
          this.router.navigate(['unauthorized']);
        }
        console.log(error);
      });
    }
  }

  likeDweet(dweetId: string) {
    this.likeDweetSubscription = this.dweetDataService.likeDweet(dweetId).subscribe(data => {
      if (data) {
        const currentDweet = this.dweets.find(d => d._id === dweetId);
        currentDweet.likes.push(data);
      }
    }, error => {
      if (error.status === 401) {
        this.router.navigate(['unauthorized']);
      }
      console.log(error);
    });
  }

  signout() {
    this.authDataService.logout();
    this.router.navigate(["login"]);
  }

  ngOnDestroy(): void {
    if (this.getDweetsSubscription) {
      this.getDweetsSubscription.unsubscribe();
    }
    if (this.followDweeterSubscription) {
      this.followDweeterSubscription.unsubscribe();
    }
    if (this.createDweetSubscription) {
      this.createDweetSubscription.unsubscribe();
    }
    if (this.likeDweetSubscription) {
      this.likeDweetSubscription.unsubscribe();
    }
  }

}
