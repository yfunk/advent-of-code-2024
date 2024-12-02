export const chunk = <T>(array: T[], size: number) => {
  return array.reduce(function (result, value, index, array) {
    if (index % size === 0) result.push(array.slice(index, index + size));
    return result;
  }, [] as T[][]);
};

export const count = <T>(array: T[], searchValue: T): number => {
  return array.reduce((count, value) => (value === searchValue ? count + 1 : count), 0);
};

export const countValues = <T>(array: T[]): Map<T, number> => {
  return array.reduce((map, value) => {
    map.set(value, (map.get(value) ?? 0) + 1);
    return map;
  }, new Map<T, number>());
};

export const withoutIndex = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};
