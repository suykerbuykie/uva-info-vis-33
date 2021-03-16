import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Beer } from '../app.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class BeerService {
	public beerList: Beer[] = [];

  	constructor(private http: HttpClient) {}

	public getBeersFromStyle(styleId: number): Observable<Beer[]> {
		return this.http.get(`http://127.0.0.1:5000/style?query=${styleId}`).pipe(
			tap((beers: any) => {
				this.beerList = beers;
			})
		);
	}

	public searchingBeer(value: string){
		return of(this.beerList.filter( beer => beer.name?.replace(/[\s]/g,'').toLowerCase().indexOf(value.toLowerCase()) === 0 ));
	}
}
