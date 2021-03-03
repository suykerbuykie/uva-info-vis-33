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
	public loading: boolean = true;

	constructor(private http: HttpClient) {}
	  title = 'ratebeer';

	ngOnInit() {
		this.loading = true;
		this.http.get(`http://127.0.0.1:5000/beers`).pipe(
			tap((beers) => {
				this.loading = false;
				this.beers = beers 
			})).subscribe();
	}
}
