d3.selectAll("body").on("change", updatePage);

function updatePage() {
  let dropdownMenu = d3.selectAll("#selectOption").node();
  let dropdownMenuId = dropdownMenu.id;
  let selectedOption = dropdownMenu.value;

  console.log(dropdownMenuId);
  console.log(selectedOption);
}