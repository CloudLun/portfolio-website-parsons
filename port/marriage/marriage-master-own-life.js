// BAR CHART
const masterOwnLifeBarChart = d3
  .select("#marriage-success-master_own_life")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT * 1.7}, ${MARGIN.TOP})`);


// // TITLE
// unmarriedScatteredChart
//   .append("text")
//   // .attr("class", "title")
//   .attr("x", WIDTH / 2)
//   .attr("y", 0 - MARGIN.TOP / 2)
//   .attr("font-size", "15px")
//   .attr("text-anchor", "middle")
//   .style("fill", "#4c4c4c")
//   .text("Female unmarried ratios by age in Taiwan");

// // LABEL
// const unmarriedScatteredChartXLabel = unmarriedScatteredChart
//   .append("text")
//   .attr("class", "xLabel")
//   .attr("x", WIDTH / 2)
//   .attr("y", HEIGHT + 45)
//   .attr("font-size", "12px")
//   .style("fill", "#4c4c4c")
//   .text("Years Old");

// const unmarriedScatteredChartYLabel = unmarriedScatteredChart
//   .append("text")
//   .attr("class", "yLabel")
//   .attr("x", -(HEIGHT / 2))
//   .attr("y", -45)
//   .attr("font-size", "12px")
//   .attr("text-anchor", "middle")
//   .attr("transform", "rotate(-90)")
//   .style("fill", "#4c4c4c")
//   .text("Unmarried Ratio");

// AXIS
const masterOwnLifeBarChartXAxisGroup = masterOwnLifeBarChart
  .append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0, ${HEIGHT})`);
// .selectAll("text")
// .attr("transform", "rotate(35)");

const masterOwnLifeBarChartYAxisGroup = masterOwnLifeBarChart
  .append("g")
  .attr("class", "yAxis");

d3.csv("./definitions_of_success.csv").then((data) => {
  let x = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, WIDTH - 50]);
  let y = d3
    .scaleBand()
    .domain(
      data.map((d) => {
        return d.definitions;
      })
    )
    .range([0, HEIGHT])
    .padding(0.4);

  // AXIS
  masterOwnLifeBarChartXAxisGroup
    .call(d3.axisBottom(x).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    });
  masterOwnLifeBarChartYAxisGroup.call(d3.axisLeft(y).tickSize(0)).call((g) => {
    g.select(".domain").remove();
  });

  masterOwnLifeBarChart
    .selectAll("rects")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(0))
    .attr("y", (d) => y(d.definitions))
    .attr("height", y.bandwidth)
    .attr("width", (d) => x(d.proportions))
    .attr("fill", (d) =>
      d.definitions === "Master the Own Life" ? "#ffc966" : "#cccccc"
    );
});

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", `${++lineNumber * lineHeight + dy}em`)
          .text(word);
      }
    }
  });
}

// // DOGHNUT CHART
// const radius = Math.min(WIDTH, HEIGHT) / 2 - 20;
// const masterOwnLifeDoghnutsChart = d3
//   .select("#marriage-success-master_own_life")
//   .append("svg")
//   .attr("width", WIDTH + MARGIN.LEFT)
//   .attr("height", HEIGHT + MARGIN.TOP)
//   .append("g")
//   .attr("transform", `translate(${MARGIN.LEFT * 4}, ${MARGIN.TOP * 4})`);

// let data = { "25-35": 51, other_age_group: 49 };

// let pie = d3.pie().value((d) => d.value);

// let masterOwnLifeColor = d3
//   .scaleOrdinal()
//   .domain(data)
//   .range(["#ffc966", "#cccccc"]);

// const data_pie = pie(d3.entries(data));
// console.log(data_pie);
// masterOwnLifeDoghnutsChart
//   .selectAll("pie")
//   .data(data_pie)
//   .enter()
//   .append("path")
//   .attr("d", d3.arc().innerRadius(100).outerRadius(radius))
//   .attr("fill", (d) => masterOwnLifeColor(d.data.key))
//   .style("stroke-width", "2px")
//   .style("opacity", 0.7);
