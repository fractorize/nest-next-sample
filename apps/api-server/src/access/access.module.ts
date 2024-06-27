import { Module } from '@nestjs/common';
import { UserModule } from '@api/user/user.module';
import { AccessService } from './access.service';
import { AccessGuard } from './access.guard';

@Module({
  imports: [UserModule],
  providers: [AccessService, AccessGuard],
  exports: [AccessService],
})

export class AccessModule {}