import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  Request,
  SetMetadata,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';
import AllowUnauthenticatedAccess from '@api/utils/allow-unauthenticated-access';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @AllowUnauthenticatedAccess()
  @Post('login')
  @UseInterceptors(NoFilesInterceptor())
  async login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.officialEmail, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
