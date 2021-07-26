import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conf-emailbasedjobupdate',
  templateUrl: './conf-emailbasedjobupdate.component.html',
  styleUrls: ['./conf-emailbasedjobupdate.component.scss']
})
export class ConfEmailbasedjobupdateComponent implements OnInit {
  activeState: boolean = false;
  val: number;
  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
  constructor() { }

  ngOnInit(): void {
  }

 
}
