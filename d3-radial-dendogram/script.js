"use strict";

// SVG dimension variables
const width = 800,
      radius = width / 2;

const margin = { top: 10, right: 10, bottom: 10, left: 10 }

// Generator functions
const tree = d3.cluster().size([2 * Math.PI, radius - 100])



function autoBox() {
    const c = document.querySelector("#vis-container")
    c.innerHTML = '';
    c.appendChild(this);
    const {x, y, width, height} = this.getBBox();
    return [x, y, width, height];
}

function draw_tree(data) {
  // const nested_beers = d3.group(data, d => d.style, d => d.substyle, d => d.name);
  // Root
  const root = tree(d3.hierarchy(data));
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
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));
  
  svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
    .attr("transform", d => `
      rotate(${d.x * 180 / Math.PI - 90})
      translate(${d.y},0)`)
    .attr("fill", d => d.children ? "#555" : "#ccc")
    .attr("r",  d => d.children ? 4 : 2.5);
  
  svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
    .attr("transform", d => `
      rotate(${d.x * 180 / Math.PI - 90})
      translate(${d.y},0)`)
    .attr("fill", "#fff")
    .attr("r",  d => d.children ? 2.5 : 0);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0) 
        rotate(${d.x >= Math.PI ? 180 : 0})
      `)
      .classed("svg-text", true)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .style("font-weight", d => d.children ? "bold": "normal")
      .style("font-size", d => d.children ? "10px": "9px")
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .text(d => d.data.name)
      .on("click", (e,d) => load_and_draw(d.data.name.replaceAll("/", "_")))
      
    // Copy the text, set below current text, add white stroke
    .clone(true)
      .lower()
      .attr("stroke", "white");

  svg.attr("viewBox", autoBox).node();
}

function load_and_draw(filename) {
  d3.json(filename)
    .then(data => {
      draw_tree(data);
    }
  )
}

load_and_draw("beerstyles.json")


