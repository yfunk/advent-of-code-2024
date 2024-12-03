import { readInput } from 'io';
import { parseLines } from 'parse';

const input = await readInput('day-03');

export const part1 = () => {
  const REGEX = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g;
  const matches = [...input.matchAll(REGEX)];

  let sum = 0;
  for (const { groups } of matches) {
    const { a, b } = groups as { a: string; b: string };

    sum += Number(a) * Number(b);
  }

  return sum;
};

export const part2 = () => {
  const REGEX = /(?:(?<action>mul)\((?<a>\d{1,3}),(?<b>\d{1,3})\)|(?<action>do|don't)\(\))/g;
  const matches = [...input.matchAll(REGEX)];

  let enabled = true;
  let sum = 0;

  for (const { groups } of matches) {
    const { action, a, b } = groups as { action: string; a: string; b: string };

    switch (action) {
      case 'mul':
        if (enabled) sum += Number(a) * Number(b);
        break;
      case 'do':
        enabled = true;
        break;
      case "don't":
        enabled = false;
        break;
    }
  }

  return sum;
};
