import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policymasters-types',
  templateUrl: './policymasters-types.component.html',
  styleUrls: ['./policymasters-types.component.scss']
})
export class PolicymastersTypesComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
