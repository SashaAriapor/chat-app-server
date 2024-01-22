import { Injectable } from '@nestjs/common';
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
    async checkPassword(hash: string, password: string) {
        return await argon2.verify(hash, password);
    }
}
