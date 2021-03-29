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

	ngOnChanges(): void {
		let currentBroad = null;
		if (!this.selectedBeer) {
			currentBroad = this.categories[0]?.broad_category_id;
		} else if (currentBroad !== this.categories[0]?.broad_category_id) {
			this.emitCategoryId('');
		}
	}


	public emitCategoryId(id: string) {
		this.selectedBeer = id;
		this.selectedCategoryId.emit(id);
	}

}
