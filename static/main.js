$.getJSON('/api/get_all', function(data) {

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
        let team_a = document.createElement("a")
        let team = groupName.replaceAll('-', ' ')
        const words = team.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        let team_upper = words.join(" ");
        team_a.setAttribute('href', "https://raider.io/teams/us/" + groupName)
        team_a.setAttribute("target", "_blank")

        team_a.innerHTML = "<h1>" + team_upper + "<\h1>"
        team_a.classList.add('link-success')


        jumbo_inner.appendChild(team_a)

        const groupTable = document.createElement('table');
        groupTable.classList.add('table', 'table-striped', 'table-bordered', 'table-primary', 'text-center')
        groupTable.innerHTML = `
      <thead>
      </thead>
      <tbody>
    `;
        let header_row = document.createElement("tr")


        for (let dungeonName in groupData) {

            dungeonName = dungeonName.split("-")

            for (let i = 0; i < dungeonName.length; i++) {
                dungeonName[i] = dungeonName[i][0].toUpperCase() + dungeonName[i].substr(1);
            }
            dungeonName = dungeonName.join(" ")
            let keynamecell = document.createElement("th")
            let keynametxt = document.createTextNode(dungeonName)
            keynamecell.appendChild(keynametxt)
            header_row.appendChild(keynamecell)



        }
        groupTable.querySelector('thead').appendChild(header_row)




        // Create an array to store dungeon names

        let table_row = document.createElement("tr");

        for (const dungeonName in groupData) {
            const dungeon = groupData[dungeonName]


            // row.appendChild()
            const cell = document.createElement("td");



            let cellText
            if (typeof dungeon.key_level === 'undefined') {
                fortcellText = document.createTextNode(` `);
            } else {
                fortcellText = document.createTextNode(`${dungeon.key_level} ${dungeon.plus}`);
            }

            cell.appendChild(fortcellText);
            table_row.appendChild(cell);
            groupTable.querySelector('tbody').appendChild(table_row);



        }
        const total_row = document.createElement("tr");
        const total_cell = document.createElement("td");
        total_cell.setAttribute("colspan", 9)
        let top_keys = []
        for (const dungeonName in groupData) {
            const dungeon = groupData[dungeonName]
            top_keys.push(dungeon.key_level)

        }
        let top_4_fort = top_keys.sort((a, b) => b - a).slice(0, 4)

        let sum = top_4_fort.reduce((partialSum, a) => partialSum + a, 0)

        let total_cell_text = document.createTextNode(sum)
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