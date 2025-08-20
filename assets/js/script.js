// Global enum type constants to represent wall direction indices
const DIRECTION = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
};

/**
 * Function to generate a 2D array representation of the maze
 * @param {integer} row : Number of rows(cells in y-direction) in the maze
 * @param {integer}} col : Number of columns(cells in x-direction) in the maze
 * @returns {object} : Object.cells => Cells in the maze, Object.path => path used to carve the maze cells for path
 */
function generateMazeMap(row, col) {
  let cells = [];
  let unvisitedCells = [];
  let totalCells = row * col;

  for (let y = 0; y < row; y++) {
    cells.push([]);
    unvisitedCells.push([]);
    for (let x = 0; x < col; x++) {
      cells[y].push({ walls: [true, true, true, true], door: false });
      unvisitedCells[y].push(true);
    }
  }

  // Start from a random cell within the grid
  let currentCell = [
    Math.floor(Math.random() * row),
    Math.floor(Math.random() * col),
  ];

  // let currentCell = [0, 0];
  let path = [currentCell];
  unvisitedCells[currentCell[0]][currentCell[1]] = false;
  let visited = 1;

  while (visited < totalCells) {
    // Potential neighbor cells to move to
    const potentials = [
      [currentCell[0] - 1, currentCell[1], DIRECTION.TOP, DIRECTION.BOTTOM],
      [currentCell[0], currentCell[1] + 1, DIRECTION.RIGHT, DIRECTION.LEFT],
      [currentCell[0] + 1, currentCell[1], DIRECTION.BOTTOM, DIRECTION.TOP],
      [currentCell[0], currentCell[1] - 1, DIRECTION.LEFT, DIRECTION.RIGHT],
    ];

    const neighbors = [];
    potentials.forEach((potential) => {
      if (
        potential[0] > -1 &&
        potential[0] < row &&
        potential[1] > -1 &&
        potential[1] < col &&
        unvisitedCells[potential[0]][potential[1]]
      ) {
        neighbors.push(potential);
      }
    });

    if (neighbors.length) {
      let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
      // Break the walls between cells
      cells[currentCell[0]][currentCell[1]]["walls"][nextCell[2]] = false;
      cells[nextCell[0]][nextCell[1]]["walls"][nextCell[3]] = false;

      unvisitedCells[nextCell[0]][nextCell[1]] = false;
      visited++;

      currentCell = [nextCell[0], nextCell[1]];
      path.push(currentCell);
    } else {
      currentCell = path.pop();
    }
  }
  return { cells: cells, path: path };
}

/**
 * Function to find the solution path for the provided maze
 * @param {object} maze : object returned from generateMazeMap
 * @returns {list} : list of [row,col] cells that form the solution for the maze
 */
function findSolutionMaze(maze) {
  let currentPosition = [0, 0];

  const solution = [currentPosition];
  const visited = [currentPosition];

  while (
    !(
      currentPosition[0] === maze.length - 1 &&
      currentPosition[1] === maze[0].length - 1
    )
  ) {
    const potentialMoves = [
      [currentPosition[0], currentPosition[1] + 1, DIRECTION.RIGHT],
      [currentPosition[0] + 1, currentPosition[1], DIRECTION.BOTTOM],
      [currentPosition[0], currentPosition[1] - 1, DIRECTION.LEFT],
      [currentPosition[0] - 1, currentPosition[1], DIRECTION.TOP],
    ];

    // Check for valid moves
    // Check wall
    const validMoves = [];
    potentialMoves.forEach((move) => {
      if (
        move[0] > -1 &&
        move[0] < maze.length &&
        move[1] > -1 &&
        move[1] < maze[0].length &&
        !visited.some((step) => step[0] === move[0] && step[1] === move[1]) &&
        maze[currentPosition[0]][currentPosition[1]]["walls"][move[2]] === false
      ) {
        validMoves.push(move);
      }
    });

    if (validMoves.length) {
      // Select the highest priority move
      currentPosition = [validMoves[0][0], validMoves[0][1]];
      visited.push(currentPosition);
      solution.push(currentPosition);
    } else {
      currentPosition = solution.pop();
    }
  }
  return solution;
}

