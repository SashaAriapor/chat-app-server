import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from "./dto/addContact.dto";
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Request } from 'express';
import { UpdateContactDto } from './dto/updateContact.dto';


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

  @Get("")
  async GetAllContact(@Req() req: Request) {
    const userId = req.user['sub'];
    return await this.contactService.findAllContactWithAuthorId(userId);
  } 

  @Put("/:id")
  async UpdateContact(@Body() dto: UpdateContactDto, @Req() req: Request, @Param('id') id: string) {
    const authorId = req.user['sub'];
    const contact = await this.contactService.findOneContact(id);
    if (contact?.authorId !== authorId) throw new ForbiddenException('Access Denied');
    return await this.contactService.updateContact(id, dto);
  }

  @Delete("/:id")
  async DeleteContact(@Req() req: Request, @Param("id") id: string) {
    const authorId = req.user['sub'];
    const contact = await this.contactService.findOneContact(id);
    if (contact?.authorId !== authorId) throw new ForbiddenException('Access Denied');
    return await this.contactService.DeleteOneContact(id);
  }
}