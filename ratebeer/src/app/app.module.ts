import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BeerComponent } from './beer-component/beer.component';
import { BeerService } from './beer-component/beer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { BeerExplorerComponent } from './beer-explorer/beer-explorer.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BeerStylesComponent } from './beer-styles/beer-styles.component';
import { BeerCategoriesComponent } from './beer-categories/beer-categories.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BeerFlavorSpiderComponent } from './beer-flavor-spider/beer-flavor-spider.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
 
@NgModule({
  declarations: [
	AppComponent,
	BeerDetailsComponent,
	BeerComponent,
	BeerExplorerComponent,
	BeerListComponent,
	BeerStylesComponent,
	BeerCategoriesComponent,
	BeerFlavorSpiderComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AppRoutingModule,
	MatSortModule,
	MatDialogModule,
	ReactiveFormsModule,
	FormsModule,
	MatSliderModule,
	MatExpansionModule,
	MatPaginatorModule,
	MatFormFieldModule,
	MatAutocompleteModule,
	MatInputModule,
	MatSelectModule,
	MatTableModule,
	MatListModule,
	MatFormFieldModule,
	MatOptionModule,
	CommonModule,
	MatTabsModule,
	MatCardModule,
	BrowserAnimationsModule,
	MatButtonModule,
	MatCheckboxModule
  ],
  entryComponents: [BeerDetailsComponent],
  providers: [
	BeerService,
	{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
