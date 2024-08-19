import {
  Post,
  BadRequestException,
  ParseIntPipe,
  Param,
  Controller,
  HttpCode,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO dummy singin service
  @Post('/get-token/:id')
  @HttpCode(200)
  signIn(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getToken(id).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }
}