/**
 * Function to generate list of [row,col] cells to place the doors randomly on the path
 * @param {array} path : list of [row,col] cells to add doors to
 * @param {integer} numDoors : number of doors to add
 * @returns {list} : list of [row,col] cells
 */
function placeDoors(path, numDoors) {
  let doorPositions = [];
  for (let count = 0; count < numDoors; count++) {
    let index = Math.floor(Math.random() * path.length);
    // Repeat random index if the index has already been selected of if index is start and end
    while (
      doorPositions.some(
        (position) =>
          position[0] === path[index][0] && position[1] === path[index][1]
      ) ||
      index === 0 ||
      index === path.length - 1
    ) {
      index = Math.floor(Math.random() * path.length);
    }
    doorPositions.push(path[index]);
  }
  return doorPositions;
}

/**
 * Render the maze into HTML element
 * @param {object} maze: Object of type returned from generateMazeMap
 */
function drawMaze(maze, solution = null) {
  const mazeSize = maze["cells"].length;

  const mazeArea = document.querySelector("#maze-area");
  mazeArea.innerHTML="";
  mazeArea.setAttribute("data-maze-size", mazeSize);
  for (let row = 0; row < mazeSize; row++) {
    const mazeRow = document.createElement("div");
    mazeRow.classList.add("maze-row");
    for (let col = 0; col < mazeSize; col++) {
      const mazeCell = document.createElement("div");
      // Add appropriate CSS class for rendering based on CSS
      mazeCell.classList.add("maze-cell");
      if (maze["cells"][row][col]["walls"][DIRECTION.TOP]) {
        mazeCell.classList.add("wall-top");
      }
      if (maze["cells"][row][col].walls[DIRECTION.RIGHT]) {
        mazeCell.classList.add("wall-right");
      }
      if (maze["cells"][row][col].walls[DIRECTION.BOTTOM]) {
        mazeCell.classList.add("wall-bottom");
      }
      if (maze["cells"][row][col].walls[DIRECTION.LEFT]) {
        mazeCell.classList.add("wall-left");
      }
      // if (maze["path"].some((cell) => cell[0] == row && cell[1] == col)) {
      //   mazeCell.classList.add("maze-path");
      // }
      if (
        solution &&
        solution.some((cell) => cell[0] == row && cell[1] == col)
      ) {
        mazeCell.classList.add("maze-solution");
      }
      if (maze.cells[row][col].door) {
        mazeCell.classList.add("maze-door");
      }
      if (row === 0 && col === 0) {
        mazeCell.classList.add("maze-start");
        mazeCell.classList.add("player-position");
        const player = document.createElement("div");
        player.classList.add("player");
        mazeCell.appendChild(player);
      }
      // Add class for maze end
      if (row === mazeSize - 1 && col === mazeSize - 1) {
        mazeCell.classList.add("maze-end");
      }
      // Add position attribute to each cell
      mazeCell.setAttribute("data-pos-row", row);
      mazeCell.setAttribute("data-pos-col", col);
      // Add cell to row
      mazeRow.appendChild(mazeCell);
    }
    mazeArea.appendChild(mazeRow);
  }
}

/**
 * Function to position the player in the maze
 * @param {string} direction : direction to move the current player to
 * @param {boolean} openDoor : true - open encountered door"; false - return status "checkKey"
 */
