var widther = document.getElementById('my_dataviz').offsetWidth;
var heighter = document.getElementById('my_dataviz').offsetHeight;
console.log(heighter)
let initial = false
let xAxis, yAxis, transformer = 1
var x, y, color, legend
let zoom = d3.zoom()
    .scaleExtent([.5, 20])
    .scaleExtent([1, 20])
    .translateExtent([
        [0, 0],
        [widther, heighter]
    ])
    .on('zoom', handleZoom);

let qgender = ["HE-HIM", "SHE-HER", "NON-BINARY"]
let cgender = ["#fe3ff1", "#3323fc", "#ffffff"]
let ngender = ["28.55%", "69.49%", "1.97%"]

let qraces = ["WHITE", "MIXED", "ASIAN", "LATINO-HISPANIC", "INDEGIOUS", "BLACK"]
let craces = ["#ff9900", "#fc584c", "#ff4f8b", "#a166ff", "#19a2c7", "#56c0a7"]
let nraces = ["62.48%", "8.12%", "21.88%", "4.19%", "0.34%", "2.99%"]

let qedu = ['ASSOCIATE', 'CERT.', 'HIGHSCHOOL', 'COLLEGE', 'MASTER', 'PHD']
let cedu = ["#8b5ffc", "#00cbbf", "#900c3e", "#ff0967", "#f0f44b", "#2e3046"]
let nedu = ["3.85%", "0.17%", "1.54%", "86.50%", "7.86%", "0.09%"]

let qori = ['STRAIGHT', 'BI-PAN', 'GAY-LES', 'QUEER-FLUID', 'DEMI', 'ASEXUAL', 'UNDISCLOSED']
let cori = ["#f72585", "#b5179e", "#7209b7", "#480ca8", "#4361ee", "#4895ef"]
let nori = ["79.40%", "10.00%", "5.73%", "4.44%", "0.09%", "0.26%", "0.09%"]

// sidebard
var toggleBtn = document.querySelector('.project');
var closer = document.querySelector('#closer');
var sidebar = document.querySelector('section');

toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('is-closed');
})

closer.addEventListener('click', function () {
    sidebar.classList.toggle('is-closed');
})

$(document).ready(function () {

    /*! Fades in page on load */
    $('body').css('display', 'none');
    $('body').fadeIn(2000);

});

function handleZoom(e) {
    transformer = (((e.transform.x + e.transform.y) / 2 * -1 / 400) + 1)

    d3.selectAll(".main")
        .attr('r', 6 / (((e.transform.x + e.transform.y) / 2 * -1 / 400) + 1))
        .attr('transform', e.transform);

    // recover the new scale
    var newX = e.transform.rescaleX(x);
    var newY = e.transform.rescaleY(y);

    console.log(newX)
    // update axes with these new boundaries
    xAxis.call(d3.axisBottom(newX).scale(newX).ticks(5).tickFormat((d, i) => d + " yrs"))
    yAxis.call(d3.axisLeft(newY).scale(newY).ticks(5).tickFormat((d, i) => "$ " + d.toLocaleString()))
}

function initZoom() {
    d3.select('svg')
        .call(zoom);
}

// set the dimensions and margins of the graph
const margin = {
        top: 100,
        right: 300,
        bottom: 80,
        left: 45
    },
    width = widther - margin.left - margin.right,
    height = heighter - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

var compareValue = 2;

function compareClick(compare) {
    compareValue = compare.value;
    updateData(compareValue)
}

var chartValue = 2;

function chartClick(chart) {
    chartValue = chart.value;
}

window.onresize = function () {
    location.reload();
}

