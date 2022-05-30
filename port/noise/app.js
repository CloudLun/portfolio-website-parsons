const timeFilterbtn = document.querySelector(".filter-day");
const dayTime = document.querySelector(".day");
const nightTime = document.querySelector(".night");
const all = document.querySelector(".all");
const monthContent = document.querySelector(".timeline-month");
const timeline = document.querySelector(".timeline-container");
const backToAll = document.querySelector(".backToAll");
const monthChartArea = document.querySelector('.month-chart-container')
const dayChartArea = document.querySelector('.day-chart-container')
const nightChartArea = document.querySelector('.night-chart-container')
const dayTypeHourChartArea =  document.querySelector('.day-type-chart-container')
const nightTypeHourChartArea =  document.querySelector('.night-type-chart-container')

// TIME MAP SEGMENT
timeFilterbtn.addEventListener("click", (event) => {
  target = event.target.classList;
  console.log(target);
  if (target.contains("day")) {
    dayTime.classList.add("clicked");
    nightTime.classList.remove("clicked");
    all.classList.remove("clicked");
    timeline.setAttribute("data-visible", false);
    monthChartArea.setAttribute("data-visible", false);
    // dayChartArea.setAttribute("data-visible", true)
    nightChartArea.setAttribute("data-visible", false)
    dayTypeHourChartArea.setAttribute("data-visible", true)
    nightTypeHourChartArea.setAttribute("data-visible", false)
  }
  if (target.contains("night")) {
    nightTime.classList.add("clicked");
    dayTime.classList.remove("clicked");
    all.classList.remove("clicked");
    timeline.setAttribute("data-visible", false);
    monthChartArea.setAttribute("data-visible", false);
    dayChartArea.setAttribute("data-visible", false)
    // nightChartArea.setAttribute("data-visible", true)
    dayTypeHourChartArea.setAttribute("data-visible", false)
    nightTypeHourChartArea.setAttribute("data-visible", true)
  }
  if (target.contains("all")) {
    dayTime.classList.remove("clicked");
    nightTime.classList.remove("clicked");
    all.classList.add("clicked");
    timeline.setAttribute("data-visible", true);
    monthChartArea.setAttribute("data-visible", true);
    dayChartArea.setAttribute("data-visible", false)
    nightChartArea.setAttribute("data-visible", false)
    dayTypeHourChartArea.setAttribute("data-visible", false)
    nightTypeHourChartArea.setAttribute("data-visible", false)
  }
});

// TIMELINE MONTH CONTENT ANIMATION
function monthContentHandler() {
  let mt = 0;
  const monthList = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthContentInterval = setInterval(monthContentRender, 1550);
  function monthContentRender() {
    monthContent.innerHTML = `<h1 class="month-content">${monthList[mt]}</h1>`;
    mt += 1;
    if (mt === monthList.length) clearInterval(monthContentInterval);
  }
  timeline.addEventListener("click", (event) => {
    let target = event.target.classList;
    if (target == "backToAll") {
      clearInterval(monthContentInterval)
      monthContent.innerHTML = `<h1 class="month-content">January</h1>`;
    }
  });
}

// TIMELINE ANIMATION
let timelineAnimation = anime({
  duration: 19500,
  autoplay: false,
  targets: ".ticks",
  easing: "easeOutExpo",
  //   direction: 'alternate',
  keyframes: [
    { translateX: 0 },
    { translateX: 20 },
    { translateX: 40 },
    { translateX: 60 },
    { translateX: 80 },
    { translateX: 100 },
    { translateX: 120 },
    { translateX: 140 },
    { translateX: 160 },
    { translateX: 180 },
    { translateX: 200 },
    { translateX: 220 },
    { translateX: 240 },
  ],
});

document.querySelector(".timeline-btn .play").addEventListener("click", () => {
  monthContentHandler();
  monthMapsHandler();
});

// document.querySelector(".timeline-btn .play").onclick = timelineAnimation.play;
