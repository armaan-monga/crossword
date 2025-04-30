<script>
        // Puzzle data for different difficulty levels (corrected for alignment)
        const puzzles = {
            easy: {
                size: 4,
                answers: [
                    ['C', 'A', 'T', 'S'],
                    ['A', 'J', 'O', 'U'],
                    ['R', 'O', 'D', 'N'],
                    [' ', 'Y', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: "A pet that meows (3 letters)", answer: "CAT", row: 0, col: 0 },
                        { number: 2, clue: "A bright color (3 letters)", answer: "RED", row: 2, col: 0 },
                        { number: 3, clue: "Shines in the sky (3 letters)", answer: "SUN", row: 0, col: 3 }
                    ],
                    down: [
                        { number: 1, clue: "A vehicle (3 letters)", answer: "CAR", row: 0, col: 0 },
                        { number: 2, clue: "A small mark (3 letters)", answer: "DOT", row: 0, col: 2 },
                        { number: 3, clue: "A happy feeling (3 letters)", answer: "JOY", row: 0, col: 1 }
                    ]
                }
            },
            medium: {
                size: 5,
                answers: [
                    ['M', 'O', 'O', 'N', 'S'],
                    ['A', ' ', 'B', ' ', 'U'],
                    ['L', ' ', 'I', ' ', 'N'],
                    ['L', ' ', 'R', ' ', ' '],
                    [' ', ' ', 'D', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: "Shines at night (4 letters)", answer: "MOON", row: 0, col: 0 },
                        { number: 2, clue: "A flying animal (4 letters)", answer: "BIRD", row: 2, col: 0 },
                        { number: 3, clue: "Shines in the sky (3 letters)", answer: "SUN", row: 0, col: 4 }
                    ],
                    down: [
                        { number: 1, clue: "A big shopping place (4 letters)", answer: "MALL", row: 0, col: 0 },
                        { number: 2, clue: "A small mark (3 letters)", answer: "DOT", row: 0, col: 2 },
                        { number: 3, clue: "A bright color (4 letters)", answer: "BLUE", row: 0, col: 3 }
                    ]
                }
            },
            hard: {
                size: 6,
                answers: [
                    ['A', 'P', 'P', 'L', 'E', 'C'],
                    [' ', ' ', 'B', ' ', ' ', 'L'],
                    ['T', 'R', 'A', 'I', 'N', 'O'],
                    [' ', ' ', 'R', ' ', ' ', 'U'],
                    [' ', ' ', 'D', ' ', ' ', 'D'],
                    [' ', ' ', ' ', ' ', ' ', ' ']
                ],
                clues: {
                    across: [
                        { number: 1, clue: "A red or green fruit (5 letters)", answer: "APPLE", row: 0, col: 0 },
                        { number: 2, clue: "It rides on tracks (5 letters)", answer: "TRAIN", row: 2, col: 0 },
                        { number: 3, clue: "Fluffy in the sky (5 letters)", answer: "CLOUD", row: 0, col: 5 }
                    ],
                    down: [
                        { number: 1, clue: "A singing animal (4 letters)", answer: "BIRD", row: 0, col: 2 },
                        { number: 2, clue: "You fly it in the wind (4 letters)", answer: "KITE", row: 0, col: 4 },
                        { number: 3, clue: "A fun pet (3 letters)", answer: "CAT", row: 0, col: 1 }
                    ]
                }
            }
        };

        const grid = document.getElementById('grid');
        const cluesAcross = document.getElementById('clues-across');
        const cluesDown = document.getElementById('clues-down');
        const message = document.getElementById('message');
        const home = document.getElementById('home');
        const game = document.getElementById('game');
        const settingsModal = document.getElementById('settings-modal');
        const ratingModal = document.getElementById('rating-modal');
        const playButton = document.getElementById('play-button');
        const themeToggle = document.querySelector('.theme-toggle');
        const scoreDisplay = document.getElementById('score');
        const timerDisplay = document.getElementById('timer');
        const pauseButton = document.getElementById('pause-button');
        const ratingStars = document.getElementById('rating-stars');
        const thankYouMessage = document.getElementById('thank-you');
        let currentPuzzle = null;
        let score = 0;
        let hintsUsed = 0;
        let selectedMode = null;
        let selectedTheme = null;
        let timerInterval = null;
        let timeElapsed = 0;
        let isPaused = false;
        let isGameCompleted = false;
        let selectedRating = 0;

        // Create animated background tiles
        function createBackgroundTiles() {
            const grid = document.getElementById('background-grid');
            const tileCount = 15;
            for (let i = 0; i < tileCount; i++) {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                tile.style.left = ${Math.random() * 100}%;
                tile.style.top = ${Math.random() * 100}%;
                tile.style.animationDelay = ${Math.random() * 4}s;
                grid.appendChild(tile);
            }
        }

        // Theme toggle function
        function toggleTheme() {
            const currentTheme = document.body.classList.contains('light') ? 'light' : document.body.classList.contains('dark') ? 'dark' : 'blue';
            const themes = ['light', 'dark', 'blue'];
            const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
            document.body.classList.remove('light', 'dark', 'blue');
            document.body.classList.add(nextTheme);
            themeToggle.textContent = nextTheme === 'light' ? 'Dark Mode' : nextTheme === 'dark' ? 'Blue Mode' : 'Light Mode';
            localStorage.setItem('theme', nextTheme);
        }

        // Show settings modal
        function showSettingsModal() {
            home.classList.add('hidden');
            settingsModal.style.display = 'flex';
        }

        // Close settings modal
        function closeSettingsModal() {
            settingsModal.style.display = 'none';
            home.classList.remove('hidden');
            selectedMode = null;
            selectedTheme = null;
            playButton.disabled = true;
            document.querySelectorAll('.modal-button').forEach(btn => btn.classList.remove('selected'));
        }

        // Select game mode
        function selectMode(mode) {
            selectedMode = mode;
            document.querySelectorAll('.modal-button.easy, .modal-button.medium, .modal-button.hard').forEach(btn => btn.classList.remove('selected'));
            document.querySelector(.modal-button.${mode}).classList.add('selected');
            checkPlayButton();
        }

        // Select theme
        function selectTheme(theme) {
            selectedTheme = theme;
            document.querySelectorAll('.modal-button.light, .modal-button.dark, .modal-button.blue').forEach(btn => btn.classList.remove('selected'));
            document.querySelector(.modal-button.${theme}).classList.add('selected');
            checkPlayButton();
        }

        // Enable play button when both mode and theme are selected
        function checkPlayButton() {
            playButton.disabled = !(selectedMode && selectedTheme);
        }

        // Format time in MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return ${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')};
        }

        // Start timer
        function startTimer() {
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    timeElapsed++;
                    timerDisplay.textContent = formatTime(timeElapsed);
                }
            }, 1000);
        }

        // Stop timer
        function stopTimer() {
            clearInterval(timerInterval);
        }

        // Reset timer
        function resetTimer() {
            stopTimer();
            timeElapsed = 0;
            timerDisplay.textContent = formatTime(timeElapsed);
        }

        // Show rating modal
        function showRatingModal() {
            ratingModal.style.display = 'flex';
            isGameCompleted = true;
            const inputs = document.querySelectorAll('.cell input');
            inputs.forEach(input => input.disabled = true);
            selectedRating = 0;
            thankYouMessage.style.display = 'none';
            updateStars();
        }

        // Close rating modal
        function closeRatingModal() {
            ratingModal.style.display = 'none';
            isGameCompleted = false;
            resetGameState();
            game.style.display = 'none';
            home.classList.remove('hidden');
            document.body.classList.remove('light', 'dark', 'blue');
            document.body.classList.add(localStorage.getItem('theme') || 'light');
        }

        // Reset game state
        function resetGameState() {
            stopTimer();
            score = 0;
            hintsUsed = 0;
            timeElapsed = 0;
            isPaused = false;
            isGameCompleted = false;
            scoreDisplay.textContent = score;
            timerDisplay.textContent = formatTime(timeElapsed);
            pauseButton.textContent = 'Pause';
            message.textContent = '';
            grid.innerHTML = '';
        }

        // Update star display
        function updateStars() {
            const stars = ratingStars.querySelectorAll('.star');
            stars.forEach(star => {
                const value = parseInt(star.dataset.value);
                star.textContent = value <= selectedRating ? '★' : '☆';
                star.classList.toggle('filled', value <= selectedRating);
            });
        }

        // Handle star click
        function handleStarClick(event) {
            selectedRating = parseInt(event.target.dataset.value);
            updateStars();
        }

        // Submit rating
        function submitRating() {
            if (selectedRating > 0) {
                thankYouMessage.style.display = 'block';
                setTimeout(() => {
                    ratingModal.style.display = 'none';
                    resetGameState();
                    game.style.display = 'none';
                    home.classList.remove('hidden');
                    document.body.classList.remove('light', 'dark', 'blue');
                    document.body.classList.add(localStorage.getItem('theme') || 'light');
                }, 1000);
            } else {
                alert('Please select a rating before submitting!');
            }
        }

        // Exit game with rating
        function exitGame() {
            if (isGameCompleted) return;
            stopTimer();
            isPaused = true;
            pauseButton.textContent = 'Pause';
            const inputs = document.querySelectorAll('.cell input');
            inputs.forEach(input => input.disabled = true);
            showRatingModal();
        }

        // Initialize grid
        function createGrid(size, answers) {
            grid.style.gridTemplate = repeat(${size}, 40px) / repeat(${size}, 40px);
            grid.innerHTML = '';
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    if (answers[row][col] === ' ') {
                        cell.classList.add('block');
                    } else {
                        const input = document.createElement('input');
                        input.maxLength = 1;
                        input.dataset.row = row;
                        input.dataset.col = col;
                        input.addEventListener('input', (e) => {
                            e.target.value = e.target.value.toUpperCase();
                            moveToNextCell(e.target);
                        });
                        cell.appendChild(input);
                    }
                    grid.appendChild(cell);
                }
            }
        }

        // Render clues
        function renderClues(clueData) {
            cluesAcross.innerHTML = `
                <h2>Across</h2>
                <ul>${clueData.across.map(c => <li>${c.number}. ${c.clue}</li>).join('')}</ul>
            `;
            cluesDown.innerHTML = `
                <h2>Down</h2>
                <ul>${clueData.down.map(c => <li>${c.number}. ${c.clue}</li>).join('')}</ul>
            `;
        }

        // Move focus to next cell
        function moveToNextCell(currentInput) {
            const row = parseInt(currentInput.dataset.row);
            const col = parseInt(currentInput.dataset.col);
            let nextRow = row;
            let nextCol = col + 1;
            if (nextCol >= currentPuzzle.size || currentPuzzle.answers[nextRow][nextCol] === ' ') {
                nextRow++;
                nextCol = col;
            }
            if (nextRow < currentPuzzle.size && currentPuzzle.answers[nextRow][nextCol] !== ' ') {
                const nextInput = document.querySelector(input[data-row="${nextRow}"][data-col="${nextCol}"]);
                if (nextInput) nextInput.focus();
            }
        }

        // Check answers and update score
        function checkAnswers() {
            if (isPaused || isGameCompleted) return;
            let correct = true;
            let correctCells = 0;
            let totalCells = 0;
            for (let row = 0; row < currentPuzzle.size; row++) {
                for (let col = 0; col < currentPuzzle.size; col++) {
                    if (currentPuzzle.answers[row][col] !== ' ') {
                        totalCells++;
                        const input = document.querySelector(input[data-row="${row}"][data-col="${col}"]);
                        if (input.value.toUpperCase() === currentPuzzle.answers[row][col]) {
                            input.style.backgroundColor = '#ccffcc';
                            correctCells++;
                        } else {
                            correct = false;
                            input.style.backgroundColor = '#ffcccc';
                        }
                    }
                }
            }
            if (correct) {
                score += (totalCells * 10) - (hintsUsed * 10);
                message.textContent = Congratulations! All answers are correct! Score: ${score};
                stopTimer();
                showRatingModal();
            } else {
                message.textContent = 'Some answers are incorrect. Try again!';
            }
            scoreDisplay.textContent = score;
        }

        // Use hint
        function useHint() {
            if (isPaused || isGameCompleted) return;
            let emptyCell = null;
            for (let row = 0; row < currentPuzzle.size && !emptyCell; row++) {
                for (let col = 0; col < currentPuzzle.size && !emptyCell; col++) {
                    if (currentPuzzle.answers[row][col] !== ' ') {
                        const input = document.querySelector(input[data-row="${row}"][data-col="${col}"]);
                        if (!input.value) {
                            emptyCell = input;
                        }
                    }
                }
            }
            if (emptyCell) {
                const row = parseInt(emptyCell.dataset.row);
                const col = parseInt(emptyCell.dataset.col);
                emptyCell.value = currentPuzzle.answers[row][col];
                hintsUsed++;
                score -= 10;
                scoreDisplay.textContent = score;
            } else {
                message.textContent = 'No empty cells left to fill!';
            }
        }

        // Toggle pause/resume
        function togglePause() {
            if (isGameCompleted) return;
            isPaused = !isPaused;
            pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
            message.textContent = isPaused ? 'Game Paused' : '';
            const inputs = document.querySelectorAll('.cell input');
            inputs.forEach(input => {
                input.disabled = isPaused;
            });
            if (!isPaused) {
                startTimer();
            }
        }

        // Refresh game
        function refreshGame() {
            if (isGameCompleted) return;
            score = 0;
            hintsUsed = 0;
            scoreDisplay.textContent = score;
            message.textContent = '';
            resetTimer();
            isPaused = false;
            pauseButton.textContent = 'Pause';
            createGrid(currentPuzzle.size, currentPuzzle.answers);
            renderClues(currentPuzzle.clues);
            startTimer();
            const inputs = document.querySelectorAll('.cell input');
            inputs.forEach(input => {
                input.disabled = false;
            });
        }

        // Start the game with selected difficulty and theme
        function startGame() {
            if (selectedMode && selectedTheme) {
                currentPuzzle = puzzles[selectedMode];
                score = 0;
                hintsUsed = 0;
                scoreDisplay.textContent = score;
                settingsModal.style.display = 'none';
                game.style.display = 'block';
                document.body.classList.remove('light', 'dark', 'blue');
                document.body.classList.add(selectedTheme);
                createGrid(currentPuzzle.size, currentPuzzle.answers);
                renderClues(currentPuzzle.clues);
                resetTimer();
                startTimer();
                isPaused = false;
                isGameCompleted = false;
                pauseButton.textContent = 'Pause';
            }
        }

        // Back to home
        function backToHome() {
            if (isGameCompleted) return;
            stopTimer();
            game.style.display = 'none';
            home.classList.remove('hidden');
            message.textContent = '';
            document.body.classList.remove('light', 'dark', 'blue');
            document.body.classList.add(localStorage.getItem('theme') || 'light');
        }

        // Load saved theme and animate elements
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.body.classList.add(savedTheme);
            themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : savedTheme === 'dark' ? 'Blue Mode' : 'Light Mode';

            createBackgroundTiles();

            const buttons = document.querySelectorAll('.start-button, .modal-button');
            buttons.forEach((button, index) => {
                button.style.opacity = '0';
                button.style.transform = 'translateY(20px)';
                button.style.transition = 'opacity 0.5s, transform 0.5s';
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, 500 + index * 200);
            });

            // Add event listeners for rating stars
            const stars = ratingStars.querySelectorAll('.star');
            stars.forEach(star => {
                star.addEventListener('click', handleStarClick);
            });
        });
    </script>