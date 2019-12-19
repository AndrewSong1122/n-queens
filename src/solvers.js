/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// O(n!)
window.findNRooksSolution = function(n) {
  var solution = makeEmptyMatrix(n);
  var currentLength = 0;

  // do this starting at row 0
  var goDownRows = function(row, arr, occ) {
    // go down all the  rows
    var num;
    if (row === 0) {
      num = Math.ceil(n/2);
    } else {
      num = n;
    }
    if (row <= n-1) {    
      // for each col in row
      for (var col = 0; col < num; col++) {
        if (arr[row][col] === 0 && !occ.includes(col)) {
          var newArr = copyMatrix(arr, n);
          var newOcc = occ.slice();
          newArr[row][col] = 1;
          newOcc.push(col);
          goDownRows(row+1, newArr, newOcc);

          // currentLength = occ.length;
          // arr[row][col] = 1;
          // occ.push(col);
          // goDownRows(row+1, arr, occ);
          // if (currentLength < occ.length) {
          //   occ = occ.slice(0,currentLength);
          // }
          // arr[row][arr[row].indexOf(1)] = 0;
        }
      }
    }
    // after going through all rows
    if (row === n) {
      solution = copyMatrix(arr,n);
    }
  }

  goDownRows(0, makeEmptyMatrix(n), []);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// O(n!)
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  // do this starting at row 0
  var goDownRows = function(row, arr, occ) {
    // go down all the  rows
    if (row <= n-1) {    
      // for each col in row
      for (var col = 0; col < n; col++) {
        if (arr[row][col] === 0 && !occ.includes(col)) {
          var newArr = copyMatrix(arr, n);
          var newOcc = occ.slice();
          newArr[row][col] = 1;
          newOcc.push(col);
          goDownRows(row+1, newArr, newOcc);
        }
      }
    }
    // after going through all rows
    if (row === n) {
      solutionCount++;
    }
  }

  goDownRows(0, makeEmptyMatrix(n), []);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// O(n!)
window.findNQueensSolution = function(n) {
  var solution = makeEmptyMatrix(n); //fixme

  // do this starting at row 0
  var goDownRows = function(row, arr, occ) {
    var num;
    if (row === 0) {
      num = Math.ceil(n/2);
    } else {
      num = n;
    }
    // go down all the  rows
    if (row <= n-1) {    
      // for each col in row
      for (var col = 0; col < num; col++) {
        if (arr[row][col] === 0 && !occ.includes(col) && freeDiagonals(row,col, n, arr)) {
          var newArr = copyMatrix(arr, n);
          var newOcc = occ.slice();
          newArr[row][col] = 1;
          newOcc.push(col);
          goDownRows(row+1, newArr, newOcc);
        }
      }
    }
    // after going through all rows
    if (row === n) {
      solution = arr;
    }
  }

  goDownRows(0, makeEmptyMatrix(n), []);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// O(n!)
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  // do this starting at row 0
  var goDownRows = function(row, arr, occ) {
    // go down all the  rows
    if (row <= n-1) {    
      // for each col in row
      for (var col = 0; col < n; col++) {
        if (arr[row][col] === 0 && !occ.includes(col) && freeDiagonals(row,col, n, arr)) {
          var newArr = copyMatrix(arr, n);
          var newOcc = occ.slice();
          newArr[row][col] = 1;
          newOcc.push(col);
          goDownRows(row+1, newArr, newOcc);
        }
      }
    }
    // after going through all rows
    if (row === n) {
      solutionCount++;
    }
  }

  goDownRows(0, makeEmptyMatrix(n), []);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// make empty solution matrix
var makeEmptyMatrix = function(n) {
  var arr = [];
  for (var row = 0; row < n; row++) {
    arr[row] = [];
    for (var col = 0; col < n; col++) {
      arr[row].push(0);
    }
  }
  return arr;
};

// duplicates a matrix
var copyMatrix = function(orig, n) {
  var arr = [];
  for (var row = 0; row < n; row++) {
    arr[row] = [];
    for (var col = 0; col < n; col++) {
      arr[row].push(orig[row][col]);
    }
  }
  return arr;
};

// checks if the major and minor diagonal
// through a space are unoccupied
var freeDiagonals = function(r, c, n, mat) {
  // check major diagonal
  var count = 0;
  var col = c;
  for (var row = r; row >= 0; row--) {
    if (col >= 0) {
      if (mat[row][col] === 1) {
        count++;
        if (count >= 1) {
          return false;
        }
      }
    } 
    if (col === 0) {
      break;
    }
    col--;
  }

  // check minor diagonal
  count = 0;
  col = c;
  for (var row = r; row >= 0; row--) {
    if (col < n) {
      if (mat[row][col] === 1) {
        count++;
        if (count >= 1) {
          return false;
        }
      }
    }
    if (col === n-1) {
      break;
    }
    col++;
  }

  return true;
};