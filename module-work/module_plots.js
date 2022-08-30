// just console logging the data to explore
/* d3.json("samples.json").then(function (data) {
  console.log(data);
});
 */

// getting the data loaded, then sorting by wfreq, then filtering out nulls
/* d3.json("samples.json").then(function (data) {
  let wfreq=data.metadata.map(person => person.wfreq).sort((a,b) => b - a);
  let fiteredWfreq = wfreq.filter(freq => freq != null);
  console.log(fiteredWfreq);
}); */

// printing all the metadata for first person in dataset
/* d3.json("samples.json").then(function (data) {
  let personVals = Object.entries(data.metadata[0])
  personVals.forEach(([first, second]) => console.log(first + ": " + second))
}); */

// making a dynamic line chart

// a placeholder when the page loads

function init() {
  let data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
  }];

  let layout = {
    title: "Welcome to the page"
  };

  Plotly.newPlot("plot", data, layout);
};

// listen for menu changes
d3.selectAll("#dropdownMenu").on("change", updatePlotly);

function updatePlotly() {
  let dropdownMenu = d3.selectAll("#dropdownMenu").node();
  let dataset = dropdownMenu.value;

  let xData = [1, 2, 3, 4, 5];
  let yData = [];
  let title = "";

  if (dataset === "dataset1") {
    yData = [1, 2, 4, 8, 16];
    thisTitle = "Dataset 1";
  };

  if (dataset === "dataset2") {
    yData = [1, 10, 100, 1000, 10000];
    thisTitle = "Dataset 2";
  };

  let trace = {
    x: [xData],
    y: [yData]
  }

  let layout = {
    title: thisTitle
  };

  // Plotly.restyle("plot", trace, layout);
  // note: restyle only operates on the data/traces
  // update works on both data and layout
  // https://plotly.com/javascript/plotlyjs-function-reference/#plotlyupdate
  Plotly.update("plot", trace, layout);
}

// call the page loading function
init();