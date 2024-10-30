import { bootstrap } from './app';
import { ENV } from './config';

async function main() {
  const app = await bootstrap();

  await app.listen(ENV.PORT);
}

main();
