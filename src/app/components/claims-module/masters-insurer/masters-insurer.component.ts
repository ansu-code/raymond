import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters-insurer',
  templateUrl: './masters-insurer.component.html',
  styleUrls: ['./masters-insurer.component.scss']
})
export class MastersInsurerComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
