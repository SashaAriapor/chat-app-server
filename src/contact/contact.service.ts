import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateContactFullDto } from './dto/addContact.dto';

@Injectable()
export class ContactService {
    constructor(
        private readonly databaseService: DatabaseService
    ) {}

    async createContact(data: CreateContactFullDto) {
        return await this.databaseService.contact.create({ data });
    }
}
