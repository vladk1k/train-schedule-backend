import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    try {
      return this.usersRepository.findOne({
        where: { username },
        select: ['id', 'username', 'password'],
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    // await newUser.hashPassword();

    return this.usersRepository.save(newUser);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
