
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crossword Puzzle Game</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Arial', sans-serif;
    }
  </style>
</head>
<body>
  <div class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-5xl font-bold text-gray-800 mb-4">Crossword Puzzle Game</h1>
    <p class="text-xl text-gray-600 mb-8">Challenge your mind with our daily crossword puzzles!</p>
    <div class="flex justify-center gap-4">
      <a href="#play" class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Play Now</a>
      <a href="#leaderboard" class="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition">Leaderboard</a>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold text-gray-800 mb-2">Daily Puzzles</h3>
        <p class="text-gray-600">Enjoy a new crossword puzzle every day, designed to test your knowledge and wit.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold text-gray-800 mb-2">Compete with Friends</h3>
        <p class="text-gray-600">Challenge your friends and see who can solve the puzzle the fastest!</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold text-gray-800 mb-2">Track Your Progress</h3>
        <p class="text-gray-600">Monitor your solving streak and improve your skills over time.</p>
      </div>
    </div>
    <footer class="mt-16 text-gray-500">
      <p>&copy; 2025 Crossword Puzzle Game. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crossword Puzzle Game</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Arial', sans-serif;
    }
    .crossword-grid {
      display: grid;
      grid-template-columns: repeat(5, 50px);
      gap: 2px;
      background-color: #000;
      padding: 2px;
      margin: 0 auto;
    }
    /* Crossword container */
.crossword {
  display: grid;
  grid-template-columns: repeat(10, 40px); /* 10 columns, each 40px wide */
  grid-template-rows: repeat(10, 40px); /* 10 rows, each 40px high */
  gap: 2px; /* Space between cells */
  margin: 20px auto;
  width: max-content;
  border: 2px solid #333; /* Outer border */
}

/* Individual cells */
.cell {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
  font-size: 16px;
  font-weight: bold;
  background-color: #fff;
  color: #000;
  position: relative;
}

/* Clue numbers in the top-left corner */
.cell .number {
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 10px;
  color: #666;
}

/* Filled cells (black) */
.cell.filled {
  background-color: #333;
  color: transparent;
  border: 1px solid #222;
}

/* Highlight active cells on hover */
.cell:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

/* Input styling for letters */
.cell input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  text-transform: uppercase;
  color: #000;
  pointer-events: none; /* Remove for editability */
}
  </style>
</head>
<body>
  <div class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Crossword Puzzle Game</h1>
    <div id="crossword" class="crossword-grid"></div>
    <div class="clues">
      <div class="across">
        <h3 class="text-gray-800">Across</h3>
        <ul id="across-clues"></ul>
      </div>
      <div class="down">
        <h3 class="text-gray-800">Down</h3>
        <ul id="down-clues"></ul>
      </div>
    </div>
    <div class="buttons">
      <button id="check" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Check Answers</button>
      <button id="clear" class="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition">Clear Grid</button>
    </div>
  </div>

  <script>
    const puzzle = [
      { number: 1, row: 0, col: 0, word: 'HELLO', direction: 'across', clue: 'A friendly greeting' },
      { number: 2, row: 0, col: 0, word: 'HOUSE', direction: 'down', clue: 'Where you live' },
      { number: 3, row: 2, col: 1, word: 'LOVE', direction: 'across', clue: 'Deep affection' },
      { number: 4, row: 1, col: 2, word: 'LEAP', direction: 'down', clue: 'To jump' }
    ];

    const gridSize = 5;
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
    const numberMap = {};

    // Initialize grid with blocked cells and numbers
    puzzle.forEach(word => {
      const { number, row, col, word: answer, direction } = word;
      for (let i = 0; i < answer.length; i++) {
        const r = direction === 'across' ? row : row + i;
        const c = direction === 'across' ? col + i : col;
        grid[r][c] = { letter: answer[i], number: i === 0 ? number : null };
        if (i === 0) numberMap[`${r}-${c}`] = number;
      }
    });

    // Render crossword grid
    const crosswordDiv = document.getElementById('crossword');
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        if (!grid[r][c]) {
          cellDiv.className += ' blocked';
        } else {
          const input = document.createElement('input');
          input.maxLength = 1;
          input.dataset.row = r;
          input.dataset.col = c;
          cellDiv.appendChild(input);
          if (grid[r][c].number) {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'cell-number';
            numberDiv.textContent = grid[r][c].number;
            cellDiv.appendChild(numberDiv);
          }
        }
        crosswordDiv.appendChild(cellDiv);
      }
    }

    // Render clues
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    puzzle.forEach(({ number, clue, direction }) => {
      const li = document.createElement('li');
      li.textContent = `${number}. ${clue}`;
      if (direction === 'across') {
        acrossClues.appendChild(li);
      } else {
        downClues.appendChild(li);
      }
    });

    // Check answers
    document.getElementById('check').addEventListener('click', () => {
      let correct = true;
      document.querySelectorAll('.cell input').forEach(input => {
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);
        const userLetter = input.value.toUpperCase();
        const correctLetter = grid[r][c].letter;
        if (userLetter && userLetter !== correctLetter) {
          correct = false;
          input.style.backgroundColor = '#f8d7da';
        } else if (userLetter) {
          input.style.backgroundColor = '#d4edda';
        }
      });
      alert(correct ? 'Congratulations! All answers are correct!' : 'Some answers are incorrect. Try again!');
    });

    // Clear grid
    document.getElementById('clear').addEventListener('click', () => {
      document.querySelectorAll('.cell input').forEach(input => {
        input.value = '';
        input.style.backgroundColor = '#fff';
    
      });
    });
  </script>
</body>
</html>
```

 
  
  


 
