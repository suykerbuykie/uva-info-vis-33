import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  constructor(
	  @Inject(MAT_DIALOG_DATA) public data: any,
	  public dialogRef: MatDialogRef<BeerDetailsComponent>
	) { }

	  ngOnInit() {
		//   console.log(this.data)
	  }

	  public close() {
		  this.dialogRef.close();
	  }

}