function positionPlayer(direction, openDoor = false) {
  let status = "success";
  const possibleDirections = ["UP", "RIGHT", "DOWN", "LEFT"];
  if (possibleDirections.includes(direction)) {
    console.log(`DEBUG: Move Player:${direction}`);

    const currentPlayerCell = document.querySelector(
      ".maze-cell.player-position"
    );

    // Get the row and col number from attributes
    let currentRow = parseInt(currentPlayerCell.getAttribute("data-pos-row"));
    let currentCol = parseInt(currentPlayerCell.getAttribute("data-pos-col"));
    console.log(`DEBUG: Current Player position =>${[currentRow, currentCol]}`);

    // Calculate next position based on direction
    let nextRow = currentRow;
    let nextCol = currentCol;
    let wallToCheck = "";

    switch (direction) {
      case "UP":
        nextRow = currentRow - 1;
        wallToCheck = "wall-top";
        break;
      case "RIGHT":
        nextCol = currentCol + 1;
        wallToCheck = "wall-right";
        break;
      case "DOWN":
        nextRow = currentRow + 1;
        wallToCheck = "wall-bottom";
        break;
      case "LEFT":
        nextCol = currentCol - 1;
        wallToCheck = "wall-left";
        break;
    }

    // Check if move is valid and there's no wall
    if (!currentPlayerCell.classList.contains(wallToCheck)) {
      const nextPlayerCell = document.querySelector(
        `.maze-cell[data-pos-row="${nextRow}"][data-pos-col="${nextCol}"]`
      );
      // Only move if target cell exists
      if (nextPlayerCell) {
        if (nextPlayerCell.classList.contains("maze-door") && !openDoor) {
          // Check if next position has Trivia door and if it should be opened
          status = "checkKey";
        } else {
          // Move player to new position
          currentPlayerCell.classList.remove("player-position");
          currentPlayerCell.innerHTML = "";

          nextPlayerCell.classList.add("player-position");
          // Add open door style if maze door present
          if (nextPlayerCell.classList.contains("maze-door")) {
            nextPlayerCell.classList.remove("maze-door");
            nextPlayerCell.classList.add("maze-door-open");
          }
          if (nextPlayerCell.classList.contains("maze-end")) {
            status = "finished";
          }

          const player = document.createElement("div");
          player.classList.add("player");
          nextPlayerCell.appendChild(player);
          console.log(
            `DEBUG: Player moved to position =>${[nextRow, nextCol]}`
          );
        }
      }
    }
    return status;
  } else {
    throw `Direction not allowed: ${direction}`;
  }
}

// TODO: Add Trivia modal; should return boolean to open the door(true if correct answer or skipped), false(if incorrect)
function askTrivia() {
  console.log(`DEBUG: Open trivia modal`);
  const triviaModal = new bootstrap.Modal(
    document.querySelector("#trivia-modal")
  );
  triviaModal.show();
}

/**
 * Function to update the Heads Up Display
 * @param {object} gameState
 */
function updateHeadsUpDisplay(gameState) {
  const masterKeyArea = document.querySelector(
    "#game-master-keys > div:last-child"
  );
  const gameStatsCorrectArea = document.querySelector("#correct>span");
  const gameStatsSkippedArea = document.querySelector("#skip>span");

  // Display Master Keys
  let message = "";
  for (let count = 0; count < gameState.returnKeysLeft(); count++) {
    message += '<i class="fa-solid fa-key"></i>';
  }
  for (
    let count = gameState.returnKeysLeft();
    count < gameState.totalKeysAvailable;
    count++
  ) {
    message += '<i class="fa-solid fa-key used-key"></i>';
  }
  masterKeyArea.innerHTML = message;

  // Display Game Stats
  gameStatsCorrectArea.innerHTML = `${
    gameState.returnGameStatistics().correct
  }/${gameState.returnGameStatistics().questions}`;
  gameStatsSkippedArea.innerHTML = `${
    gameState.returnGameStatistics().skipped
  }/${gameState.returnGameStatistics().questions}`;
}

/**
 * Function to handle game end
 * @param {object} gameState 
 */
