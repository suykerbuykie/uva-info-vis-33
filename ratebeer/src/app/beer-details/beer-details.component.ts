import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { BeerService } from '../beer-component/beer.service';

@Component({
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
	public similarReviewedBeers: any[] = [];
	constructor(
	  @Inject(MAT_DIALOG_DATA) public data: any,
	  public dialogRef: MatDialogRef<BeerDetailsComponent>,
	  private beerService: BeerService
	) { }

	ngOnInit() {
		this.beerService.getSimilarlyReviewedBeers(this.data.beer_id).pipe(
			tap((beers) => {
				if (!beers['error']){
					this.similarReviewedBeers = beers.sort((a:any, b:any) => a['similarity'] > b['similarity']);
					
					this.similarReviewedBeers.forEach((beer) => {
						beer['beer'] = JSON.parse(beer['beer'])
					});
				}
			})
		).subscribe();
	}

	public close() {
		this.dialogRef.close();
	}

}