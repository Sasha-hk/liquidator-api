import { Global, Module } from '@nestjs/common';

import { DrizzleService } from './diozzle.service';

@Global()
@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}
