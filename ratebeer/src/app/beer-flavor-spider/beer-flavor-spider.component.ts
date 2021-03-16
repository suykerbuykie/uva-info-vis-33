import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-beer-flavor-spider',
  templateUrl: './beer-flavor-spider.component.html',
  styleUrls: ['./beer-flavor-spider.component.scss']
})
export class BeerFlavorSpiderComponent implements OnInit {
	@Input() category: any;
	public color: any = {
		"earth": "#73AF48", 
		"herbsandspices": "#38A6A5",
		"fruit": "#94346E",
		"flower": "#666666",
		"minerals": "#E17C05",
		"pastry": "#994E95",
		"roastedandburnt": "#5F4690"
	};
	public charts: any[] = [];
 	constructor() { }

	ngOnInit(): void {
		const d2 = [
			{ name: "earth", v: this.category['earth'] },
			{ name: "herbsandspices", v: this.category["herbsandspices"] },
			{ name: "fruit", v: this.category["fruit"] },
			{ name: "flower", v: this.category["flower"] },
			{ name: "minerals", v: this.category["minerals"] },
			{ name: "pastry", v: this.category["pastry"] },
			{ name: "roastedandburnt", v: this.category["roastedandburnt"] },
		]; 
		const innerRadius = 2;
		const arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius((d:any) => innerRadius + d.data.v*30)
		
		const pie = d3.pie()
			.value(1)
			.sort(null);

		console.log(pie(d2 as any))

		pie(d2 as any).forEach((pie: any) => {

			this.charts.push({path: arc(pie), flavor: pie.data.name});
		});

	}
}
