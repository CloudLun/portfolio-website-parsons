const HOURMARGIN = { LEFT: 45, RIGHT: 78, TOP: 20, BOTTOM: 50 };
const HOURWIDTH = 340 - HOURMARGIN.LEFT - HOURMARGIN.RIGHT;
const HOURHEIGHT = 550 - HOURMARGIN.TOP - HOURMARGIN.BOTTOM;
const halfDayHour = 12;

// DAY COUNT CHART
const noiseCountDay = d3
  .select(".day-chart-container")
  .append("svg")
  .attr("width", HOURWIDTH + HOURMARGIN.LEFT + HOURMARGIN.RIGHT)
  .attr("height", HOURHEIGHT + HOURMARGIN.TOP + HOURMARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${HOURMARGIN.LEFT}, ${HOURMARGIN.TOP})`);

const noiseCountDayXLabel = noiseCountDay
  .append("text")
  .attr("class", "xLabel")
  .attr("x", HOURWIDTH / 2)
  .attr("y", HOURHEIGHT + 50)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .style("fill", "#d3d3d3")
  .text("Time");

const noiseCountDayXAxis = noiseCountDay.append("g").attr("class", "xAxis");
const noiseCountDayYAxis = noiseCountDay.append("g").attr("class", "yAxis");

d3.csv("./data/noiseCount_Day_Hour.csv").then((data) => {
  data.forEach((d) => {
    d["noise_count"] = +d["noise_count"];
  });
  let dayX = d3
    .scalePoint()
    .domain(data.map((d) => d.hour))
    .range([0, WIDTH]);
  let dayY = d3.scaleLinear().domain([7000, 30000]).range([HOURHEIGHT, 0]);
  noiseCountDayXAxis
    .attr("transform", `translate(0, ${HOURHEIGHT})`)
    .call(d3.axisBottom(dayX).tickSize(0).tickPadding([11]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountDayYAxis
    .call(d3.axisLeft(dayY).ticks(5).tickSize(0).tickPadding([10]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountDayXAxis.selectAll("text").style("fill", "#d3d3d3");
  noiseCountDayYAxis.selectAll("text").style("fill", "#d3d3d3");

  noiseCountDay
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
          return dayX(d.hour);
        })
        .y(function (d) {
          return dayY(d.noise_count);
        })
    );
});

// DAY HOUR COUNT CHART
const noiseCountDayTypeHour = d3
  .select(".day-type-chart-container")
  .append("svg")
  .attr("width", HOURWIDTH + HOURMARGIN.LEFT + HOURMARGIN.RIGHT)
  .attr("height", HOURHEIGHT + HOURMARGIN.TOP + HOURMARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${HOURMARGIN.LEFT}, ${HOURMARGIN.TOP})`);

const noiseCountDayTypeHourXLabel = noiseCountDayTypeHour
  .append("text")
  .attr("class", "xLabel")
  .attr("x", HOURWIDTH / 2)
  .attr("y", HOURHEIGHT + 50)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .style("fill", "#d3d3d3")
  .text("Time");

