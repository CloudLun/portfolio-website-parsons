const LINEWIDTH = document.getElementById("celebrity-line-chart").offsetWidth;
const LINEHEIGHT = document.getElementById("celebrity-line-chart").offsetHeight;

const MARGIN = {
  TOP: 10,
  RIGHT: 0,
  BOTTOM: 0,
  LEFT: 20,
};

const types = ["youtuber", "entertainer", "fashion"];

const celebrityTypes = d3
  .select("#celebrity-line-chart")
  .append("svg")
  .attr("width", LINEWIDTH)
  .attr("height", LINEHEIGHT + 30)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

const celebrityTypesLabel = celebrityTypes
  .append("text")
  .attr("class", "xLabel")
  .attr("x", LINEWIDTH / 2)
  .attr("y", LINEHEIGHT + 50)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .style("fill", "#d3d3d3")
  .text("Time");

d3.csv("./data/overall.csv").then((data) => {
  data.forEach((d) => {
    d["age"] = +d["age"];
    d["youtuber"] = +d["youtuber"];
    d["entertainer"] = +d["entertainer"];
    d["fashion"] = +d["fashion"];
  });

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
    .attr("transform", `translate(0, ${LINEHEIGHT})`)
    .call(d3.axisBottom(celebrityTypesX).tickValues([16, 25, 35, 45]))
    .call((g) => {
      g.select(".domain").remove();
    });
  const celebrityTypesYAxis = celebrityTypes
    .append("g")
    .attr("class", "YAxis")
    .call(d3.axisLeft(celebrityTypesY).ticks(4).tickSize(0))
    .call((g) => {
      g.select(".domain").remove();
    });

  function typesChangehandler() {
    celebrityTypes
      .selectAll("rects")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => celebrityTypesX(d.age))
      .attr("y", (d) => celebrityTypesY(d[selectedOption]))
      .attr("width", celebrityTypesX.bandwidth())
      .attr("height", (d) => LINEHEIGHT - celebrityTypesY(d[selectedOption]))
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
  }
  typesChangehandler();

  d3.select("#celebrity-type").on("change", function (d) {
    celebrityTypes.selectAll("rect").remove();
    selectedOption = d3.select(this).property("value");
    typesChangehandler()
  });
});
