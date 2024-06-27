import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // // @UseInterceptors(NoFilesInterceptor())
  // async login(@Body() signInDto: Record<string, any>) {
  //   console.log(signInDto);
  //   return this.authService.login(signInDto.officialEmail, signInDto.password);
  // }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {
    // return this.authService.logout();
  }
}
