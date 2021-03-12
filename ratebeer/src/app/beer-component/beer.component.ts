import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { tap } from 'rxjs/operators';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'beer-component',
  templateUrl: './beer.component.html'
})
export class BeerComponent implements OnInit {
	@Input() beers: any;
	private tree: any;
	// SVG dimension variables
	private width = 800;
    private radius = this.width / 2;
	
	private margin = { top: 10, right: 10, bottom: 10, left: 10 };
	
	public selectedCat: string = '';
	public selectedSubCat: string = '';
	public abv = 0;
	public minAbv = 0;
	public maxAbv = 15;
	public showTicks = false;
	public tickInterval = 0.1;
	public autoTicks = false;
	public filtersDisabled = true;

	constructor(private http: HttpClient, public dialog: MatDialog) {}

	ngOnInit() {
		this.tree = d3.cluster().size([2 * Math.PI, this.radius - 100])

		this.draw_tree(this.beers);

	}

	public changeValue(event: any) {
		this.abv = event.value;
	} 

	public updateGraph() {
		const tempDraw = this.beers.children.filter((beer: any) => this.abv >= beer.abv);
		const children = this.mapBeers(tempDraw);
		const newDrawing = {children, name: this.selectedSubCat};
		this.draw_tree(newDrawing);
	}

	public getSliderTickInterval(): number | 'auto' {
		if (this.showTicks) {
		  return this.autoTicks ? 'auto' : this.tickInterval;
		}
	
		return 0;
	  }

	public autoBox(svg: any) {
		const c = document.querySelector("#vis-container")
		// @ts-ignore: Object is possibly 'null'.
		c.innerHTML = '';
		// @ts-ignore: Object is possibly 'null'.

		c.appendChild(svg._groups[0][0]);
		// const {x, y, width, height} = (c as SVGSVGElement).getBBox();
		const {x, y, width, height} = {x: -700, y: -500, width: 1400, height: 1400};
		return [x, y, width, height];
	}

	public draw_tree(data: any) {
		// const nested_beers = d3.group(data, d => d.style, d => d.substyle, d => d.name);
		// Root
		const root = this.tree(d3.hierarchy(data));
		console.log(root)
	  
		const svg = d3.create("svg");
		svg.append("g")
			.attr("fill", "none")
			.attr("stroke", "#555")
			.attr("stroke-opacity", 0.4)
			.attr("stroke-width", 1.5)
		  .selectAll("path")
		  .data(root.links())
		  .join("path")
			.attr("d", d3.linkRadial<any, unknown, number>().angle((d: any) => d.x).radius((d: any) => d.y));
		
		svg.append("g")
		  .selectAll("circle")
		  .data(root.descendants())
		  .join("circle")
		  .attr("transform", (d: any) => `
			rotate(${d.x * 180 / Math.PI - 90})
			translate(${d.y},0)`)
		  .attr("fill", (d: any) => d.children ? "#555" : "#ccc")
		  .attr("r",  (d: any) => d.children ? 4 : 2.5);
		
		svg.append("g")
		  .selectAll("circle")
		  .data(root.descendants())
		  .join("circle")
		  .attr("transform", (d: any) => `
			rotate(${d.x * 180 / Math.PI - 90})
			translate(${d.y},0)`)
		  .attr("fill", "#fff")
		  .attr("r",  (d: any) => d.children ? 2.5 : 0);
	  
		svg.append("g")
			.attr("font-family", "sans-serif")
			.attr("stroke-linejoin", "round")
			.attr("stroke-width", 3)
		  .selectAll("text")
		  .data(root.descendants())
		  .join("text")
			.attr("transform", (d: any) => `
			  rotate(${d.x * 180 / Math.PI - 90}) 
			  translate(${d.y},0) 
			  rotate(${d.x >= Math.PI ? 180 : 0})
			`)
			.classed("svg-text", true)
			.attr("dy", "0.31em")
			.attr("x", (d: any) => d.x < Math.PI === !d.children ? 6 : -6)
			.style("font-weight", (d: any) => d.children ? "bold": "normal")
			.style("font-size", (d: any) => d.children ? "10px": "9px")
			.attr("text-anchor", (d: any) => d.x < Math.PI === !d.children ? "start" : "end")
			.text((d: any) => d.data.name)
			.on("click", (e,d: any) => this.load_and_draw(d.data))
			
		  // Copy the text, set below current text, add white stroke
		  .clone(true)
			.lower()
			.attr("stroke", "white");
	  
		svg.attr("viewBox", this.autoBox(svg) as any).node();
	  }

	  private load_and_draw(data: any) {
		  if (data.children) {
			  this.selectedCat = data.name;
			this.draw_tree(data);
		  } else if (data.url) {
			this.dialog.open(BeerDetailsComponent, {
				data,
				width: '600px',
				height: '600px'
			  });
		  } else {
			  this.http.get(`http://127.0.0.1:5000/style?query=${data.id}`).pipe(
				  tap((beers) => {
					  const children = this.mapBeers(beers);
					  const newDrawing = {children, name: data.name};
					  this.selectedSubCat = data.name;
					  this.beers = newDrawing;
					  this.filtersDisabled = false;
					this.draw_tree(newDrawing);
				})).subscribe();
		  }
	  }

	  private mapBeers(beers: any) {
		const returnBeers: any = [];

		if (beers.length) {
			beers.forEach((beer: any) => {
				returnBeers.push(beer);
			});
		} else {
			for (var key in beers) {
				// check if the property/key is defined in the object itself, not in parent
				if (beers.hasOwnProperty(key)) {           
					returnBeers.push(beers[key]);
				}
			}
		}
		return returnBeers;
	  }
}