function gameEnd(gameState) {
  console.log(`DEBUG: Open Game End modal`);
  const gameEndModal = new bootstrap.Modal(
    document.querySelector("#game-end-modal")
  );
  if (gameState.gameOverStatus === "gameWon") {
    document.querySelector("#game-end-modal .modal-title").innerHTML =
      '<i class="fa-solid fa-graduation-cap"></i>Congratulations!!!';
    document.querySelector("#game-end-modal .modal-body .lead").innerHTML ='You completed the mission!!!';
  } else if (gameState.gameOverStatus === "gameLost") {
    document.querySelector("#game-end-modal .modal-title").innerHTML =
      '<i class="fa-solid fa-circle-exclamation"></i>Commiserations!!!';
    document.querySelector("#game-end-modal .modal-body .lead").innerHTML ='You are locked. Thou shall not pass!!!';
  }
  gameEndModal.show();
}

function gameStart(gameState){
  // TODO: Read settings from into section
  // Game difficulty settings
  const mazeSize = 20;
  const numDoors = 10;
  const numKeys = 5;

  gameState.reset();
  // Add maze dimension as style property to HTML element
  // CSS then uses this to responsively scale the maze cell width depending
  // on viewport width and height
  document.documentElement.style.setProperty("--maze-dimension", mazeSize);
  
  // Game setup
  const maze = generateMazeMap(mazeSize, mazeSize);
  console.log("DEBUG:maze=>\n");
  console.log(maze);

  const solution = findSolutionMaze(maze["cells"]);
  console.log("DEBUG:solution=>\n");
  console.log(solution);

  const doorPositions = placeDoors(solution, numDoors);
  console.log("DEBUG:doorPositions=>\n");
  console.log(doorPositions);
  // Update maze to insert doors
  doorPositions.forEach((position) => {
    maze["cells"][position[0]][position[1]]["door"] = true;
  });

  // Initialize number of Keys for the game
  gameState.initializeKeys(numKeys);
  updateHeadsUpDisplay(gameState);

  // Render maze in HTML
  drawMaze(maze);

  document.getElementById("game-area").focus();
}

