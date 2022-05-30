// BAR CHART
const familyHappinessBarChart = d3
  .select("#marriage-success-family_happiness")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// LABEL
const familyHappinessBarChartXLabel = familyHappinessBarChart
  .append("text")
  .attr("class", "xLabel")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .style("fill", "#4c4c4c");
// .text("Definitions");

const familyHappinessBarChartYLabel = familyHappinessBarChart
  .append("text")
  .attr("class", "yLabel")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -80)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .style("fill", "#4c4c4c");
// .text("Proportions");

// AXIS
const familyHappinessBarChartXAxisGroup = familyHappinessBarChart
  .append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0, ${HEIGHT})`);
// .selectAll("text")
// .attr("transform", "rotate(35)");

const familyHappinessBarChartYAxisGroup = familyHappinessBarChart
  .append("g")
  .attr("class", "yAxis");

d3.csv("./definitions_of_success.csv").then((data) => {

  let x = d3.scaleLinear().domain([0, 100]).range([0, WIDTH]);
  let y = d3
    .scaleBand()
    .domain(
      data.map((d) => {
        return d.definitions;
      })
    )
    .range([0, HEIGHT])
    .padding(0.4);

  let successBarChartColor = d3
    .scaleOrdinal()
    .domain(data)
    .range(["#ffc966", "#cccccc"]);

  // AXIS
  familyHappinessBarChartXAxisGroup
    .call(d3.axisBottom(x).ticks(5).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    });
  familyHappinessBarChartYAxisGroup
    .call(d3.axisLeft(y).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    })
    .selectAll(".tick text")
    .call(wrap, y.bandwidth())

  familyHappinessBarChart
    .selectAll("rects")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(0))
    .attr("y", (d) => y(d.definitions))
    .attr("height", y.bandwidth)
    .attr("width", (d) => x(d.proportions))
    .attr("fill", (d) =>
      d.definitions === "Family Happiness" ? "#ffc966" : "#cccccc"
    );
});

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1,
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


