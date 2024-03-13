import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageService {
    constructor(
        public databaseService: DatabaseService) {}

    async createMessage(from: string ,messageCreateDto: createMessageDto) {
        return await this.databaseService.message.create({ data: {from, ...messageCreateDto}});
    }

    async findAllMessageByEmail(email: string) {
        return await this.databaseService.message.findMany({
            where: {
                OR: [
                    { from: email }, { to: email }
                ]
            }
        });
    }
}
