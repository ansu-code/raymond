import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters-company',
  templateUrl: './masters-company.component.html',
  styleUrls: ['./masters-company.component.scss']
})
export class MastersCompanyComponent implements OnInit {

  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