function updateData(compare) {

    // Color
    if (compare == 1) {
        color = d3.scaleOrdinal()
            .domain(qgender)
            .range(cgender);

        d3.csv("cleanData.csv", function (data) {
            // Select the section we want to apply our changes to
            svg.selectAll("circle")
                .style("fill", function (d) {
                    return color(d.Pronouns)
                })
        });

        legend.remove()

        legend = svg
            .append('g') // NEW
            .attr('class', 'legend') // NEW

        for (let i = 0; i < qgender.length; i++) {
            legend.append("circle").attr("cx", widther - 200 - 60).attr("cy", height - 250 + i * 30).attr("r", 6).style("fill", cgender[i])
            legend.append("text").attr("x", widther - 188 - 60).attr("y", height - 250 + i * 30).text(qgender[i] + "  " + ngender[i]).style("font-size", "13px").style("font-family", "'IBM Plex Mono', monospace").style("fill", "#fff").attr("alignment-baseline", "middle")
        }
    } else if (compare == 2) {
        color = d3.scaleOrdinal()
            .domain(qraces)
            .range(craces);

        d3.csv("cleanData.csv", function (data) {
            // Select the section we want to apply our changes to
            svg.selectAll("circle")
                .style("fill", function (d) {
                    return color(d.Race)
                })
        });

        legend.remove()

        legend = svg
            .append('g') // NEW
            .attr('class', 'legend') // NEW

        for (let i = 0; i < qraces.length; i++) {
            legend.append("circle").attr("cx", widther - 200 - 60).attr("cy", height - 330 + i * 30).attr("r", 6).style("fill", craces[i])
            legend.append("text").attr("x", widther - 188 - 60).attr("y", height - 330 + i * 30).text(qraces[i] + "  " + nraces[i]).style("font-size", "13px").style("font-family", "'IBM Plex Mono', monospace").style("fill", "#fff").attr("alignment-baseline", "middle")
        }
    } else if (compare == 3) {
        color = d3.scaleOrdinal()
            .domain(qedu)
            .range(cedu);

        d3.csv("cleanData.csv", function (data) {
            // Select the section we want to apply our changes to
            svg.selectAll("circle")
                .style("fill", function (d) {
                    return color(d.Education)
                })
        });

        legend.remove()

        legend = svg
            .append('g') // NEW
            .attr('class', 'legend') // NEW

        for (let i = 0; i < qedu.length; i++) {
            legend.append("circle").attr("cx", widther - 200 - 60).attr("cy", height - 330 + i * 30).attr("r", 6).style("fill", cedu[i])
            legend.append("text").attr("x", widther - 188 - 60).attr("y", height - 330 + i * 30).text(qedu[i] + "  " + nedu[i]).style("font-size", "13px").style("font-family", "'IBM Plex Mono', monospace").style("fill", "#fff").attr("alignment-baseline", "middle")
        }
    } else if (compare == 4) {
        color = d3.scaleOrdinal()
            .domain(qori)
            .range(cori);

        d3.csv("cleanData.csv", function (data) {
            // Select the section we want to apply our changes to
            svg.selectAll("circle")
                .style("fill", function (d) {
                    return color(d.Orientation)
                })
        });

        legend.remove()

        legend = svg
            .append('g') // NEW
            .attr('class', 'legend') // NEW

        for (let i = 0; i < qori.length; i++) {
            legend.append("circle").attr("cx", widther - 200 - 60).attr("cy", height - 360 + i * 30).attr("r", 6).style("fill", cori[i])
            legend.append("text").attr("x", widther - 188 - 60).attr("y", height - 360 + i * 30).text(qori[i] + "  " + nori[i]).style("font-size", "13px").style("font-family", "'IBM Plex Mono', monospace").style("fill", "#fff").attr("alignment-baseline", "middle")
        }
    }

}

