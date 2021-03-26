import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-beer-categories',
  templateUrl: './beer-categories.component.html',
  styleUrls: ['./beer-categories.component.scss']
})
export class BeerCategoriesComponent implements OnChanges {
	@Input() categories: any[] = [];
	@Output() selectedCategoryId: EventEmitter<string> = new EventEmitter<string>();
	public selectedBeer: string = '';

  	constructor() { }

	ngOnChanges(): void {
		// console.log(this.categories, 'uuuu')
	}


	public emitCategoryId(id: string) {
		this.selectedBeer = id;
		this.selectedCategoryId.emit(id);
	}

}
