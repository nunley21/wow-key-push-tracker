

function createTeams(data) {
  const teams = [];
  const usedDPS = []; // Keep track of assigned DPS members

  // Check if each group has at least one member
  if (data.Tanks.length < 1 || data.Healers.length < 1 || data.DPS.length < 3) {
    return teams; // Unable to create teams
  }

  // Shuffle members in each group (optional)
  shuffleArray(data.Tanks);
  shuffleArray(data.Healers);
  shuffleArray(data.DPS);

  // Create teams with 1 tank, 1 healer, and 3 DPS
  for (let i = 0; i < Math.min(data.Tanks.length, data.Healers.length); i++) {
    const team = {
      "Tank": data.Tanks[i],
      "Healer": data.Healers[i],
      "DPS1": getNextAvailableDPS(data.DPS, usedDPS),
      "DPS2": getNextAvailableDPS(data.DPS, usedDPS),
      "DPS3": getNextAvailableDPS(data.DPS, usedDPS)
    };
    teams.push(team);
  }

  return teams;
}

// Function to get the next available DPS member
function getNextAvailableDPS(DPSArray, usedDPS) {
  for (const DPS of DPSArray) {
    if (!usedDPS.includes(DPS)) {
      usedDPS.push(DPS);
      return DPS;
    }
  }
  return null; // No available DPS member
}


// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to create an HTML table from teams
function createTableFromTeams(teams) {
  const table = document.createElement("table");
  table.classList.add('table', 'table-striped','table-bordered', 'table-primary', 'text-center');

  // Create table header
  const headerRow = table.insertRow();
  for (const key in teams[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  }

  // Create table rows for each team
  teams.forEach(team => {
    const row = table.insertRow();
    for (const key in team) {
      const cell = row.insertCell();
      cell.textContent = team[key];
    }
  });

  return table;
}

// Call the functions and add the table to the HTML document
