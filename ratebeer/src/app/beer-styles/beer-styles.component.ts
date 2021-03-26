import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Beer } from '../app.interface';
import { BeerService } from '../beer-component/beer.service';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';

@Component({
  selector: 'app-beer-styles',
  templateUrl: './beer-styles.component.html',
  styleUrls: ['./beer-styles.component.scss']
})
export class BeerStylesComponent implements OnInit, OnChanges {
	public subCategoryAllFlavours: any[] = [];

	@Input() selectedBeer: Beer = {};

	constructor(public dialog: MatDialog, private beerService: BeerService) {}
	
	ngOnInit(): void {
		
	}

	ngOnChanges(): void {
		if (this.selectedBeer && this.selectedBeer.beer_id) {
			this.beerService.getSubcategoryAllFlavours(this.selectedBeer.beer_id).pipe(
				tap((beers) => {
					console.log(beers, 'thijs')
					this.subCategoryAllFlavours = beers;
				})
			).subscribe();
		}
	}

	public openDetails() {
		const data = this.selectedBeer;
		if (data.name) {
			this.dialog.open(BeerDetailsComponent, {
				data,
				width: '600px',
				height: '600px'
			});
		} else {
			alert(
				"No Beer to display!"
			)
		}
	}

}
