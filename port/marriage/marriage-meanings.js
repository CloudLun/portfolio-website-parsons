const meaningsBarChartCanvas = d3
  .select("#marriage-meanings")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const meaningsBarChart = meaningsBarChartCanvas
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT * 2}, ${MARGIN.TOP})`);

// // TITLE
// meaningsBarChart
//   .append("text")
//   // .attr("class", "title")
//   .attr("x", WIDTH / 2.5)
//   .attr("y", 0 - MARGIN.TOP / 2)
//   .attr("font-size", "15px")
//   .attr("text-anchor", "middle")
//   .style("fill", "#4c4c4c")
//   .text("Proportions of the significant meanings of marriage chosen by respondents");

// // LABEL
// const meaningsBarChartXLabel = meaningsBarChart
//   .append("text")
//   .attr("class", "xLabel")
//   .attr("x", WIDTH / 2.5)
//   .attr("y", HEIGHT + 45)
//   .attr("font-size", "12px")
//   .style("fill", "#4c4c4c")
//   .text("Ratio");

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
const meaningsBarChartXAxisGroup = meaningsBarChart
  .append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0, ${HEIGHT})`);
const meaningsBarChartYAxisGroup = meaningsBarChart
  .append("g")
  .attr("class", "yAxis");

// GROUPED BARS
d3.csv("./data/marriage_meanings.csv").then((data) => {

  data.forEach((d) => {
    d["25-34"] = Number(d["25-34"]);
    d["45-54"] = Number(d["45-54"]);
  });


  const subgroups = data.columns.slice(1);


  const groups = data.map((d) => d.meanings);



  // Add X axis
  const x = d3
    .scaleLinear()
    .domain([0, 50])
    .range([0, WIDTH - 20]);
  meaningsBarChartXAxisGroup
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(x).tickValues([
      "0",
      "10",
      "20",
      "30",
      "40"
    ]).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    });
  // .selectAll("text");
  // .style('text-anchor', 'end')
  // .attr('transform', 'rotate(-35)')

  // Add Y axis
  const y = d3.scaleBand().domain(groups).range([HEIGHT, 0]);

  // Another scale for subgroup position?
  const ySubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, y.bandwidth()])
    .padding([0.2])

  meaningsBarChartYAxisGroup
    .call(d3.axisLeft(y).tickPadding([10]).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    })
    .selectAll(".tick text")
    .call(wrap, y.bandwidth())
    .attr("transform", `translate(-5, 0)`);


  // color palette = one color per subgroup
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#ffc966", "#cccccc"]);

  // Show the bars
  meaningsBarChart
    .append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(0, ${y(d.meanings)})`)
    .selectAll("rect")
    .data(function (d) {
      return subgroups.map(function (key) {
        return { key: key, value: d[key] };
      });
    })
    .join("rect")
    .attr("y", (d) => ySubgroup(d.key))
    .attr("x", (d) => x(0))
    .attr("height", ySubgroup.bandwidth())
    .attr("width", (d) => x(d.value))
    .attr("fill", (d) => color(d.key));
});
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 0, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 5)
        .attr("y", y)
        .attr("dy", dy);
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 108) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", `${++lineNumber * lineHeight + dy}`)
          .text(word);
      }
    }
  });
}
