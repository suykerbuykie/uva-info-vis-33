import { Component, OnChanges, OnInit } from '@angular/core';
import { Beer } from '../app.interface';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { BeerService } from '../beer-component/beer.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beer-explorer',
  templateUrl: './beer-explorer.component.html',
  styleUrls: ['./beer-explorer.component.scss']
})
export class BeerExplorerComponent implements OnChanges, OnInit {
	public beerList: Beer[] = [];
	public allBeers: Beer[] = [];
	public categories: any[] = [];
	public broadCategories: any[] = [];
	public selectedBeer: Beer = {};
	public selectedCategoryId: string = ''; 
	public selectedCategoryName: string = '';
	public selectedBroadCategoryId: string = 'An';
	public myControl = new FormControl();

	public filteredOptions: Observable<Beer[]>;

	constructor(private beerService: BeerService) { }

	ngOnInit() {
		this.getBroadCategories();
		this.broadSelect();

		this.beerService.getAllBeers().pipe(
			tap((beers) => {
				this.allBeers = beers;
			})
		).subscribe();

		this.filteredOptions = this.myControl.valueChanges.pipe(
		  debounceTime(500),
		  startWith(''),
		  map(value => typeof value === 'string' ? value : value.name),
		  map(name => name ? this._filter(name) : this.allBeers.slice())
		);
	}
  
  	ngOnChanges(): void {
		if (this.selectedCategoryId) {
			this.getBeersFromCategory(this.selectedCategoryId);
		}

	}

	public updateBeerAndCategory(beer: Beer): void {
		console.log(beer)
		this.getCategoryFromBroad(beer.broad_category_id);
		this.selectedBroadCategoryId = beer.broad_category_id;
		this.selectedCategoryId = beer.sub_category_id;
		this.updateCategoryId(beer.sub_category_id);
		this.updateView(beer);
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

	private _filter(name: string): Beer[] {
		const filterValue = name.toLowerCase();
	
		return this.allBeers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
	  }

}
