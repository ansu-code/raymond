import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policymasters-years',
  templateUrl: './policymasters-years.component.html',
  styleUrls: ['./policymasters-years.component.scss']
})
export class PolicymastersYearsComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
