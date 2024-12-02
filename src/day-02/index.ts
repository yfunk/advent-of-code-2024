import { readInput } from 'io';
import { parseLines, parseMatrix, splitString } from 'parse';
import { withoutIndex } from 'utils/array';

const input = await readInput('day-02');

export const part1 = () => {
  const reports = parseLines(input, (line) => splitString(line, Number));

  let safeReports = 0;

  for (const report of reports) {
    if (checkReport(report)) safeReports++;
  }

  return safeReports;
};

export const part2 = () => {
  const reports = parseLines(input, (line) => splitString(line, Number));

  let safeReports = 0;

  for (const report of reports) {
    if (checkReport(report)) {
      safeReports++;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      if (checkReport(withoutIndex(report, i))) {
        safeReports++;
        break;
      }
    }
  }

  return safeReports;
};

//#region helpers
const checkReport = (report: number[]): boolean => {
  const increasing = report[0] < report[1];

  for (let i = 1; i < report.length; i++) {
    const difference = Math.abs(report[i] - report[i - 1]);

    if (
      (increasing && report[i] < report[i - 1]) ||
      (!increasing && report[i] > report[i - 1]) ||
      difference < 1 ||
      difference > 3
    ) {
      return false;
    }
  }

  return true;
};
//#endregion
