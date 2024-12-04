import { readInput } from 'io';
import { parseMatrix } from 'parse';

const input = await readInput('day-04');

export const part1 = () => {
  const matrix = parseMatrix(input);

  let matches = 0;
  const strings: string[] = [];

  // horizontal rows
  for (let row of matrix) {
    strings.push(row.join(''));
  }
  // vertical rows
  for (let i = 0; i < matrix[0].length; i++) {
    strings.push(matrix.map((row) => row[i]).join(''));
  }
  // diagonal rows
  for (let i = 0; i < matrix.length; i++) {
    strings.push(getDiagonalString(matrix, [i, 0]));
  }
  for (let i = 1; i < matrix[0].length; i++) {
    strings.push(getDiagonalString(matrix, [0, i]));
  }
  // reverse diagonal rows
  for (let i = 0; i < matrix.length; i++) {
    strings.push(getDiagonalString(matrix, [i, matrix[i].length - 1], true));
  }
  for (let i = matrix[0].length - 2; i >= 0; i--) {
    strings.push(getDiagonalString(matrix, [0, i], true));
  }

  for (let string of strings) {
    // check separately to detect overlapping matches
    matches += (string.match(/XMAS/g) || []).length;
    matches += (string.match(/SAMX/g) || []).length;
  }

  return matches;
};

export const part2 = () => {
  const matrix = parseMatrix(input);

  let matches = 0;

  for (let y = 1; y < matrix.length - 1; y++) {
    for (let x = 1; x < matrix[y].length - 1; x++) {
      if (matrix[y][x] !== 'A') continue;

      const diagonal = matrix[y - 1][x - 1] + 'A' + matrix[y + 1][x + 1];
      const diagonalReverse = matrix[y - 1][x + 1] + 'A' + matrix[y + 1][x - 1];

      if (
        (diagonal === 'MAS' || diagonal === 'SAM') &&
        (diagonalReverse === 'MAS' || diagonalReverse === 'SAM')
      ) {
        matches++;
      }
    }
  }

  return matches;
};

//#region helpers
const getDiagonalString = (
  matrix: string[][],
  [row, col]: [number, number] = [0, 0],
  reverse: boolean = false
): string => {
  let string = '';

  if (reverse) {
    for (let i = 0; row + i < matrix.length && col - i >= 0; i++) {
      string += matrix[row + i][col - i];
    }
  } else {
    for (let i = 0; row + i < matrix.length && col + i < matrix[row + i].length; i++) {
      string += matrix[row + i][col + i];
    }
  }

  return string;
};
//#endregion