d3.csv("./data/noiseCountType_DayHour.csv").then((data) => {
  data.forEach((d) => {
    d["noise_count"] = +d["noise_count"];
  });

  let nestDayType = d3
    .nest()
    .key((d) => d.complaint_type)
    .entries(data);

  let nestDayTypeList = nestDayType.map((d) => d.key);
  //   console.log(nestDayType.map((d) => d.n));
  const noiseCountDayTypeHourXAxis = noiseCountDayTypeHour
    .append("g")
    .attr("class", "xAxis");
  const noiseCountDayTypeHourYAxis = noiseCountDayTypeHour
    .append("g")
    .attr("class", "yAxis");

  let dayTypeX = d3
    .scalePoint()
    .domain(data.map((d) => d.hour))
    .range([0, HOURWIDTH]);
  let dayTypeY = d3.scaleLinear().domain([150, 15000]).range([HOURHEIGHT, 0]);
  noiseCountDayTypeHourXAxis
    .attr("transform", `translate(0, ${HOURHEIGHT})`)
    .call(d3.axisBottom(dayTypeX).tickSize(0).tickPadding([11]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountDayTypeHourYAxis
    .call(d3.axisLeft(dayTypeY).ticks(4).tickSize(0).tickPadding([10]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountDayTypeHourXAxis.selectAll("text").style("fill", "#d3d3d3");
  noiseCountDayTypeHourYAxis.selectAll("text").style("fill", "#d3d3d3");

  let noiseDayHourCountTypeColor = d3
    .scaleOrdinal()
    .domain(nestDayTypeList)
    .range(["#f45b69", "#06a77d", "#c670ff", "#00a8e8", "#ffe047"]);

  // console.log(nestDayType.map((d) => d.key));

  noiseCountDayTypeHour
    .selectAll("text.label")
    .data(nestDayType)
    .join("text")
    .attr("class", "label")
    .attr("x", HOURWIDTH - HOURMARGIN.RIGHT + 83)
    .attr("y", (d) => dayTypeY(d.values[halfDayHour - 1].noise_count))
    .attr("dy", "0.35em")
    .style("fill", (d) => noiseDayHourCountTypeColor(d.key))
    .style("font-family", "sans-serif")
    .style("font-size", 9)
    .text((d) => d.key);

  noiseCountDayTypeHour
    .selectAll(".line")
    .data(nestDayType)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", (d) => noiseDayHourCountTypeColor(d.key))
    .attr("stroke-width", 1.5)
    .attr("d", function (d) {
      return d3
        .line()
        .x(function (d) {
          return dayTypeX(d.hour);
        })
        .y(function (d) {
          return dayTypeY(+d["noise_count"]);
        })(d.values);
    });
});

// NIGHT COUNT CHART
const noiseCountNight = d3
  .select(".night-chart-container")
  .append("svg")
  .attr("width", HOURWIDTH + HOURMARGIN.LEFT + HOURMARGIN.RIGHT)
  .attr("height", HOURHEIGHT + HOURMARGIN.TOP + HOURMARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${HOURMARGIN.LEFT}, ${HOURMARGIN.TOP})`);

const noiseCountNightXLabel = noiseCountNight
  .append("text")
  .attr("class", "xLabel")
  .attr("x", HOURWIDTH / 2)
  .attr("y", HOURHEIGHT + 50)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .style("fill", "#d3d3d3")
  .text("Time");

const noiseCountNightXAxis = noiseCountNight.append("g").attr("class", "xAxis");
const noiseCountNightYAxis = noiseCountNight.append("g").attr("class", "yAxis");

d3.csv("./data/noiseCount_Night_Hour.csv").then((data) => {
  data.forEach((d) => {
    d["noise_count"] = +d["noise_count"];
  });

  let nightX = d3
    .scalePoint()
    .domain(data.map((d) => d.hour))
    .range([0, HOURWIDTH]);
  let nightY = d3.scaleLinear().domain([6000, 80000]).range([HOURHEIGHT, 0]);
  noiseCountNightXAxis
    .attr("transform", `translate(0, ${HOURHEIGHT})`)
    .call(d3.axisBottom(nightX).tickSize(0).tickPadding([11]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountNightYAxis
    .call(d3.axisLeft(nightY).ticks(4).tickSize(0).tickPadding([10]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountNightXAxis.selectAll("text").style("fill", "#d3d3d3");
  noiseCountNightYAxis.selectAll("text").style("fill", "#d3d3d3");

  noiseCountNight
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
          return nightX(d.hour);
        })
        .y(function (d) {
          return nightY(d.noise_count);
        })
    );
});

// NIGHT HOUR COUNT CHART

const noiseCountNightTypeHour = d3
  .select(".night-type-chart-container")
  .append("svg")
  .attr("width", HOURWIDTH + HOURMARGIN.LEFT + HOURMARGIN.RIGHT)
  .attr("height", HOURHEIGHT + HOURMARGIN.TOP + HOURMARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${HOURMARGIN.LEFT}, ${HOURMARGIN.TOP})`);

const noiseCountNightTypeHourXLabel = noiseCountNightTypeHour
  .append("text")
  .attr("class", "xLabel")
  .attr("x", HOURWIDTH / 2)
  .attr("y", HOURHEIGHT + 50)
  .attr("font-size", "16px")
  .attr("text-anchor", "middle")
  .style("fill", "#d3d3d3")
  .text("Time");

d3.csv("./data/noiseCountType_NightHour.csv").then((data) => {
  data.forEach((d) => {
    d["noise_count"] = +d["noise_count"];
  });

  let nestNightType = d3
    .nest()
    .key((d) => d.complaint_type)
    .entries(data);

  let nestNightTypeList = nestNightType.map((d) => d.key);
  const noiseCountNightTypeHourXAxis = noiseCountNightTypeHour
    .append("g")
    .attr("class", "xAxis");
  const noiseCountNightTypeHourYAxis = noiseCountNightTypeHour
    .append("g")
    .attr("class", "yAxis");

  let nightTypeX = d3
    .scalePoint()
    .domain(data.map((d) => d.hour))
    .range([0, HOURWIDTH]);
  let nightTypeY = d3.scaleLinear().domain([150, 20000]).range([HOURHEIGHT, 0]);
  noiseCountNightTypeHourXAxis
    .attr("transform", `translate(0, ${HOURHEIGHT})`)
    .call(d3.axisBottom(nightTypeX).tickSize(0).tickPadding([11]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountNightTypeHourYAxis
    .call(d3.axisLeft(nightTypeY).ticks(5).tickSize(0).tickPadding([10]))
    .call((g) => {
      g.select(".domain").remove();
    });
  noiseCountNightTypeHourXAxis.selectAll("text").style("fill", "#d3d3d3");
  noiseCountNightTypeHourYAxis.selectAll("text").style("fill", "#d3d3d3");


  let noiseNightHourCountTypeColor = d3
  .scaleOrdinal()
  .domain(nestNightTypeList )
  .range(["#f45b69", "#06a77d", "#c670ff", "#00a8e8", "#ffe047"])

  // console.log(nestNightType.map(d => d))

  noiseCountNightTypeHour
    .selectAll("text.label")
    .data(nestNightType)
    .join("text")
    .attr("class", "label")
    .attr("x", HOURWIDTH - HOURMARGIN.RIGHT + 83)
    .attr("y", (d) => nightTypeY(d.values[halfDayHour - 1].noise_count)+ (d.key === 'Loud Talking' ? -7.5 : 0))
    .style("fill", (d) => noiseNightHourCountTypeColor(d.key))
    .style("font-family", "sans-serif")
    .style("font-size", 9)
    .text((d) => d.key);

  noiseCountNightTypeHour
    .selectAll(".line")
    .data(nestNightType)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", (d) => noiseNightHourCountTypeColor(d.key))
    .attr("stroke-width", 1.5)
    .attr("d", function (d) {
      return d3
        .line()
        .x(function (d) {
          return nightTypeX(d.hour);
        })
        .y(function (d) {
          return nightTypeY(+d["noise_count"]);
        })(d.values);
    });
});
