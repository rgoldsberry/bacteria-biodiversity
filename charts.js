function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // populate the metadata panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // DELIVERABLE 1 - bar chart
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // 3. Create a variable that holds the samples array. 
    let samples = data.samples;

    // 4&5. Create a variable that filters the samples for the object with the desired sample number.
    let sampleRequest = samples.filter(sampleObj => sampleObj.id == sample)[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otuIds = sampleRequest.otu_ids
    let otuLabels = sampleRequest.otu_labels;
    let sampleValues = sampleRequest.sample_values;

    // 7. Create the yticks for the bar chart.
    let yticks = otuIds.slice(0,10).reverse().map(otu => "OTU " + otu);

    // 8. Create the trace for the bar chart. 
    let barData = [{
      x : sampleValues.slice(0,10).reverse(),
      y : yticks,
      type : "bar",
      orientation : "h",
      text : otuLabels.slice(0,10).reverse()
    }];
    
    // 9. Create the layout for the bar chart. 
    let barLayout = {
     title : "Top 10 Bacteria Cultures Found"
    };
    
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // DELIVERABLE 2 - bubble chart
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x : otuIds,
      y : sampleValues,
      text : otuLabels,
      mode : 'markers',
      marker : {
        color : otuIds,
        size : sampleValues,
        colorscale : "Earth"
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title : 'Bacteria Cultures Per Sample',
      xaxis : {title : "OTU ID" },
      hovermode : "closest",
      automargin : true
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);     
    
  });
}
