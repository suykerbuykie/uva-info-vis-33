import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private http: HttpClient) {}
  	title = 'ratebeer';

	ngOnInit() {

		this.http.get(`http://127.0.0.1:5000/beers?query=karmeliet`).pipe(
			tap((beer) => {
				console.log(beer)
			})).subscribe();
	}
}
