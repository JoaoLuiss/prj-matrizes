// Generate input fields for matrices based on rows and columns
function generateMatrices() {
  /** These are the number of rows and columns in each Matrix */
  const rowsA = document.getElementById('rowsA').value;
  const colsA = document.getElementById('colsA').value;
  const rowsB = document.getElementById('rowsB').value;
  const colsB = document.getElementById('colsB').value;

  createMatrixInputs('matrixA', rowsA, colsA);
  createMatrixInputs('matrixB', rowsB, colsB);
}

// Helper function to create matrix input fields
function createMatrixInputs(matrixId, rows, cols) {
  const container = document.getElementById(matrixId);
  container.innerHTML = ''; // Clear any existing matrix
  const table = document.createElement('table');

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;
      input.id = `${matrixId}_${i}_${j}`; // Assign unique ID for each input
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  container.appendChild(table);
}

// Function to get matrix data from input fields
function getMatrixData(matrixId) {
  const divTable = document.getElementById(matrixId);

  const table = divTable.children[0];
  const rows = table.rows.length;
  const cols = table.rows[0].cells.length;

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const value = parseFloat(
        document.getElementById(`${matrixId}_${i}_${j}`).value
      );
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}

// Matrix addition
function addMatrices() {
  const matrixA = getMatrixData('matrixA');
  const rowsA = parseInt(matrixA.length);
  const colsA = parseInt(matrixA[0].length);

  const matrixB = getMatrixData('matrixB');
  const rowsB = parseInt(matrixB.length);
  const colsB = parseInt(matrixB[0].length);

  if (rowsA !== rowsB || colsA !== colsB) {
    alert(
      'Para SOMAR Matrizes elas precisam ter o mesmo número de COLUNAS e LINHAS entre si!'
    );
    return;
  }

  const result = [];
  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsA; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(row);
  }

  displayResult(result);
}

// Matrix multiplication
function multiplyMatrices() {
  // Getting Matrix A
  const matrixA = getMatrixData('matrixA');
  const rowsA = parseInt(matrixA.length);
  const colsA = parseInt(matrixA[0].length);

  // Getting Matrix B
  const matrixB = getMatrixData('matrixB');
  const rowsB = parseInt(matrixB.length);
  const colsB = parseInt(matrixB[0].length);

  if (colsA !== rowsB) {
    alert(
      'Para multiplicar matrizes é preciso que: ' +
        'o número de COLUNAS do primeiro termo (A) ' +
        'seja igual ao número de LINHAS do segundo termo (B).'
    );
    return;
  }

  const result = [];
  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  displayResult(result);
}

// Function to display the result
function displayResult(matrix) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = ''; // Clear previous result

  const table = document.createElement('table');
  matrix.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((cellValue) => {
      const td = document.createElement('td');
      td.textContent = cellValue;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  resultContainer.appendChild(table);
}
