import { bootstrap } from '../../src/app';
import { evalValidator } from '../../src/config';

describe('Application testing', () => {
  it('build app', async () => {
    await bootstrap();
  });

  it('check evalValidator', async () => {
    expect(() => evalValidator()._parse('')).toThrow(
      new Error(`Bad eval input value: `),
    );
  });
});
