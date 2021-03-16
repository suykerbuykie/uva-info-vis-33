import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-beer-categories',
  templateUrl: './beer-categories.component.html',
  styleUrls: ['./beer-categories.component.scss']
})
export class BeerCategoriesComponent implements OnInit {
	@Output() selectedStyleId: EventEmitter<number> = new EventEmitter<number>();

  	constructor() { }

	ngOnInit(): void {
	}


	public emitStyleId(id: number) {
		this.selectedStyleId.emit(id);
	}

}
