import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material";

@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.component.html',
  styleUrls: ['./container-view.component.css']
})
export class ContainerViewComponent implements OnInit, OnDestroy {
  @Input() public viewPage: string;
  subscription: Subscription;
  selectedTab;

  constructor( private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    let self = this;

    self.subscription = self.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      self.changeTab(id);
    });
  }

  changeTab(id: any) {
    this.selectedTab = id -1;
    if (this.selectedTab >= 4) this.selectedTab = 0;
  }

  onLinkClick(event: MatTabChangeEvent) {

    let index = event.index+1;
    console.log('donation/'+index)
    this.router.navigate(['donation/'+index]);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}
