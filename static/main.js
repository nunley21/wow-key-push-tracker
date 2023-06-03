

$.getJSON('/api/get_all', function(data) {



    for (let team in data) {
        generateTable(team, Object.keys(data[team]).length, data[team])

    }
    document.getElementById("spinner").style.display = "none";

    console.log("done")


});



function generateTable(team, tlengh, data) {
    console.log(data[1])
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  tbl.classList.add('table', 'table-striped','table-bordered', 'table-primary', 'text-center');
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < 3; i++) {
    console.log(i)
    // creates a table row
    const row = document.createElement("tr");
    if (i === 0){

    for (let key in data) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("th");
      const cellText = document.createTextNode(`${key}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
    } else if (i === 1) {
      for (let key in data) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          const cell = document.createElement("td");
          const cellText = document.createTextNode(`${data[key].key_level} ${data[key].plus}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
      }
    } else {
        for (let key in data) {
                  // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          const cell = document.createElement("td");
          const cellText = document.createTextNode(`${data[key].percent}%`);
          if (data[key].percent > 100){
              cell.classList.add("table-danger")
          } else {
              cell.classList.add("table-success")
          }
          cell.appendChild(cellText);
          row.appendChild(cell);

    }
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);




  }
  const total_row = document.createElement("tr");
  const total_cell = document.createElement("td");
  total_cell.setAttribute("colspan", Object.keys(data).length)
  let keys = []
  for (let key in data) {
      keys.push(data[key].key_level)
  }
  let top_keys = keys.sort((a,b) => b-a).slice(0,5)
    console.log(top_keys)

  let total_cell_text = document.createTextNode(top_keys.reduce((partialSum, a) => partialSum + a, 0))
  total_cell.appendChild(total_cell_text);
  total_row.appendChild(total_cell);
  tblBody.appendChild(total_row);



  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  let  jumbo = document.createElement("div")
  jumbo.classList.add('container', 'mt-3')
  let jumbo_inner =   document.createElement("div");
  jumbo_inner.classList.add('mt-4', 'p-5', 'bg-dark', 'text-white', 'rounded')
  let team_h1 = document.createElement("h1")
  team = team.replaceAll('-', ' ')
  const words = team.split(" ");

  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  let team_upper = words.join(" ");
  team_h1.innerText = team_upper
  jumbo_inner.appendChild(team_h1)
  jumbo_inner.appendChild(tbl)
  jumbo.appendChild(jumbo_inner)



  document.body.appendChild(jumbo);



}
