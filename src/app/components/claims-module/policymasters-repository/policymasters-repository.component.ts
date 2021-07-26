import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policymasters-repository',
  templateUrl: './policymasters-repository.component.html',
  styleUrls: ['./policymasters-repository.component.scss']
})
export class PolicymastersRepositoryComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  showBasicDialog() {
    this.displayBasic = true;
  }

}
