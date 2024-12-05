import { readInput } from 'io';
import { parseLines } from 'parse';

const input = await readInput('day-05');

export const part1 = () => {
  const { rules, updates } = parseInput(input);

  let sum = 0;
  for (const update of updates) {
    if (!correctOrder(update, rules)) continue;

    sum += update[Math.floor(update.length / 2)];
  }

  return sum;
};

export const part2 = () => {
  const { rules, updates } = parseInput(input);

  let sum = 0;
  for (const update of updates) {
    if (correctOrder(update, rules)) continue;

    const sorted = update.toSorted(sortByRules(rules));

    sum += sorted[Math.floor(sorted.length / 2)];
  }

  return sum;
};

//#region helpers
const parseInput = (input: string) => {
  const [rulesString, updatesString] = input.split('\n\n');

  const rules = parseLines(rulesString, (rule) => rule.split('|').map(Number));
  const updates = parseLines(updatesString, (update) => update.split(',').map(Number));

  return { rules, updates };
};

const correctOrder = (update: number[], rules: number[][]) => {
  for (let i = 0; i < update.length; i++) {
    const page = update[i];
    const previousPages = update.slice(0, i);

    for (const rule of rules) {
      if (rule[1] === page && update.includes(rule[0]) && !previousPages.includes(rule[0])) {
        return false;
      }
    }
  }

  return true;
};

const sortByRules = (rules: number[][]) => {
  return (a: number, b: number) => {
    for (const rule of rules) {
      if (rule[1] === a && rule[0] === b) {
        return -1;
      }
    }

    return 0;
  };
};
//#endregion
