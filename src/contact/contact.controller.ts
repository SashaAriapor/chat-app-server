import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from "./dto/addContact.dto";
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Request } from 'express';


@ApiTags("Contact")
@UseGuards(AccessTokenGuard)
@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService
  ) {}

  @Post("/add")
  async AddContact(@Body() dto: CreateContactDto, @Req() req: Request ) {
    const authorId = req.user['sub'];
    const data = { ...dto, authorId }
    return await this.contactService.createContact(data);
  }
}
