import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Beer } from '../app.interface';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';

@Component({
  selector: 'app-beer-styles',
  templateUrl: './beer-styles.component.html',
  styleUrls: ['./beer-styles.component.scss']
})
export class BeerStylesComponent implements OnInit {

	@Input() selectedBeer: Beer = {};

	constructor(public dialog: MatDialog) {}
	
	ngOnInit(): void {
	}

	public openDetails() {
		const data = this.selectedBeer;
		if (data.name) {
			this.dialog.open(BeerDetailsComponent, {
				data,
				width: '600px',
				height: '600px'
			});
		} else {
			alert(
				"No Beer to display!"
			)
		}
	}

}
