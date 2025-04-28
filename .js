// script.js

document.addEventListener('DOMContentLoaded', function () {
  const crossword = [
    // Grid: 0 is empty, 1 is a filled cell, word positions are given by indexes
    [1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ];

  const acrossClues = [
    { clue: "Starts with 'B'", position: [0, 2] },
    { clue: "Common fruit", position: [1, 2] },
  ];

  const downClues = [
    { clue: "Day of the week", position: [0, 0] },
    { clue: "Type of vehicle", position: [0, 3] },
  ];

  // Function to create crossword grid
  function createCrosswordGrid() {
    const table = document.getElementById('crossword').getElementsByTagName('tbody')[0];
    for (let row = 0; row < crossword.length; row++) {
      const tr = document.createElement('tr');
      for (let col = 0; col < crossword[row].length; col++) {
        const td = document.createElement('td');
        if (crossword[row][col] === 1) {
          const input = document.createElement('input');
          td.appendChild(input);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }

  // Function to add clues to the page
  function addClues() {
    const acrossList = document.getElementById('across-list');
    acrossClues.forEach(clue => {
      const li = document.createElement('li');
      li.textContent = Clue: ${clue.clue};
      acrossList.appendChild(li);
    });

    const downList = document.getElementById('down-list');
    downClues.forEach(clue => {
      const li = document.createElement('li');
      li.textContent = Clue: ${clue.clue};
      downList.appendChild(li);
    });
  }

  createCrosswordGrid();
  addClues();
});
 
