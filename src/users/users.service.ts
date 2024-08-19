import { Inject, Injectable } from '@nestjs/common';
import { randomUUID, scrypt } from 'crypto';
import { promisify } from 'util';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

const scryptAsync = promisify(scrypt);

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  protected async generatePasswordHash(password: string, salt?: string) {
    const genSalt = salt ?? randomUUID();

    const hash: Buffer = (await scryptAsync(password, genSalt, 32)) as Buffer;
    const hashString = hash.toString('hex');
    return salt ? `${hashString}` : `${genSalt}.${hashString}`;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new Error('User already exists');
    }

    const password = await this.generatePasswordHash(createUserDto.password);
    const newUser = new User({
      email: createUserDto.email,
      name: createUserDto.name,
      phone: createUserDto.phone,
      password,
    });
    return newUser.save();
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
