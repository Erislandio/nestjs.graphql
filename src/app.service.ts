import { Injectable } from '@nestjs/common';
import type { User } from './entity/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      age: 30,
      email: 'erislandiosoares@gmail.com',
      id: '1',
      name: 'Erislandio Soares',
    },
    {
      age: 21,
      email: 'jose@gmai.com',
      id: '2',
      name: 'José',
    },
  ];

  list() {
    return this.users;
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
