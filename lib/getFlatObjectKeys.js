'use strict';

const getFlatObjectKeys = function ({ from, excludes = []}) {
  if (!from) {
    throw new Error('From is missing.');
  }

  const paths = [];

  for (const [ path, value ] of Object.entries(from)) {
    paths.push(path);

    if (
      (typeof value !== 'object') ||
      (value === null) ||
      Array.isArray(value)
    ) {
      continue;
    }

    const subPaths = getFlatObjectKeys({ from: value }).
      map(subPath => `${path}.${subPath}`);

    paths.push(...subPaths);
  }

  const filteredPaths = [];

  for (const path of paths) {
    let isExcluded = false;

    for (const exclude of excludes) {
      if (`${path}.`.startsWith(`${exclude}.`)) {
        isExcluded = true;
        break;
      }

      if (exclude.endsWith('*')) {
        const shortenedPath = path.substring(0, path.lastIndexOf('.') + 1);
        const shortenedExclude = exclude.replace('*', '');

        if (shortenedPath.startsWith(shortenedExclude)) {
          isExcluded = true;
          break;
        }
      }
    }

    if (isExcluded) {
      continue;
    }

    filteredPaths.push(path);
  }

  return filteredPaths;
};

module.exports = getFlatObjectKeys;
