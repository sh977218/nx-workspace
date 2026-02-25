import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The squad have been successfully retrieved.'
  })
  @ApiResponse({ status: 404, description: 'The hero is not found.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