document.addEventListener("DOMContentLoaded", function () {

  // Key bindings for keyboard control
  const keyDirectionMap = {
    ArrowUp: "UP",
    ArrowRight: "RIGHT",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
  };

  // Game state object
  const gameState = {
    gameOver: false,
    gameOverStatus: "",
    totalKeysAvailable: 0,
    numMasterKeys: 0,
    numQuestions: 0,
    numCorrect: 0,
    numSkipped: 0,
    initializeKeys: function (keys) {
      this.totalKeysAvailable = keys;
      this.numMasterKeys = keys;
    },
    reset: function () {
      this.gameOver = false;
      this.gameOverStatus = "";
      this.totalKeysAvailable = 0;
      this.numMasterKeys = 0;
      this.numQuestions = 0;
      this.numCorrect = 0;
      this.numSkipped = 0;
    },
    useMasterKey: function () {
      if (this.numMasterKeys > 0) {
        this.numMasterKeys--;
        this.numSkipped++;
        this.numQuestions++;
      }
    },
    areKeysLeft: function () {
      return this.numMasterKeys ? true : false;
    },
    incrementCorrect: function () {
      this.numQuestions++;
      this.numCorrect++;
    },
    returnGameStatistics: function () {
      return {
        questions: this.numQuestions,
        correct: this.numCorrect,
        skipped: this.numSkipped,
      };
    },
    returnKeysLeft: function () {
      return this.numMasterKeys;
    },
  };

  // Custom Event object to trigger trivia to unlock door
  const checkKeyEvent = new CustomEvent("checkKey", {
    detail: {
      lastKeyPressed: "",
      status: "",
    },
  });

  gameStart(gameState);

  // Add event listener for Key presses
  document.addEventListener("keydown", (event) => {
    if (Object.keys(keyDirectionMap).includes(event.key)) {
      event.preventDefault(); // prevent default scroll behavior for arrow keys
      console.log(`DEBUG: Key pressed=>${event.key}`);
      const status = positionPlayer(keyDirectionMap[event.key]);
      if (status === "checkKey") {
        checkKeyEvent.detail.lastKeyPressed = event.key;
        document.dispatchEvent(checkKeyEvent);
      } else if (status === "finished") {
        gameState.gameOver = true;
        gameState.gameOverStatus = "gameWon";
        gameEnd(gameState);
      }
    }
  });

  // Add event listener for custom Events
  document.addEventListener("checkKey", (event) => {
    if (!event.detail.status) {
      // If status hasn't been set trigger Trivia modal
      console.log(
        `DEBUG: Door detected. Ask Trivia to pass.\n Last Key Pressed => ${event.detail.lastKeyPressed}`
      );
      askTrivia();
    } else if (event.detail.status === "open") {
      positionPlayer(keyDirectionMap[event.detail.lastKeyPressed], true);
      console.log(`DEBUG:Correct! Door opened!`);
      // Clear Event details
      checkKeyEvent.detail.lastKeyPressed = "";
      checkKeyEvent.detail.status = "";
    }

    // Fetch trivia questions from Open Trivia DB
    async function fetchTriviaQuestions(difficulty, numQuestions) {
      try {
        const response =
          await fetch`https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${difficulty}&type=multiple`;
        const data = await response.json();

        return data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const correctIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(correctIndex, 0, q.correct_answer);

          return {
            question: q.question,
            options,
            answer: q.correct_answer,
            difficulty: q.difficulty,
          };
        });
      } catch (error) {
        console.error("Failed to fetch trivia questions:", error);
        return [];
      }
    }
  });

  // Add event listeners for buttons
  buttons = document.querySelectorAll("button");
  
  
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Functionality based on button clicked
      if (event.currentTarget.getAttribute("data-type") === "trivia-correct") {
        gameState.incrementCorrect();
        updateHeadsUpDisplay(gameState);
        checkKeyEvent.detail.status = "open";
        document.dispatchEvent(checkKeyEvent);
      } else if (
        event.currentTarget.getAttribute("data-type") === "trivia-incorrect"
      ) {
        updateHeadsUpDisplay(gameState);
        console.log(`DEBUG: Incorrect Answer.\nGame End!`);
        // Clear Event details
        checkKeyEvent.detail.lastKeyPressed = "";
        checkKeyEvent.detail.status = "";
        // trigger current game End
        gameState.gameOver = true;
        gameState.gameOverStatus = "gameLost";
        gameEnd(gameState);
      } else if (
        event.currentTarget.getAttribute("data-type") === "masterkey"
      ) {
        // decrement master key count
        gameState.useMasterKey();
        updateHeadsUpDisplay(gameState);
        console.log(
          `DEBUG: Master Key used - ${gameState.returnKeysLeft()} master keys left`
        );
        checkKeyEvent.detail.status = "open";
        document.dispatchEvent(checkKeyEvent);
      } else if (
        event.currentTarget.getAttribute("data-type") === "direction-control"
      ) {
        const keyPressed = event.currentTarget.getAttribute("data-direction");
        const direction = keyDirectionMap[keyPressed];
        console.log(`DEBUG: Button pressed=>${direction}`);
        const status = positionPlayer(direction);
        if (status === "checkKey") {
          checkKeyEvent.detail.lastKeyPressed = keyPressed;
          document.dispatchEvent(checkKeyEvent);
        } else if (status === "finished") {
          gameState.gameOver = true;
          gameState.gameOverStatus = "gameWon";
          gameEnd(gameState);
        }
      } else if(event.currentTarget.getAttribute("data-type") === "play-again"){
        console.log(`DEBUG: Play again`);
        gameStart(gameState);
      } else if(event.currentTarget.getAttribute("data-type")==="new-game"){
        console.log(`DEBUG: Start new game`);
        //TODO: Redirect to intro section
      }
    });
  });
});
