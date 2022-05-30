const MARGIN = { LEFT: 53, RIGHT: 110, TOP: 10, BOTTOM: 45 };
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 360 - MARGIN.TOP - MARGIN.BOTTOM;
const scrollerOne = scrollama();

// CANVAS
const unmarriedScatteredChart = d3
  .select("#unmarried-ratio-age")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// unmarriedScatteredChart
//   .append("text")
//   .attr("x", WIDTH / 2)
//   .attr("y", 0 - MARGIN.TOP / 2)
//   .attr("text-anchor", "middle")
//   .style("font-size", "16px")
//   .style("text-decoration", "underline");

// TITLE
// unmarriedScatteredChart
//   .append("text")
//   // .attr("class", "title")
//   .attr("x", WIDTH / 2.2)
//   .attr("y", 0 - MARGIN.TOP / 2.5)
//   .attr("font-size", "15px")
//   .attr("text-anchor", "middle")
//   .style("fill", "#4c4c4c")
//   .text("Female unmarried ratios by age in Taiwan");

// LABEL
const unmarriedScatteredChartXLabel = unmarriedScatteredChart
  .append("text")
  .attr("class", "xLabel")
  .attr("x", WIDTH / 2.5)
  .attr("y", HEIGHT + 45)
  .attr("font-size", "12px")
  .style("fill", "#4c4c4c")
  .text("Years Old");

const unmarriedScatteredChartYLabel = unmarriedScatteredChart
  .append("text")
  .attr("class", "yLabel")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -35)
  .attr("font-size", "12px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .style("fill", "#4c4c4c")
  .text("Unmarried Ratio");

// AXIS
const unmarriedScatteredChartXAxisGroup = unmarriedScatteredChart
  .append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0, ${HEIGHT})`);

const unmarriedScatteredChartYAxisGroup = unmarriedScatteredChart
  .append("g")
  .attr("class", "yAxis");

const unmarriedScatteredChartXAxisCall = d3
  .axisBottom()
  .tickValues([
    "20-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55-60",
  ])
  .tickSize(0);
const unmarriedScatteredChartYAxisCall = d3
  .axisLeft()
  .tickValues([
    "0",
    "20",
    "40",
    "60",
    "80",
    "100",
  ])
  .tickSize(0);

// ANIMATION
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

// SCATTERS CHART
d3.csv("./data/unmarried_ratio_age.csv").then((data) => {
  // console.log(data);

  // PREPARE data
  data.forEach((d) => {
    d["2020"] = Number(d["2020"]);
    d["2000"] = Number(d["2000"]);
  });
  let variablesGroup = ["2000", "2020"];
  let dataReady = variablesGroup.map((groupName) => {
    return {
      name: groupName,
      values: data.map((d) => {
        return {
          age: d.age,
          value: d[groupName],
        };
      }),
    };
  });

  //  AGE GROUP
  let dataList = [];
  for (let i in dataReady[0]) {
    for (let d in dataReady[0][i]) {
      dataList.push(dataReady[0][i][d]["age"]);
    }
  }
  dataList.push("");

  // COLOR
  var myColor = d3
    .scaleOrdinal()
    .domain(variablesGroup)
    .range(["#d8d8d8", "#ffc966"]);

  // SCALE
  const x = d3.scalePoint().domain(dataList).range([0, WIDTH-20]);
  const y = d3.scaleLinear().domain([0, 100]).range([HEIGHT, 0]);

  // AXIS
  unmarriedScatteredChartXAxisGroup
    .call(unmarriedScatteredChartXAxisCall.scale(x))
    .call((g) => g.select(".domain").remove())
    .selectAll(".tick line")
    .style("stroke", "#4c4c4c");
  unmarriedScatteredChartXAxisGroup.selectAll("text").style("fill", "#4c4c4c");

  unmarriedScatteredChartYAxisGroup
    .call(unmarriedScatteredChartYAxisCall.scale(y))
    .call((g) => g.select(".domain").remove())
    .selectAll(".tick line")
    .style("stroke", "#4c4c4c");

  unmarriedScatteredChartYAxisGroup.selectAll("text").style("fill", "#4c4c4c");

  // SCATTER LINE CHART
  let line = d3
    .line()
    .x((d) => {
      return x(d.age);
    })
    .y((d) => {
      return y(d.value);
    });

  // function handleStepEnter(response) {
  unmarriedScatteredChart
    .selectAll("lines")
    .data(dataReady)
    .enter()
    .append("path")
    .attr("class", "lines")
    .attr("d", (d) => {
      return line(d.values);
    })
    .attr("stroke", function (d) {
      return myColor(d.name);
    })
    .attr("stroke-width", 3)
    .attr("fill", "none");
  // .call(transition);
  // }

  // function handleStepExit(response) {

  // }

  // function init() {
  //   scrollerOne
  //     .setup({
  //       step: ".step-one",
  //       debug: false,
  //       offset: .8,
  //     })
  //     .onStepEnter(handleStepEnter)
  //     .onStepExit(handleStepExit)
  // }
  // init();

  // unmarriedScatteredChart
  //   .selectAll("dots")
  //   .data(dataReady)
  //   .enter()
  //   .append("g")
  //   .style("fill", function (d) {
  //     return myColor(d.name);
  //   })
  //   .selectAll("points")
  //   .data(function (d) {
  //     return d.values;
  //   })
  //   .enter()
  //   .append("circle")
  //   .attr("cx", function (d) {
  //     return x(d.age);
  //   })
  //   .attr("cy", function (d) {
  //     return y(d.value);
  //   })
  //   .attr("r", 5)
  //   .attr("stroke", "white");
});
