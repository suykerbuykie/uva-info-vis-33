import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public beers: any;
	public loading: boolean = false;

	constructor(private http: HttpClient) {}
	  title = 'ratebeer';

	ngOnInit() {

		// this.http.get(`http://127.0.0.1:5000/beers?query=Ommegang Double Barrel Dubbel`).pipe(
		// 	tap((beer) => {
		// 		console.log(beer)
		// 	})).subscribe();
		
		this.beers = this.http.get(`http://127.0.0.1:5000/style?query=71`).pipe(
			tap((beer) => {
				console.log(beer)
			}))
	}
}
