import { Component, OnChanges, OnInit } from '@angular/core';
import { Beer } from '../app.interface';
import { tap } from 'rxjs/operators';
import { BeerService } from '../beer-component/beer.service';

@Component({
  selector: 'app-beer-explorer',
  templateUrl: './beer-explorer.component.html',
  styleUrls: ['./beer-explorer.component.scss']
})
export class BeerExplorerComponent implements OnChanges, OnInit {
	public beerList: Beer[] = [];
	public categories: any[] = [];
	public broadCategories: any[] = [];
	public selectedBeer: Beer = {};
	public selectedCategoryId: string = ''; 
	public selectedCategoryName: string = '';
	public selectedBroadCategoryId: string = 'An';

	constructor(private beerService: BeerService) { }

	ngOnInit() {
		this.getBroadCategories();
		this.broadSelect();
	}
  
  	ngOnChanges(): void {
		if (this.selectedCategoryId) {
			this.getBeersFromCategory(this.selectedCategoryId);
		}
	}

	public updateView(beer: Beer): void {
		this.selectedBeer = beer;
	}

	public updateCategoryId(id: string): void {
		this.selectedCategoryId = id;
		if (!!this.selectedCategoryId) {
			this.selectedCategoryName = this.categories.find((cat) => cat.sub_category_id === id).sub_category;
			this.getBeersFromCategory(id);
			this.selectedBeer = {};
		} else {
			this.beerList = [];
			this.selectedBeer = {};
		}
	}

	public broadSelect() {
		this.getCategoryFromBroad(this.selectedBroadCategoryId);
	}

	private getCategoryFromBroad(id: string): void {
		this.beerService.getCategoryFromBroad(id).pipe(
			tap((categories) => {
				this.categories = categories;
			})
		).subscribe();
	}

	private getBeersFromCategory(id: string): void {
		this.beerService.getBeersFromCategory(id).pipe(
			tap((beers) => {
				this.beerList = beers;
			})
		).subscribe();
	}

	private getBroadCategories(): void {
		this.beerService.getBroadCategories().pipe(
			tap((cats: any) => {
				this.broadCategories = cats;
			})
		).subscribe();
	}

}
