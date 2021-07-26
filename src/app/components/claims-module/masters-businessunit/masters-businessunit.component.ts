import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters-businessunit',
  templateUrl: './masters-businessunit.component.html',
  styleUrls: ['./masters-businessunit.component.scss']
})
export class MastersBusinessunitComponent implements OnInit {
  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
}
