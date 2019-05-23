'use strict';

const assert = require('assertthat');

const getFlatObjectKeys = require('../../lib/getFlatObjectKeys');

suite('getFlatObjectKeys', () => {
  test('is a function.', async () => {
    assert.that(getFlatObjectKeys).is.ofType('function');
  });

  test('throws an error if from is missing.', async () => {
    assert.that(() => {
      getFlatObjectKeys({});
    }).is.throwing('From is missing.');
  });

  test('returns an empty array if from is an empty object.', async () => {
    const flattenedObjectKeys = getFlatObjectKeys({
      from: {}
    });

    assert.that(flattenedObjectKeys).is.equalTo([]);
  });

  test('returns an array with flattened keys.', async () => {
    const flattenedObjectKeys = getFlatObjectKeys({
      from: {
        foo: 23,
        bar: { baz: 42 }
      }
    });

    assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar', 'bar.baz' ]);
  });

  test('correctly handles null values.', async () => {
    const flattenedObjectKeys = getFlatObjectKeys({
      from: {
        foo: null,
        bar: { baz: null }
      }
    });

    assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar', 'bar.baz' ]);
  });

  test('correctly handles arrays.', async () => {
    const flattenedObjectKeys = getFlatObjectKeys({
      from: {
        foo: [],
        bar: { baz: [ 23, 42 ]}
      }
    });

    assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar', 'bar.baz' ]);
  });

  suite('excludes', () => {
    test('excludes the given keys.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: 42 }
        },
        excludes: [ 'bar.baz' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar' ]);
    });

    test('excludes keys and their nested properties.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: 42 }
        },
        excludes: [ 'bar' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo' ]);
    });

    test('correctly handles the beginning of words.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: 42 }
        },
        excludes: [ 'bar.b' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar', 'bar.baz' ]);
    });

    test('supports wildcards.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: 42 }
        },
        excludes: [ 'bar.*' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar' ]);
    });

    test('supports wildcards with nesting.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: { bas: 42 }}
        },
        excludes: [ 'bar.*' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar' ]);
    });

    test('supports wildcards on nested levels.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: { bas: 42 }}
        },
        excludes: [ 'bar.baz.*' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar', 'bar.baz' ]);
    });

    test('correctly uses wildcards with beginnings of words.', async () => {
      const flattenedObjectKeys = getFlatObjectKeys({
        from: {
          foo: 23,
          bar: { baz: 42 },
          barX: 65
        },
        excludes: [ 'bar.*' ]
      });

      assert.that(flattenedObjectKeys).is.equalTo([ 'foo', 'bar', 'barX' ]);
    });
  });
});
