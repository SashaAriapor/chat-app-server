import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from "@nestjs/serve-static";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../", "static")
    }),
    DatabaseModule, 
    UserModule, 
    AuthModule
  ],
})
export class AppModule {}