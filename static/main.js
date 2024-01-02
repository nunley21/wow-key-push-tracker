$.getJSON('/api/get_all', function(data) {

    console.log(data);
    buildTables(data)


    document.getElementById("spinner").style.display = "none";

    console.log("done")


});

function buildTables(data) {

    for (const groupName in data) {
        const groupData = data[groupName];
        let jumbo = document.createElement("div")
        jumbo.classList.add('container', 'mt-3')
        let jumbo_inner = document.createElement("div");
        jumbo_inner.classList.add('mt-4', 'p-5', 'bg-dark', 'text-white', 'rounded')
        let team_h1 = document.createElement("h1")
        let team = groupName.replaceAll('-', ' ')
        const words = team.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        let team_upper = words.join(" ");
        team_h1.innerText = team_upper
        jumbo_inner.appendChild(team_h1)

        const groupTable = document.createElement('table');
        groupTable.classList.add('table', 'table-striped', 'table-bordered', 'table-primary', 'text-center')
        groupTable.innerHTML = `
      <thead>
        <tr>
          <th>Affix</th>
          <th>Atal'Dazar</th>
          <th>Black Rook Hold</th>
          <th>DOTI: Galakrond's Fall</th>
          <th>DOTI: Murozond's Rise</th>
          <th>Darkheart Thicket</th>
          <th>The Everbloom</th>
          <th>Throne of the Tides</th>
          <th>Waycrest Manor</th>
       
        </tr>
      </thead>
      <tbody>
    `;

        // Create an array to store dungeon names

        let fort_row = document.createElement("tr");
        let tyran_row = document.createElement("tr");

        let fortcell = document.createElement("td");
        let fortcellText = document.createTextNode('Fortified');
        fortcell.appendChild(fortcellText);
        fort_row.appendChild(fortcell);

        let Tyrannicalcell = document.createElement("td");
        const TyrannicalcellText = document.createTextNode('Tyrannical');
        Tyrannicalcell.appendChild(TyrannicalcellText);
        tyran_row.appendChild(Tyrannicalcell);
        for (const dungeonName in groupData) {
            const dungeon = groupData[dungeonName]

            // row.appendChild()
            const cell = document.createElement("td");



            let fortcellText
            if (typeof dungeon.Fortified.key_level === 'undefined') {
                fortcellText = document.createTextNode(` `);
            } else {
                fortcellText = document.createTextNode(`${dungeon.Fortified.key_level} ${dungeon.Fortified.plus}`);
            }

            cell.appendChild(fortcellText);
            fort_row.appendChild(cell);
            groupTable.querySelector('tbody').appendChild(fort_row);


            const tyrancell = document.createElement("td");
            let tyrancellText
            if (typeof dungeon.Tyrannical.key_level === 'undefined') {
                tyrancellText = document.createTextNode(` `);
            } else {
                tyrancellText = document.createTextNode(`${dungeon.Tyrannical.key_level} ${dungeon.Tyrannical.plus}`);
            }

            tyrancell.appendChild(tyrancellText);
            tyran_row.appendChild(tyrancell);
            groupTable.querySelector('tbody').appendChild(tyran_row);

        }
        const total_row = document.createElement("tr");
        const total_cell = document.createElement("td");
        total_cell.setAttribute("colspan", 9)
        let top_tyran_keys = []
        let top_fort_keys = []
        for (const dungeonName in groupData) {
            const dungeon = groupData[dungeonName]
            top_tyran_keys.push(dungeon.Tyrannical.key_level)
            top_fort_keys.push(dungeon.Fortified.key_level)
        }
        let top_3_fort_keys = top_fort_keys.sort((a, b) => b - a).slice(0, 3)
        let top_3_tyran_keys = top_tyran_keys.sort((a, b) => b - a).slice(0, 3)
        let fort_sum = top_3_fort_keys.reduce((partialSum, a) => partialSum + a, 0)
        let tyran_sum = top_3_tyran_keys.reduce((partialSum, a) => partialSum + a, 0)

        let total_cell_text = document.createTextNode(fort_sum + tyran_sum)
        total_cell.appendChild(total_cell_text);
        total_row.appendChild(total_cell);
        groupTable.querySelector('tbody').appendChild(total_row);



        groupTable.innerHTML += `
      </tbody>
    `


        jumbo_inner.appendChild(groupTable)
        jumbo.appendChild(jumbo_inner)
        document.body.appendChild(jumbo);
    }
}