//Read the data
d3.csv("cleanData.csv").then(function (data) {

    // Add X axis
    x = d3.scaleLinear()
        .domain([-5, 42])
        .range([0, width]);
    var x_axis = d3.axisBottom(x).scale(x).ticks(5).tickFormat((d, i) => d + " yrs");


    // Add Y axis
    y = d3.scalePow()
        .exponent(-0.2)
        .domain([15000, 15000])
        .range([height, 0]);
    var formatComma = d3.format(",")
    var y_axis = d3.axisLeft(y).scale(y).ticks(6).tickFormat((d, i) => "$ " + formatComma(d));

    // Color
    color = d3.scaleOrdinal()
        .domain(qraces)
        .range(craces);

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + width * 0.02 + ", 0)")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.Years);
        })
        .attr("cy", function (d) {
            return y(d.Salary);
        })
        .attr("r", 6 / transformer)
        .attr("class", function (d) {
            return "main dot " + d.Race + " " + d.Education + " " + d.Pronouns + " " + d.Orientation;
        })
        .style("fill", function (d) {
            return color(d.Race)
        })
        .on("mouseover", function (event, d) {

            pSalary = String(d.Salary).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            pRace = capitalizeFirstLetter(d.Race)
            pPronouns = capitalizeFirstLetter(d.Pronouns)
            pEducation = capitalizeFirstLetter(d.Education)
            pOri = capitalizeFirstLetter(d.Orientation)

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d.Title +
                    '<br>' +
                    '$ ' + pSalary + '<br>' + '<br>' +
                    d.Years + ' yrs experience' + '<br>' +
                    d.City + '<br><br>' + 'Race: ' +
                    pRace + '<br>Gender: ' + pPronouns + '<br>Orientation: ' + pOri + '<br>Edu: ' +
                    pEducation + ' degree')
                .style("left", (event.pageX + 20) + "px")
                .style("top", (event.pageY - 28) + "px");

            if (initial) {

                if (compareValue == 1) {
                    selected = d.Pronouns;
                } else if (compareValue == 2) {
                    selected = d.Race;
                } else if (compareValue == 3) {
                    selected = d.Education;
                } else if (compareValue == 4) {
                    selected = d.Orientation;
                }

                d3.selectAll(".dot")
                    .transition()
                    .duration(200)
                    .style("fill", "#333333")
                    .attr("r", 0 / transformer)

                d3.selectAll("." + selected)
                    .transition()
                    .duration(200)
                    .style("fill", color(selected))
                    .attr("r", 6 / transformer)
            }

            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 10 / transformer)

        })

        .on("mouseleave", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);


            if (initial) {
                if (compareValue == 1) {
                    d3.selectAll(".dot")
                        .transition()
                        .duration(200)
                        .style("fill", d => color(d.Pronouns))
                        .attr("r", 6 / transformer)
                } else if (compareValue == 2) {
                    d3.selectAll(".dot")
                        .transition()
                        .duration(200)
                        .style("fill", d => color(d.Race))
                        .attr("r", 6 / transformer)
                } else if (compareValue == 3) {
                    d3.selectAll(".dot")
                        .transition()
                        .duration(200)
                        .style("fill", d => color(d.Education))
                        .attr("r", 6 / transformer)
                } else if (compareValue == 4) {
                    d3.selectAll(".dot")
                        .transition()
                        .duration(200)
                        .style("fill", d => color(d.Orientation))
                        .attr("r", 6 / transformer)
                }

                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", 6 / transformer)
            }
        });

    xAxis = svg.append("g")
        .attr("class", "myXaxis") // Note that here we give a class to the X axis, to be able to call it later and modify it
        .attr("transform", 'translate(0, ' + (height - 10) + ')')
        .call(x_axis)
        .attr("opacity", "0")
    yAxis = svg.append("g")
        .attr("class", "myYaxis")
        .attr("transform", "translate(30, 0)")
        .call(y_axis);


    // new X axis
    y.domain([20000, 620000])

    svg.select(".myYaxis")
        .transition()
        .duration(2000)
        .attr("opacity", "1")
        .call(y_axis);

    svg.select(".myXaxis")
        .transition()
        .duration(5000)
        .attr("opacity", "1")
        .call(x_axis);

    initialAnimate();
    setTimeout(function () {
        initial = true
        d3.selectAll(".dot")
            .transition()
            .duration(500)
            .attr("r", 6 / transformer)
    }, 6000);

    // labels
    svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "end")
        .style("text-align", "left")
        .attr("x", 110)
        .attr("y", height + 45)
        .text("Years of Experience");

    //legend
    legend = svg
        .append('g') // NEW
        .attr('class', 'legend') // NEW

    for (let i = 0; i < qraces.length; i++) {
        legend.append("circle").attr("cx", widther - 200 - 60).attr("cy", height - 330 + i * 30).attr("r", 6).style("fill", craces[i])
        legend.append("text").attr("x", widther - 188 - 60).attr("y", height - 330 + i * 30).text(qraces[i] + "  " + nraces[i]).style("font-size", "13px").style("font-family", "'IBM Plex Mono', monospace").style("fill", "#fff").attr("alignment-baseline", "middle")
    }

    // functions
    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }

    function initialAnimate() {
        svg.selectAll("circle")
            .transition()
            .delay(function (d, i) {
                return (i * 3)
            })
            .duration(2000)
            .attr("cx", function (d) {
                return x(d.Years);
            })
            .attr("cy", function (d) {
                return y(d.Salary);
            })

    }

    function capitalizeFirstLetter(string) {
        string = string.toLowerCase()
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

})


initZoom();