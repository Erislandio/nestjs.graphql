import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe } from 'node:test';
import { UserResolver } from './app.resolver';
import { UserService } from './app.service';

describe('userResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [UserResolver, UserService],
      imports: [UserResolver],
    }).compile();

    userResolver = app.get<UserResolver>(UserResolver);
  });

  it('should list users', async () => {
    const users = await userResolver.listUsers();

    expect(users).toBe([
      {
        id: '1',
        name: 'Erislandio Soares',
        email: 'erislandiosoares@gmail.com',
        age: 30,
      },
      {
        id: '2',
        name: 'José',
        email: 'jose@gmai.com',
        age: 21,
      },
    ]);
  });
});
