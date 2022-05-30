const scrollerTwo = scrollama();

const unmarriedBarChart = d3
  .select("#unmarried-ratio")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// TITLE
// unmarriedBarChart
//   .append("text")
//   // .attr("class", "title")
//   .attr("x", WIDTH / 2.2)
//   .attr("y", 0 - MARGIN.TOP / 2.5)
//   .attr("font-size", "15px")
//   .attr("text-anchor", "middle")
//   .style("fill", "#4c4c4c")
//   .text("Female Millennials Say No to Marriage");
  
// LABEL
const unmarriedBarChartXLabel = unmarriedBarChart
  .append("text")
  .attr("class", "xLabel")
  .attr("x", WIDTH / 3.2)
  .attr("y", HEIGHT + 45)
  .attr("font-size", "12px")
  .style("fill", "#4c4c4c")
  .text("The extent of marriage willingness");

const unmarriedBarChartYLabel = unmarriedBarChart
  .append("text")
  .attr("class", "yLabel")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -35)
  .attr("font-size", "12px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .style("fill", "#4c4c4c")
  .text("Ratio");

// LEGEND
legend = unmarriedBarChart.append('g')
  .attr('class', 'legend')
  


// AXIS
const unmarriedBarChartXAxisGroup = unmarriedBarChart
  .append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0, ${HEIGHT})`);

const unmarriedBarChartYAxisGroup = unmarriedBarChart
  .append("g")
  .attr("class", "yAxis");

// BAR CHART
d3.csv("./data/unmarried_ratio.csv").then((data) => {
  // console.log(data);

  //   SCALE
  let x = d3
    .scaleBand()
    .domain(
      data.map((d) => {
        return d.extent;
      })
    )
    .range([0, WIDTH-20])
    .padding(0.4);
  let y = d3.scaleLinear().domain([0, 25]).range([HEIGHT, 0]);

  // AXIS
  unmarriedBarChartXAxisGroup.call(d3.axisBottom(x).tickSize(0)).call((g) => {
    g.select(".domain").remove();
  });
  unmarriedBarChartYAxisGroup.call(d3.axisLeft(y).tickSize(0).ticks(5)).call((g) => {
    g.select(".domain").remove();
  });

  unmarriedBarChartXAxisGroup
    .selectAll(".tick line")
    .style("stroke", "#4c4c4c");
  unmarriedBarChartYAxisGroup
    .selectAll(".tick line")
    .style("stroke", "#4c4c4c");

  unmarriedBarChartXAxisGroup.selectAll("text").style("fill", "#4c4c4c");
  unmarriedBarChartYAxisGroup.selectAll("text").style("fill", "#4c4c4c");

  //   BARS
  unmarriedBarChart
    .selectAll("rects")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.extent))
    .attr("y", (d) => {
      return y(0);
    })
    .attr("width", (d) => {
      return x.bandwidth();
    })
    .attr("height", (d) => HEIGHT - y(0))
    .attr("fill", (d) => {
      if (d.extent === "0") {
        return "#ffc966";
      } else {
        return "#cccccc";
      }
    });

  // function StepEnterHandler(response) {
    unmarriedBarChart
      .selectAll("rect")
      // // .transition()
      // .duration(300)
      .attr("y", function (d) {
        return y(d.freq);
      })
      .attr("height", function (d) {
        return HEIGHT - y(d.freq);
      })
      // .delay(function (d, i) {
      //   return i * 200;
      // });
  // }

  // function handleStepExit(response) {
  //   unmarriedBarChart
  //     .selectAll("rect")
  //     .transition()
  //     .duration(300)
  //     .attr("y", function (d) {
  //       return y(0);
  //     })
  //     .attr("height", function (d) {
  //       return HEIGHT - y(0);
  //     })
  //     .delay(function (d, i) {
  //       return i * 200;
  //     });
  // }

  // function init() {
  //   scrollerTwo
  //     .setup({
  //       step: ".step-two",
  //       debug: false,
  //       offset: 0.3,
  //     })
  //     .onStepEnter(StepEnterHandler)
  //     // .onStepExit(handleStepExit);
  // }
  // init();
});
