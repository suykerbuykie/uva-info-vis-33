import { Component, OnChanges, OnInit } from '@angular/core';
import { Beer } from '../app.interface';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BeerService } from '../beer-component/beer.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

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
	public searchedBeer: Beer;

	public filteredOptions: Observable<Beer[]>;

	constructor(private beerService: BeerService) { }

	ngOnInit() {
		this.getBroadCategories();
		this.broadSelect();

		const formChanges$ = this.myControl.valueChanges;
		this.filteredOptions = formChanges$.pipe(
			debounceTime(300),
		  	startWith(''),
			distinctUntilChanged(),
			switchMap(value => value ? this.beerService.searchBeer(value) : of(null))
		);
	}
  
  	ngOnChanges(): void {
		if (this.selectedCategoryId) {
			this.getBeersFromCategory(this.selectedCategoryId);
		}

	}

	public updateBeerAndCategory(beer: Beer): void {
		this.beerService.getCategoryFromBroad(beer.broad_category_id).pipe(
			tap((categories) => {
				this.selectedCategoryId = beer.sub_category_id;
				this.selectedBroadCategoryId = beer.broad_category_id;
				this.categories = categories;
				this.selectedCategoryName = this.categories.find((cat) => cat.sub_category_id === beer.sub_category_id).sub_category;
				this.getBeersFromCategory(beer.sub_category_id);
				this.selectedBeer = beer;
			})
		).subscribe();
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
