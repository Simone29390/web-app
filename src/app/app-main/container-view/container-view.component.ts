import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.component.html',
  styleUrls: ['./container-view.component.css']
})
export class ContainerViewComponent implements OnInit {
  @Input() public viewPage: string;
  constructor() { }

  ngOnInit() {
  }

}
