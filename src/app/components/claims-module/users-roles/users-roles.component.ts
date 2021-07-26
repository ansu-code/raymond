import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent implements OnInit {
  cities: any[];
  selectedCity: any;
  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
}
