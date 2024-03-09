import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { createMessageDto } from './dto/CreateMessage.dto';

@ApiTags("Message")
@UseGuards(AccessTokenGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post("send")
  async SendMessage(@Body() body: createMessageDto , @Req() req: Request ) {
    const email = req.user['email'];
    return await this.messageService.createMessage(email, body);
  }
}
