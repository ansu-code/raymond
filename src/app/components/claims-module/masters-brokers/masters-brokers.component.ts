import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters-brokers',
  templateUrl: './masters-brokers.component.html',
  styleUrls: ['./masters-brokers.component.scss']
})
export class MastersBrokersComponent implements OnInit {
  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
}
