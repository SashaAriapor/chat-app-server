import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { createMessageDto } from './dto/createMessage.dto';
import { UserService } from 'src/user/user.service';
import { MessageGateway } from './message.gateway';

@ApiTags('Message')
@UseGuards(AccessTokenGuard)
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly messageGateway: MessageGateway,
  ) {}

  @Post('send')
  async SendMessage(@Body() body: createMessageDto, @Req() req: Request) {
    const email = req.user['email'];
    const message = await this.messageService.createMessage(email, body);
    const receiver = await this.userService.findUserByEmail(body.to);
    if (!receiver) throw new BadRequestException("User Doesn't Exist");
    const receiverSocketId = receiver.socketId;
    this.messageGateway.sendMessage(receiverSocketId, message);
    return message;
  }

  @Get('')
  async GetAllMessage(@Req() req: Request) {
    const email = req.user['email'];
    return await this.messageService.findAllMessageByEmail(email);
  }
}
