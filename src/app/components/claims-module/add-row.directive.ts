import { Directive, Input, HostListener } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[pAddRow]'
})
export class AddRowDirective {
  @Input() table: Table;
  @Input() newRow: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    // Insert a new row
    //this.table.value.push(this.newRow);

    // Set the new row in edit mode
    //this.table.initRowEdit(this.newRow);
    
    //Condition for single row adding at a time.
    if (this.table.value.filter(row => row.isEditable || !row.isUpdate).length == 0) {
      this.table.first = 0;
      //Modified to insert the row as first row
      this.table.value.splice(0, 0, this.newRow);

      // Set the new row in edit mode
      this.table.initRowEdit(this.newRow);
    } else {
      //alert("Already a row is in edit mode...")      
    }

    event.preventDefault();
  }
}
