import { Component, Input, Output, ViewChild, EventEmitter, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Beer, FlavorBeer } from '../app.interface';
import { MatPaginator } from '@angular/material/paginator';

const ELEMENT_DATA: FlavorBeer[] =[];

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})

export class BeerListComponent implements OnChanges {
	@Input() beerList: Beer[] = [];
	@Input() selectedCategory: string = '';
	@Output() selectedBeer: EventEmitter<Beer> = new EventEmitter<Beer>();
	displayedColumns: string[] = ['name', 'abv', 'rating','earth', 'minerals', 'roasted_burnt', 'herbs_spices', 'fruit', 'pastry', 'flower'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	public clickedBeer: Beer = {};

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	ngOnChanges(): void {
		const flavorMappedBeers = this.flavorMap(this.beerList);
		this.dataSource = new MatTableDataSource(flavorMappedBeers);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		if (this.clickedBeer.sub_category !== this.selectedCategory) {
			this.clickedBeer = {};
		}
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
