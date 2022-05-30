const MARGIN = { LEFT: 45, RIGHT: 10, TOP: 20, BOTTOM: 50 };
const WIDTH = 340 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 550 - MARGIN.TOP - MARGIN.BOTTOM;

// MONTH COUNT CHART
const noiseCountMonth = d3
  .select(".month-chart-container")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

const noiseCountMonthXLabel = noiseCountMonth
  .append("text")
  .attr("class", "xLabel")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .style("fill", "#d3d3d3")
  .text("Month");

const noiseCountMonthXAxis = noiseCountMonth.append("g").attr("class", "xAxis");
const noiseCountMonthYAxis = noiseCountMonth.append("g").attr("class", "yAxis");

function tweenDash() {
  const l = this.getTotalLength();
  i = d3.interpolateString(0 + "," + l, l + "," + l);
  return function (t) {
    return i(t);
  };
}
function transition(path) {
  path.transition().duration(2000).attrTween("stroke-dasharray", tweenDash);
  // .on('end', () => {d3.selectAll('.lines').call(transition)})
}

d3.csv("./data/noiseCount_Month.csv").then((data) => {
  data.forEach((d) => {
    d["noise_count"] = +d["noise_count"];
  });
  let x = d3
    .scalePoint()
    .domain(data.map((d) => d.month))
    .range([0, WIDTH]);
  let y = d3.scaleLinear().domain([30000, 100000]).range([HEIGHT, 0]);
  noiseCountMonthXAxis
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(x).tickSize(0).tickPadding([11]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountMonthYAxis
    .call(d3.axisLeft(y).ticks(4).tickSize(0).tickPadding([10]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountMonthXAxis.selectAll("text").style("fill", "#d3d3d3");
  noiseCountMonthYAxis.selectAll("text").style("fill", "#d3d3d3");

  noiseCountMonth
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#dc2c18")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.month);
        })
        .y(function (d) {
          return y(d.noise_count);
        })
    )
    .call(transition);
});

