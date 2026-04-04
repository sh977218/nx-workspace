import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { SquadService } from '../squad/squad.service';
import { UserService } from '../user/user.service';

@Injectable()
export class DataLoadService {
  constructor(
    private readonly squadsService: SquadService,
    private readonly userService: UserService,
  ) {}

  async resetAndLoadHeroes() {
    const filePath = join(__dirname, 'assets/squads.json');
    const data = readFileSync(filePath, 'utf-8');
    const squadsData = JSON.parse(data);

    await this.squadsService.deleteAllSquads();
    await this.squadsService.injectSquads(squadsData);
  }

  async resetAndLoadUsers() {
    const filePath = join(__dirname, 'assets/user.json');
    const data = readFileSync(filePath, 'utf-8');
    const squadsData = JSON.parse(data);

    await this.userService.deleteAllUsers();
    await this.userService.injectUsers(squadsData);
  }

  async deleteDataBase() {
    await mongoose.connection.dropDatabase();
  }
}
