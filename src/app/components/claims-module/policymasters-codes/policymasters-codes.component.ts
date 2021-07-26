import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policymasters-codes',
  templateUrl: './policymasters-codes.component.html',
  styleUrls: ['./policymasters-codes.component.scss']
})
export class PolicymastersCodesComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
