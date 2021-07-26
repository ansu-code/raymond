import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policymasters-numbers',
  templateUrl: './policymasters-numbers.component.html',
  styleUrls: ['./policymasters-numbers.component.scss']
})
export class PolicymastersNumbersComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
