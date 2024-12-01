import { readInput } from 'io';
import { parseLines, removeWhiteSpace, splitString } from 'parse';
import { countValues } from 'utils/array';
import { sum } from 'utils/math';
import { asc } from 'utils/sort';

const input = await readInput('day-01');

export const part1 = () => {
  const { leftList, rightList } = parseLists(input);

  leftList.sort(asc);
  rightList.sort(asc);

  const distances: Array<number> = [];

  for (let i = 0; i < leftList.length; i++) {
    distances.push(Math.abs(leftList[i] - rightList[i]));
  }

  return sum(distances);
};

export const part2 = () => {
  const { leftList, rightList } = parseLists(input);

  const rightListValueCounts = countValues(rightList);

  return sum(leftList.map((value) => value * (rightListValueCounts.get(value) ?? 0)));
};

//#region helpers
const parseLists = (input: string): { leftList: Array<number>; rightList: Array<number> } => {
  const lines = parseLines(input);

  const leftList: Array<number> = [];
  const rightList: Array<number> = [];

  for (const line of lines) {
    const [left, right] = splitString(line, Number);

    leftList.push(left);
    rightList.push(right);
  }

  return { leftList, rightList };
};
//#endregion
