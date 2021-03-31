import { Component, Input, Output, ViewChild, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Beer, FlavorBeer } from '../app.interface';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

const ELEMENT_DATA: FlavorBeer[] =[];

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})

export class BeerListComponent implements OnChanges, OnInit {
	@Input() beerList: Beer[] = [];
	@Input() selectedCategory: string = '';
	@Output() selectedBeer: EventEmitter<Beer> = new EventEmitter<Beer>();
	displayedColumns: string[] = ['name', 'abv', 'rating','earth', 'minerals', 'roasted_burnt', 'herbs_spices', 'fruit', 'pastry', 'flower'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	public clickedBeer: Beer = {};
	public maxRating: number;
	public minRating: number;
	public maxAbv: number;
	public minAbv: number;
	public rating: number;
	public abvForm = new FormGroup({
		minAbvControl: new FormControl(''),
		maxAbvControl: new FormControl(''),
	  });

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {

	}
	
	ngOnChanges(): void {
		const flavorMappedBeers = this.flavorMap(this.beerList);
		this.dataSource = new MatTableDataSource(flavorMappedBeers);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		if (this.clickedBeer.sub_category !== this.selectedCategory) {
			this.clickedBeer = {};
		}
		this.maxRating = Math.max.apply(Math, this.beerList.map((beer) =>  beer.rating));
		this.minRating = Math.min.apply(Math, this.beerList.map((beer) =>  beer.rating));
		this.maxAbv = Math.max.apply(Math, this.beerList.map((beer) =>  beer.abv)).toFixed(1);
		this.minAbv = Math.min.apply(Math, this.beerList.map((beer) =>  beer.abv)).toFixed(1);
		this.abvForm.get('minAbvControl').setValue(this.minAbv);
		this.abvForm.get('maxAbvControl').setValue(this.maxAbv);

	}

	public emitBeer(beer: Beer) {
		if (this.clickedBeer === beer) {
			this.clickedBeer = {};
			this.selectedBeer.emit({});
		} else {
			this.clickedBeer = beer;
			this.selectedBeer.emit(beer);
		}
	}

	public updateRating(event) {
		const filterRating = this.beerList.filter((beer) => beer.rating > event.value);
		this.dataSource = new MatTableDataSource(this.flavorMap(filterRating));
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public updateAbv() {
		const filterBeers = this.beerList.filter((beer) => beer.abv > this.abvForm.get('minAbvControl').value && beer.abv < this.abvForm.get('maxAbvControl').value);
		this.dataSource = new MatTableDataSource(this.flavorMap(filterBeers));
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	private flavorMap(beers: Beer[]): FlavorBeer[] {
		let flavoredBeer: FlavorBeer[] = [];
		beers.forEach((beer) => {
			let beerFlavors: FlavorBeer = {};
			beerFlavors.earth = beer.flavors?.includes('earth') ?? false;
			beerFlavors.minerals = beer.flavors?.includes('minerals') ?? false;
			beerFlavors.roasted_burnt = beer.flavors?.includes('roastedandburnt') ?? false;
			beerFlavors.herbs_spices = beer.flavors?.includes('herbsandspices') ?? false;
			beerFlavors.fruit = beer.flavors?.includes('fruit') ?? false;
			beerFlavors.pastry = beer.flavors?.includes('pastry') ?? false;
			beerFlavors.flower = beer.flavors?.includes('flower') ?? false;

			flavoredBeer.push({...beer, ...beerFlavors});
		});
		return flavoredBeer;
	}

}
