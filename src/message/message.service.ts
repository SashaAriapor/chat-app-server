import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createMessageDto } from './dto/CreateMessage.dto';

@Injectable()
export class MessageService {
    constructor(public databaseService: DatabaseService) {}

    async createMessage(from: string ,messageCreateDto: createMessageDto) {
        return await this.databaseService.message.create({ data: { from: "test@gmail.com", to: "sasha@gmail.com", contact: "esdf" }});
        // console.log({from, ...messageCreateDto});
        
    }
}
