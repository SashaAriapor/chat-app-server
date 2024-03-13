import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserService } from 'src/user/user.service';
import { MessageGateway } from './message.gateway';

@Module({
  controllers: [MessageController],
  providers: [MessageService, UserService, MessageGateway],
})
export class MessageModule {}
