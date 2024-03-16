import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateContactFullDto } from './dto/addContact.dto';
import { UpdateContactDto } from './dto/updateContact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOneContact(id: string) {
    return await this.databaseService.contact.findUnique({ where: { id } });
  }

  async createContact(data: CreateContactFullDto) {
    return await this.databaseService.contact.create({ data });
  }

  async updateContact(id: string, data: UpdateContactDto) {
    return await this.databaseService.contact.update({ where: { id }, data });
  }

  async findAllContactWithAuthorId(authorId) {
    return await this.databaseService.contact.findMany({ where: { authorId } });
  }

  async DeleteOneContact(contactId) {
    return await this.databaseService.contact.delete({
      where: { id: contactId },
    });
  }
}
