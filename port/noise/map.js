const map = new L.map("map", { zoomControl: false }).setView(
  [40.75, -73.92],
  11.5
);
// const censusTractLayers = L.layerGroup().addTo(map);
const allGeojson = "./data/NoiseCount_CensusTract.geojson";
const dayTimeGeojson = "./data/NoiseCount_Day.geojson";
const nightTimeGeojson = "./data/NoiseCount_Night.geojson";
const janGeojson = "./data/Jan.geojson";
const febGeojson = "./data/Feb.geojson";
const marGeojson = "./data/Mar.geojson";
const aprGeojson = "./data/Apr.geojson";
const mayGeojson = "./data/May.geojson";
const junGeojson = "./data/Jun.geojson";
const julGeojson = "./data/Jul.geojson";
const augGeojson = "./data/Aug.geojson";
const sepGeojson = "./data/Sep.geojson";
const octGeojson = "./data/Oct.geojson";
const novGeojson = "./data/Nov.geojson";
const decGeojson = "./data/Dec.geojson";

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{userName}/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    maxZoom: 15,
    scrollWheelZoom: false,
    doubleClickZoom: true,
    userName: "cloudlun",
    id: "cl2eq8ceb000a15o06rah6zx5",
    accessToken:
      "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw",
  }
).addTo(map);

L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

function censusTractColor(d) {
  return d > 50000000000
    ? "#dc2c18"
    : d > 15000000000
    ? "#ff5a00"
    : d > 10000000000
    ? "#ffac00"
    : d > 5000000000
    ? "#ffd53e"
    : "#fff8a5";
}
function mapStyle(features) {
  return {
    fillColor: censusTractColor(features.properties.noise_count),
    fillOpacity: 0.7,
    color: "white",
    weight: 0.05,
    opacity: 1,
  };
}
function mapingRanderHandler(file) {
  let polygonLayers = L.layerGroup().addTo(map);
  d3.json(file).then((polygon) => {
    const censusTract = L.geoJSON(polygon, {
      style: mapStyle,
    });
    polygonLayers.addLayer(censusTract);
  });
}

mapingRanderHandler(allGeojson);

d3.selectAll("#time-button").on("click", function () {
  clickValue = this.value;
  if (clickValue == "All") {
    mapingRanderHandler(allGeojson);
  }
  if (clickValue == "Daytime") {
    mapingRanderHandler(dayTimeGeojson);
  }
  if (clickValue == "Nighttime") {
    mapingRanderHandler(nightTimeGeojson);
  }
});

function monthMapsHandler() {
  const month = [
    janGeojson,
    febGeojson,
    marGeojson,
    aprGeojson,
    mayGeojson,
    junGeojson,
    julGeojson,
    augGeojson,
    sepGeojson,
    octGeojson,
    novGeojson,
    decGeojson,
  ];
  let mf = 0;
  let monthFramesInterval = setInterval(monthFramesRender, 1500);
  function monthFramesRender() {
    mapingRanderHandler(month[mf]);
    mf += 1;
    if (mf === month.length) clearInterval(monthFramesInterval);
    d3.select(".day").on("click", function () {
      clearInterval(monthFramesInterval);
      mapingRanderHandler(dayTimeGeojson);
    });
    d3.select(".night").on("click", function () {
      clearInterval(monthFramesInterval);
      mapingRanderHandler(nightTimeGeojson);
    });

    d3.select(".backToAll").on("click", function () {
      clearInterval(monthFramesInterval);
      mapingRanderHandler(allGeojson);
    });
  }
}


