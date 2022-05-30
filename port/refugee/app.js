const margin = { top: 110, right: 50, bottom: 30, left: 50 },
width = 1400 - margin.left - margin.right,
height = 780 - margin.top - margin.bottom;

const svg = d3.select("#ref-viz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
    `translate(${margin.left}, ${margin.top})`);


// GROUP: "Syrian Arab Rep.", "Venezuela (Bolivarian Republic of)", "Afghanistan", "South Sudan", "Myanmar"
let nodeSize = d3.scaleOrdinal().range([15, 10, 15, 15, 15, 15]);
let textSize = d3.scaleOrdinal().range([20, 10, 20, 20, 20, 20]);
let textWeight = d3.scaleOrdinal().range([500, 300, 500, 500, 500]);
let nodeColor = d3.scaleOrdinal().range(["#20578a", "#dadbde", "#d9534f", "#527772", "#bf79b4", "#ffd800"]);
let linkColor = d3.scaleOrdinal().range(["#20578a", "#d9534f", "#527772", "#bf79b4", "#ffd800"]);

const simulation = d3.forceSimulation()
.force("link", d3.forceLink().id(function (d) { return d.id; }))
.force("center", d3.forceCenter(width / 2, height / 2))
.force("charge", d3.forceManyBody().strength(-500))
.force("collide", d3.forceCollide(10).strength(0.9))

d3.json("./dataset/project.json", function (error, graph) {
if (error) throw error;
// Add lines for every link in the dataset
let link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("stroke-width", function (d) { return Math.sqrt(d.weight) / 5; })
    .style('stroke', d => { return linkColor(d.source) })

// Add circles for every node in the dataset
let node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("r", d => { return nodeSize(d.group) })
    .attr("fill", d => { return nodeColor(d.group) })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    )
let text = svg.append('g')
    .selectAll('text')
    .data(graph.nodes)
    .enter().append('text')
    .attr("x", 15)
    .attr("y", ".3em")
    .attr('font-size', d => { return textSize(d.group) })
    .attr('font-weight', d => { return textWeight(d.group) })
    .text(function (d) { return d.id; });


simulation
    .nodes(graph.nodes)
    .on("tick", ticked);

simulation.force("link")
    .links(graph.links)

function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
}

function ticked() {
    link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });

    text.attr("transform", transform);
}
});



function dragstarted(d) {
if (!d3.event.active) simulation.alphaTarget(0.7).restart();
d.fx = d.x;
d.fy = d.y;
}

function dragged(d) {
d.fx = d3.event.x;
d.fy = d3.event.y;
}

function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(0);
d.fx = null;
d.fy = null;
}