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
    while (
      doorPositions.some(
        (position) =>
          position[0] === path[index][0] && position[1] === path[index][1]
      )
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
function drawMaze(maze, solution=null) {
  const mazeSize = maze["cells"].length;

  const mazeArea = document.querySelector("#maze-area");
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
        mazeCell.classList.add("player-position");
        const player = document.createElement("div");
        player.classList.add("player");
        mazeCell.appendChild(player);
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

document.addEventListener("DOMContentLoaded", function () {
  // Game difficulty settings
  const mazeSize = 15;
  const numDoors = 10;

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

  // Render maze in HTML
  drawMaze(maze, solution);
});
