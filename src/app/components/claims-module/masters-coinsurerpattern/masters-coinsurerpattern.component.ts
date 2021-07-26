import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters-coinsurerpattern',
  templateUrl: './masters-coinsurerpattern.component.html',
  styleUrls: ['./masters-coinsurerpattern.component.scss']
})
export class MastersCoinsurerpatternComponent implements OnInit {
  displayBasic: boolean;
  activeState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

}
