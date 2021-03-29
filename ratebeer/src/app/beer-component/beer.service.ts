import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Beer } from '../app.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class BeerService {
	public beerList: Beer[] = [];
	public categories: any[] = [];
	public broadCategories: any[] = [];
	public similarReviewedBeers: any[] = [];
	public subCategoryAllFlavours: any[] = [];

  	constructor(private http: HttpClient) {}

	public getBeersFromCategory(id: string): Observable<Beer[]> {
		return this.http.get(`http://127.0.0.1:5000/beers?query=${id}`).pipe(
			tap((beers: any) => {
				this.beerList = beers;
			})
		);
	}

	public getCategoryFromBroad(id: string): Observable<any> {
		return this.http.get(`http://127.0.0.1:5000/category?query=${id}`).pipe(
			tap((categories: any) => {
				this.categories = categories;
			})
		);
	}

	public getBroadCategories(): Observable<any> {
		return this.http.get(`http://127.0.0.1:5000/broad-categories`).pipe(
			tap((categories: any) => {
				this.broadCategories = categories;
			})
		);
	}

	public getAllBeers(): Observable<any> {
		return this.http.get(`http://127.0.0.1:5000/all-beers`);
	}

	public getSimilarlyReviewedBeers(id: string): Observable<any> {
		return this.http.get(`http://127.0.0.1:5000/similar_reviewed_beers?query=${id}`).pipe(
			tap((similarReviewedBeers: any) => {
				this.similarReviewedBeers = similarReviewedBeers;
			})
		);
	}

	public getSubcategoryAllFlavours(id: number): Observable<any> {
		return this.http.get(`http://127.0.0.1:5000/subcategory-allflavors?query=${id}`).pipe(
			tap((similarReviewedBeers: any) => {
				this.similarReviewedBeers = similarReviewedBeers;
			})
		);
	}

	public searchingBeer(value: string){
		return of(this.beerList.filter( beer => beer.name?.replace(/[\s]/g,'').toLowerCase().indexOf(value.toLowerCase()) === 0 ));
	}
}
