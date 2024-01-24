import { Body, Controller, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UpdateUserDto } from "./dto/updateProfile.dto";
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/helper/multer.config';

@ApiTags("User")
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Put("/update")
  async register(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const id = req.user['sub'];
    return await this.userService.updateUserWithId(id, dto);
  }

  @Post("upload-avatar")
  @UseInterceptors(FileInterceptor("avatar", multerOptions))
  async uploadAvatar(@UploadedFile() file) {
    return file;
  }
}
