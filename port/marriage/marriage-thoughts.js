// CANVAS
const marriageThoughtsChart = d3
  .select("#marriage-thoughts")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// // TITLE
// marriageThoughtsChart
//   .append("text")
//   // .attr("class", "title")
//   .attr("x", WIDTH / 2.5)
//   .attr("y", 0 - MARGIN.TOP / 3)
//   .attr("font-size", "15px")
//   .attr("text-anchor", "middle")
//   .style("fill", "#4c4c4c")
//   .text("Proportions of the main thoughts of marriage selected by respondents");

// LABEL
// const marriageThoughtsChartXLabel = marriageThoughtsChart
//   .append("text")
//   .attr("class", "xLabel")
//   .attr("x", WIDTH / 2.5)
//   .attr("y", HEIGHT + 45)
//   .attr("font-size", "12px")
//   .style("fill", "#4c4c4c")
//   .text("Years Old");

// const marriageThoughtsChartYLabel = marriageThoughtsChart
//   .append("text")
//   .attr("class", "yLabel")
//   .attr("x", -(HEIGHT / 2))
//   .attr("y", -45)
//   .attr("font-size", "12px")
//   .attr("text-anchor", "middle")
//   .attr("transform", "rotate(-90)")
//   .style("fill", "#4c4c4c")
//   .text("Unmarried Ratio");

// SCALE
let x = d3
  .scaleLinear()
  .range([0, WIDTH - 40])
  .domain([0, 80]);

// AXIS
marriageThoughtsChart
  .append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(d3.axisBottom(x).tickValues(["20", "40", "60", "80"]).tickSize(0))
  .call((g) => {
    g.select(".domain").remove();
  });

const marriageThoughtsChartYAxis = marriageThoughtsChart
  .append("g")
  .attr("class", "yAxis");

// ELEMENTS
d3.csv("./data/marriage_thoughts.csv").then((data) => {
  data.forEach((d) => {
    d["25-34"] = +d["25-34"];
    d["35-44"] = +d["35-44"];
  });

  const thoughtsGroup = ["Expectations", "Concerns"];
  d3.select("#marriageThoughtsButton")
    .selectAll("marriageThoughtsOptions")
    .data(thoughtsGroup)
    .enter()
    .append("option")
    .text((d) => d) // text showed in the menu
    .attr("value", (d) => d);

  expdata = data.filter((d) => d.thoughts == "Expectations");

  let y = d3
    .scaleBand()
    .range([0, HEIGHT])
    .domain(expdata.map((d) => d.content));
  marriageThoughtsChartYAxis
    .call(d3.axisLeft(y).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    })
    .selectAll(".tick text")
    .call(wrap, y.bandwidth())
    .attr("transform", `translate(65, 0)`);

  marriageThoughtsChart
    .selectAll("lines")
    .data(expdata)
    .enter()
    .append("line")
    .attr("x1", (d) => x(d["25-34"]))
    .attr("x2", (d) => x(d["35-44"]))
    .attr("y1", (d) => y(d.content) + HEIGHT / 10)
    .attr("y2", (d) => y(d.content) + HEIGHT / 10)
    .attr("stroke", "#cccccc")
    .attr("stroke-width", "1px");
  marriageThoughtsChart
    .selectAll("circles")
    .data(expdata)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d["25-34"]);
    })
    .attr("cy", function (d) {
      return y(d.content) + HEIGHT / 10;
    })
    .attr("r", "6")
    .style("fill", "#ffc966");

  // Circles of variable 2
  marriageThoughtsChart
    .selectAll("circles")
    .data(expdata)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d["35-44"]);
    })
    .attr("cy", function (d) {
      return y(d.content) + HEIGHT / 10;
    })
    .attr("r", "6")
    .style("fill", "#cccccc");

  function update(selectedGroup) {
    const dataFilter = data.filter((d) => d.thoughts == selectedGroup);
    console.log(dataFilter);

    let y = d3
      .scaleBand()
      .range([0, HEIGHT])
      .domain(dataFilter.map((d) => d.content));
    marriageThoughtsChartYAxis
      .call(d3.axisLeft(y))
      .call((g) => {
        g.select(".domain").remove();
      })
      .selectAll(".tick text")
      .call(wrap, y.bandwidth())
      .attr("transform", `translate(65, 0)`);

    marriageThoughtsChart.selectAll("line").remove();
    marriageThoughtsChart.selectAll("circle").remove();
    marriageThoughtsChart
      .selectAll("lines")
      .data(dataFilter)
      .enter()
      .append("line")
      .attr("x1", (d) => x(d["25-34"]))
      .attr("x2", (d) => x(d["35-44"]))
      .attr("y1", (d) => y(d.content) + HEIGHT / 10)
      .attr("y2", (d) => y(d.content) + HEIGHT / 10)
      .attr("stroke", "#cccccc")
      .attr("stroke-width", "1px");
    marriageThoughtsChart
      .selectAll("circles")
      .data(dataFilter)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d["25-34"]);
      })
      .attr("cy", function (d) {
        return y(d.content) + HEIGHT / 10;
      })
      .attr("r", "6")
      .style("fill", "#ffc966");
    marriageThoughtsChart
      .selectAll("circles")
      .data(dataFilter)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d["35-44"]);
      })
      .attr("cy", function (d) {
        return y(d.content) + HEIGHT / 10;
      })
      .attr("r", "6")
      .style("fill", "#cccccc");
  }

  // redraw("Expectations");

  d3.select("#marriageThoughtsButton").on("change", function (event, d) {
    // let updateddata = data.filter((d) => d.thoughts === event.target.value);
    let selectedOption = d3.select(this).property("value");
    update(selectedOption);
  });
});

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 5,
      lineHeight = 3, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy);
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 105) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", 1)
          .attr("dy", `${++lineNumber * lineHeight + dy}`)
          .text(word);
      }
    }
  });
}
