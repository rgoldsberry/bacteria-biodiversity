// function to call when the page loads
function init() {
  var selector = d3.select("#selDataset");

  // builds the drop down menu
  d3.json("samples.json").then((data) => {
    // console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

function optionChanged(newSample) {
  // console.log(newSample);
  
  // functions to run when a new sample is selected
  buildMetadata(newSample);
  // buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    let metadata = data.metadata;
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    let PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, val]) => {
      newRow = `${key}: ${val}`
      PANEL.append("h6").text(newRow)
    })
  })
}


init();