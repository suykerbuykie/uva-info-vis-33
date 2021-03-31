import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BeerService } from '../beer-component/beer.service';

@Component({
  selector: 'app-upset-popup',
  templateUrl: './upset-popup.component.html',
  styleUrls: ['./upset-popup.component.scss']
})
export class UpsetPopupComponent implements OnInit {
	public upsetBeerList: Observable<any[]>;
	constructor(
	  @Inject(MAT_DIALOG_DATA) public data: any,
	  public dialogRef: MatDialogRef<UpsetPopupComponent>,
	  private beerService: BeerService
	) { }

	ngOnInit() {
		this.upsetBeerList = this.beerService.beersByIdlist(this.data);
	}

	public close() {
		this.dialogRef.close();
	}
}