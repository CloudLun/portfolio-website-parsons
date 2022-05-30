let data = [
  {
    id:'core values',
    index: "Space Layout",
    courpus:
      "If there are excessive rules in the co-living,it is not home at all",
    orientation: "Home Orientation",
  },
  {
    id:'core values',
    index: "Space Layout",
    courpus: "My roomates can go to my room without asking",
    orientation: "Work Orientation",
  },
  {
    id:'core values',
    index: "Space Layout",
    courpus: "Everything in the public space can be shared",
    orientation: "Home Orientation",
  },
  {
    id:'core values',
    index: "Space Layout",
    courpus: "Public space is my office, and my room is where I relax",
    orientation: "Home Orientation",
  },
  {
    id:'core values',
    index: "Space Layout",
    courpus: "When I am in my own room, I do not want to be bothered",
    orientation: "Home Orientation",
  },
  {
    id:'core values',
    index: "Life Phase",
    courpus: "Co-living life is an adventure.",
    orientation: "Explore Orientation",
  },
  {
    id:'core values',
    index: "Life Phase",
    courpus:
      "Trying to find new paths and possibilities during the co-living period",
    orientation: "Explore Orientation",
  },
  {
    id:'core values',
    index: "Life Phase",
    courpus:
      "Instead of finding social circle, my goal is to explore new city culture.",
    orientation: "Explore Orientation",
  },
  {
    id:'core values',
    index: "Life Phase",
    courpus: "I try to develope the living pattern during my work",
    orientation: "Work Orientation",
  },
  {
    id:'core values',
    index: "Life Phase",
    courpus:
      "When I am at home, seeing my roomates, I will not feel lonely anymore",
    orientation: "Home Orientation",
  },
  {
    id:'core values',
    index: "Life Phase",
    courpus: "Hoping co-living space can be my another sweet home",
    orientation: "Home Orientation",
  },
  {
    id:'core values',
    index: "Social Work",
    courpus: "I have made several new friends from dacing club",
    orientation: "Explore Orientation",
  },
  {
    id:'core values',
    index: "Social Work",
    courpus: "I co-work on the small projects with my roomates",
    orientation: "Work Orientation",
  },
  {
    id:'core values',
    index: "Social Work",
    courpus: "I use the lunch time to meet new working partners",
    orientation: "Work Orientation",
  },
  {
    id:'core values',
    index: "Social Work",
    courpus: "Making new close frineds is why I move into co-living space.",
    orientation: "Explore Orientation",
  },
];

const nestedData = d3
  .nest()
  .key((d) => d.id)
  .key(d => d.index)
  .entries(data);

const treeData = d3.hierarchy(nestedData[0], (d) => d.values);

const treeLayout = d3.tree().size([600,500])
treeLayout(treeData)

let parentsNumber = 20;

treeNodes = d3.select("g").append("g").attr("class", "nodes");
treeNodes
  .selectAll("circle")
  .data(treeData.descendants().slice(0, parentsNumber))
  .enter()
  .append("circle")
  .attr("class", "circle")
  .attr('transform', d => `translate(${d.y},${d.x})`)
  .attr("r", 8)
  .attr("fill", "orange");

d3.select('svg g.links')
    .selectAll('line')
    .data(treeData.links())
    .enter()
    .append('path')
    .classed('d', true)
    .attr('d', function(d) {
        return "M" + d.target.y + "," + d.target.x
        + "C" + (d.source.y + 100) + ',' + d.target.x
        + " " + (d.source.y + 100) + ',' + d.source.x
        + " " + d.source.y + ',' + d.source.x
    })
    

