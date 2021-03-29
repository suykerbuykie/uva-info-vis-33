import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Beer } from '../app.interface';
import { BeerService } from '../beer-component/beer.service';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';

@Component({
  selector: 'app-beer-styles',
  templateUrl: './beer-styles.component.html',
  styleUrls: ['./beer-styles.component.scss']
})
export class BeerStylesComponent implements OnInit, OnChanges {
	public allGraphData: any[] = [];
	public graphData: any[] = [];
	public maxBeers: number = 0;
	public presentFlavors: any[] = [];
	public activeFlavors: any[] = [];
	public flavorList: string[] = [];
	public radius: number = 7;
	public spacing: number = 5;
	

	@Input() selectedBeer: Beer = {};

	constructor(public dialog: MatDialog, private beerService: BeerService) {}
	
	ngOnInit(): void {
		
	}

	ngOnChanges(): void {
		if (this.selectedBeer && this.selectedBeer.beer_id) {
			this.beerService.getSubcategoryAllFlavours(this.selectedBeer.beer_id).pipe(
				tap((sets) => {
					
					// Calculate unique set intersections
					const {intersections, soloSets} = this.formatIntersectionData(sets);
					const allGraphData = this.insertSoloDataOutersect(intersections, soloSets);
					this.allGraphData = allGraphData.sort((a:any, b:any) => b.setName.length - a.setName.length);

					// Get all present flavors && set first 5 active
					this.presentFlavors = sets.map((a:any, i:number) => ({name: a.name, active: 5>i}));

					// Set first 5 flavors active & update graphdata
					this.updateFlavors();
					
				})
			).subscribe();
		}
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

	public insertSoloDataOutersect (intersections: any, soloSets: any) {
		soloSets.forEach((x:any) => {
			// compile all unique values from other sets except current set
			const otherSets = [...new Set(soloSets.map((y: any) => y.setName === x.setName ? [] : y.values).flat())];
			
			// subtract otherSets values from current set values
			const values = x.values.filter((y:any) => !otherSets.includes(y));
			intersections.push({
				name: x.name,
				setName: x.setName,
				num: values.length,
				values: values,
			})
		})
		return intersections;
	}

	public formatIntersectionData = (data:any) => {
		// compiling solo set data - how many values per set
		const soloSets: any = [];
	  
		// nameStr is for the setName, which makes it easy to compile
		// each name would be A, then B, so on..
		const nameStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, data.length);
	  
		data.forEach((x:any, i:number) => {
			soloSets.push({
			  name: x.name,
			  setName: nameStr.substr(i, 1),
			  num: x.values.length,
			  values: x.values,
			})
	
		});
	  
		// compiling list of intersection names recursively
		// ["A", "AB", "ABC", ...]
		const getIntNames = (start:any, end:any, nameStr:any):any => {
		  // eg. BCD
		  const name = nameStr.substring(start, end);
	  
		  // when reaching the last letter
		  if (name.length === 1) {
			return [name];
		  }
		  const retArr = getIntNames(start + 1, end, nameStr);
	  
		  // eg. for name = BCD, would return [B] + [BC,BCD,BD] + [C,CD,D]
		  return [name[0]].concat(retArr.map((x:any) => name[0] + x), retArr);
		};
	  
		let intNames = getIntNames(0, nameStr.length, nameStr);
	  
		// removing solo names
		intNames = intNames.filter((x:any) => x.length !== 1);
	  
		let intersections: any = [];
	  
		// compile intersections of values for each intersection name
		intNames.forEach((intName: any) => {
		  // collecting all values: [pub1arr, pub2arr, ...]
		  const values = intName.split('').map((set: any) => soloSets.find((x:any) => x.setName === set).values);
	  
		  // getting intersection
		  // https://stackoverflow.com/questions/37320296/how-to-calculate-intersection-of-multiple-arrays-in-javascript-and-what-does-e
		  const result = values.reduce((a:any, b:any) => a.filter((c:any) => b.includes(c)));
		  if (result.length > 0) {
		  
			intersections.push({
			  name: intName.split('').map((set:any) => soloSets.find((x:any) => x.setName === set).name).join(' + '),
			  setName: intName,
			  num: result.length,
			  values: result,
			});
		  };
		});
	  
		// taking out all 0s
		intersections = intersections.filter((x:any) => x.value !== 0);
		return { intersections, soloSets };
	};

	public updateFlavors() {
		this.activeFlavors = this.presentFlavors.filter(f => f.active);
		this.updateGraphData();
	}

	public updateGraphData() {
		const fL = this.presentFlavors.filter(a => !a.active).map(a => a.name);
		this.flavorList = this.presentFlavors.filter(a => a.active).map(a => a.name);
		this.graphData = this.allGraphData.filter(a => !fL.some(el => a.name.includes(el)))
		this.maxBeers = Math.max(...this.graphData.map((a: any)  => a.values.length));

		// console.log(this.graphData, this.flavorList);
		// this.graphData = gD.filter(a => );

	}

}
