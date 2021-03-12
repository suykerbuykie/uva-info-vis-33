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
 
@NgModule({
  declarations: [
	AppComponent,
	BeerDetailsComponent,
	BeerComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AppRoutingModule,
	MatDialogModule,
	MatSliderModule,
	MatListModule,
	CommonModule,
	MatTabsModule,
	MatCardModule,
	BrowserAnimationsModule,
	MatButtonModule
  ],
  entryComponents: [BeerDetailsComponent],
  providers: [
	BeerService,
	{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
