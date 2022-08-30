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
d3.json("samples.json").then(function (data) {
  let personVals = Object.entries(data.metadata[0])
  personVals.forEach(([first, second]) => console.log(first + ": " + second))
});