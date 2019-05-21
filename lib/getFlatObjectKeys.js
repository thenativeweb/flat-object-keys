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

  // Filter out all paths that shall be excluded, but make sure that only
  // complete subpaths are used. For this we suffix every path and exclude with
  // a dot, so only complete subpaths match.
  const filteredPaths = paths.
    filter(path => !excludes.some(
      exclude => `${path}.`.startsWith(`${exclude}.`)
    ));

  return filteredPaths;
};

module.exports = getFlatObjectKeys;
