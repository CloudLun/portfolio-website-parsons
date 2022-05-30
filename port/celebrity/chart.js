let selectedOption = "youtuber";

const WIDTH = document.getElementById("celebrity-circle-chart").offsetWidth;
const HEIGHT = document.getElementById("celebrity-circle-chart").offsetHeight;
const LINEWIDTH = document.getElementById("celebrity-line-chart").offsetWidth;
const LINEHEIGHT = document.getElementById("celebrity-line-chart").offsetHeight;

const MARGIN = {
  TOP: 0,
  RIGHT: 0,
  BOTTOM: 0,
  LEFT: 20,
};
const barHeight = 320;

let svg = d3
  .select("#celebrity-circle-chart")
  .append("svg")
  .attr("width", WIDTH * 0.95)
  .attr("height", HEIGHT)
  .append("g")
  .attr("transform", `translate(${WIDTH * 0.5}, ${HEIGHT * 0.5})`);

const celebrityTypes = d3
  .select("#celebrity-line-chart")
  .append("svg")
  .attr("width", LINEWIDTH)
  .attr("height", LINEHEIGHT)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

d3.csv("../celebrity/data/overall.csv").then((data) => {
  console.log(data);
  data.forEach((d) => {
    d["youtuber"] = Number(d["youtuber"]);
    d["entertainer"] = Number(d["entertainer"]);
    d["fashion"] = Number(d["fashion"]);
  });
  // d3.select("#selectButton")
  //     .selectAll('myOptions')
  //     .data(allGroup)
  //     .enter()
  //     .append('option')
  //     .text(function (d) {
  //         return d;
  //     }) // text showed in the menu
  //     .attr("value", function (d) {
  //         return d;
  //     }) // corresponding value returned by the button

  // let maxv = d3.max(data, function (d) {
  //   return Number(d[selectedOption]);
  //   // parseInt
  // });
  // console.log(maxv);

  // let minv = d3.min(data, function (d) {
  //   return Math.floor(d[selectedOption]);
  // });
  // console.log(minv);

  // CIRCLE CHART
  let barScale = d3.scaleLinear().domain([0, 250]).range([0, barHeight]);

  let keys = data.map(function (d) {
    return d.age;
  });

  let numBars = keys.length;
  console.log(numBars);

  let x = d3.scaleLinear().domain([0, 250]).range([0, -barHeight]);
  // let y = d3.scaleLinear().domain(extent).range([0,100]);

  // CIRCLES
  circles = svg
    .selectAll("circle")
    .data(barScale.ticks(4))
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return barScale(d);
    })
    .style("fill", "none")
    .style("stroke", "#191919")
    .style("stroke-dasharray", "2,2")
    .style("stroke-width", ".5px")
    .style("opacity", "0.3");

  svg
    .append("circle")
    .attr("r", barHeight)
    // .classed("outer", true)
    .style("fill", "none")
    .style("stroke", "#191919")
    .style("stroke-width", ".5px")
    .style("opacity", "0.5");

  // LINES
  svg
    .selectAll("line")
    .data(keys)
    .enter()
    .append("line")
    .attr("y2", -barHeight)
    .style("stroke", "#191919")
    .style("stroke-width", ".18px")
    .style("opacity", 1)
    .attr("transform", function (d, i) {
      return "rotate(" + ((i - 0.5) * 360) / numBars + ")";
    });

  svg
    .selectAll("line")
    .data(keys)
    .enter()
    .append("line")
    .attr("y2", -barHeight)
    .style("stroke", "#191919")
    .style("stroke-width", ".18px")
    .style("opacity", 1)
    .attr("transform", function (d, i) {
      return "rotate(" + ((i + 0.5) * 360) / numBars + ")";
    });

  // SEGMENTS
  let arc = d3
    .arc()
    .startAngle(function (d, i) {
      return ((i - 0.5) * 2 * Math.PI) / numBars;
    })
    .endAngle(function (d, i) {
      return ((i + 0.5) * 2 * Math.PI) / numBars;
    })
    .innerRadius(0);

  segments = svg
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .each(function (d, i) {
      d.outerRadius = 0;
    })
    .style("fill", (d) => {
      if (d.age >= 16 && d.age < 26) {
        return "#ed6a5e";
      }
      if (d.age > 25 && d.age < 36) {
        return "#507dbc";
      }
      if (d.age > 35 && d.age < 46) {
        return "#4c956c";
      }
    })
    .style("opacity", "0.5")
    .attr("d", arc);

  function circleUpdate() {
    segments
      .transition()
      .duration(1000)
      .delay(function (d, i) {
        return (20 - i) * 20;
      })
      .attrTween("d", function (d, index) {
        let i = d3.interpolate(d.outerRadius, barScale(d[selectedOption]));
        return function (t) {
          d.outerRadius = i(t);
          return arc(d, index);
        };
      });

    svg.selectAll("g").remove();

    svg
      .append("g")
      .attr("class", "x axis")
      .style("stroke", "#191919")
      .style("stroke-width", "0.2px")
      .style("font-size", "8px")
      .style("font-weight", "300")
      .style("text-anchor", "start")
      .attr("transform", "translate(-1.5, 0)")
      .call(d3.axisLeft(x).tickValues([100, 150, 200]).tickSize(0.5))
      .call((g) => {
        g.select(".domain").remove();
      });
    labelRadius = barHeight * 1.025;

    labels = svg.append("g").attr("class", "labels");

    labels
      .append("def")
      .append("path")
      .attr("id", "label-path")
      .attr(
        "d",
        "m0 " +
          -labelRadius +
          " a" +
          labelRadius +
          " " +
          labelRadius +
          " 0 1,1 -0.01 0"
      );

    labels
      .selectAll("text")
      .data(keys)
      .enter()
      .append("text")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "300")
      .style("fill", function (d, i) {
        return "#191919";
      })
      .append("textPath")
      .attr("xlink:href", "#label-path")
      .attr("startOffset", function (d, i) {
        return (i * 100) / numBars + "%";
      })
      .text(function (d) {
        return d;
      });
  }

  // LINE CHART
  const celebrityTypesX = d3
    .scaleBand()
    .domain(data.map((d) => d.age))
    .range([0, LINEWIDTH - 40]);
  const celebrityTypesY = d3
    .scaleLinear()
    .domain([0, 250])
    .range([LINEHEIGHT, 0]);

  const celebrityTypesXAxis = celebrityTypes
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${LINEHEIGHT-0})`)
    .call(d3.axisBottom(celebrityTypesX).tickValues([16, 25, 35, 45]).tickSize(1))
    .call((g) => {
      g.select(".domain").remove();
    })
    .style('fill', '#191919')
    .style("font-weight", "300")

  const celebrityTypesYAxis = celebrityTypes
    .append("g")
    .attr("class", "YAxis")
    .call(d3.axisLeft(celebrityTypesY).ticks(3).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    })
    .style('fill', '#191919')
    .style("font-weight", "300")

  s = celebrityTypes
    .selectAll("rects")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => celebrityTypesX(d.age))
    .attr("y", (d) => celebrityTypesY(0))
    .attr("width", celebrityTypesX.bandwidth())
    .attr("height", (d) => LINEHEIGHT - celebrityTypesY(0))
    .style("fill", (d) => {
      if (d.age >= 16 && d.age < 26) {
        return "#ed6a5e";
      }
      if (d.age > 25 && d.age < 36) {
        return "#507dbc";
      }
      if (d.age > 35 && d.age < 46) {
        return "#4c956c";
      }
    })
    .style("stroke", "#191919")
    .style("stroke-width", "0.1px")
    .style("opacity", "0.6");
  function barUpdate() {
    s
      .transition()
      .duration(1000)
      .delay(function (d, i) {
        return (20-i) * 20;
      })
      .attr("y", (d) => celebrityTypesY(d[selectedOption]))
      .attr("height", (d) => LINEHEIGHT - celebrityTypesY(d[selectedOption]));
  }
  circleUpdate();
  barUpdate();

  // // When the button is changed, run the updateChart function
  d3.select("#celebrity-type").on("change", function (d) {
    selectedOption = d3.select(this).property("value");
    circleUpdate();
    barUpdate();
  });
});
