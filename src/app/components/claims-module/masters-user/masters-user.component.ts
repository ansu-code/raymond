import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters-user',
  templateUrl: './masters-user.component.html',
  styleUrls: ['./masters-user.component.scss']
})
export class MastersUserComponent implements OnInit {
  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
