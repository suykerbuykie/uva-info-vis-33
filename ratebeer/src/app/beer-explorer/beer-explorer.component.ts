import { Component, Input, OnChanges } from '@angular/core';
import { Beer } from '../app.interface';
import { tap } from 'rxjs/operators';
import { BeerService } from '../beer-component/beer.service';

@Component({
  selector: 'app-beer-explorer',
  templateUrl: './beer-explorer.component.html',
  styleUrls: ['./beer-explorer.component.scss']
})
export class BeerExplorerComponent implements OnChanges {
	public beerList: Beer[] = [];
	public selectedBeer: Beer = {};
	public selectedStyleId: number;

	constructor(private beerService: BeerService) {}
  
  	ngOnChanges(): void {
		if (this.selectedStyleId) {
			this.getBeersFromStyle(this.selectedStyleId);
		}
	}

	public updateView(beer: Beer): void {
		this.selectedBeer = beer;
	}

	public updateStyleId(id: number): void {
		this.selectedStyleId = id;
		this.getBeersFromStyle(id);
	}

	private getBeersFromStyle(id: number): void {
		this.beerService.getBeersFromStyle(id).pipe(
			tap((beers) => {
				this.beerList = beers;
			})
		).subscribe();
	}

}
