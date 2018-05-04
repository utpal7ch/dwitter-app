import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { DweetDataService } from '../app-core/services/dweet-data.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import { Dweet } from '../app-shared/dweet';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Dweeter } from '../app-shared/dweeter';
import { DweeterDataService } from '../app-core/services/dweeter-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DweeterSearchResult } from '../app-shared/dweeter-search-result';
import { AuthDataService } from '../app-core/services/auth-data.service';
import { DweetDialogComponent } from '../dweet-dialog/dweet-dialog.component';

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
  modalRef: BsModalRef;
  dweetMessage: string;

  constructor(private dweetDataService: DweetDataService,
    private dweeterDataService: DweeterDataService,
    private router: Router,
    private modalService: BsModalService,
    private authDataService: AuthDataService,
  ) {

  }
  // openDialog(dweet: Dweet): void {
  //   let dialogRef = this.dialog.open(DweetDialogComponent, {
  //     width: '250px',
  //     data: dweet
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');

  //   });
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  searchDweeter(term: string) {
    if (term) {
      this.dweeterSearchSub.next(term);
    } else {
      this.searchedDweeter$ = Observable.of();
    }
  }

  followDweeter(followerId: string) {
    this.followDweeterSubscription = this.dweeterDataService.followDweeter(followerId).subscribe(data => {
      console.log(data);
    });
    // debugger;
    // this.searchedDweeter$.forEach(dweeterArray => {
    //   dweeterArray.forEach(d => {
    //     console.log(d._id);
    //     if (d._id === followerId) {
    //       d.isFollowing = true;
    //       console.log('done');
    //     }
    //   })
    // })
    // console.log(userId);
  }

  createDweet() {
    if (this.dweetMessage && this.dweetMessage.trim()) {
      this.createDweetSubscription = this.dweetDataService.createDweet(this.dweetMessage).subscribe(data => {
        window.alert('New Dweet Successfully Created');
        this.dweetMessage = undefined;
      });
    }
  }

  likeDweet(dweetId: string) {
    this.likeDweetSubscription = this.dweetDataService.likeDweet(dweetId).subscribe(data => {
      if (data) {
        const currentDweet = this.dweets.find(d => d._id === dweetId);
        currentDweet.likes.push(data);
      }
    });
  }

  signout() {
    this.authDataService.logout();
    this.router.navigate(["login"]);
  }

  openDweet(dweet: Dweet) {
    alert();
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
