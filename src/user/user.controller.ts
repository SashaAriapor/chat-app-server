import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/updateProfile.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/helper/multer.config';

@ApiTags('User')
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userId = req.user['sub'];
    const user = await this.userService.findUserById(userId);
    const { id ,firstname, lastname, email, bio, avatar, createAt } = user;
    return { id, firstname, lastname, email, bio, avatar, createAt };
  }

  @Put('/update')
  async register(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const id = req.user['sub'];
    return await this.userService.updateUserWithId(id, dto);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async uploadAvatar(@UploadedFile() file, @Req() req: Request) {
    const id = req.user['sub'];
    return await this.userService.updateUserAvatarWithId(
      id,
      file.path.slice(7),
    );
  }

  @Delete('delete-avatar')
  async deleteAvatar(req: Request) {
    const id = req.user['sub'];
    const defaultAvatar =  "default/default-profile.png";
    return await this.userService.updateUserAvatarWithId(
      id,
      defaultAvatar
    )
  }
}
