const { MarkovMachine } = require('./markov');

describe('markov sample', () => {
  let mm;

  beforeAll(() => {
    mm = new MarkovMachine('the cat in the hat');
  });

  test('# of chains', () => {
    const chainSize = mm.chains.size;
    expect(chainSize).toBe(4);
  });

  test('# of paths for "the" chain', () => {
    paths = mm.chains.get('the').length;
    expect(paths).toBe(2);
  });
});
