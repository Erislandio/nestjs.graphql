import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './app.resolver';
import { UserService } from './app.service';
import { User } from './entity/user.entity';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
    },
  ];

  const mockUserService = {
    list: jest.fn().mockReturnValue(mockUsers),
    findById: jest
      .fn()
      .mockImplementation((id: string) =>
        mockUsers.find((user) => user.id === id),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const result = await resolver.listUsers();
      expect(result).toEqual(mockUsers);
      expect(service.list).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const result = await resolver.getUserById('1');
      expect(result).toEqual(mockUsers[0]);
      expect(service.findById).toHaveBeenCalledWith('1');
    });

    it('should return undefined if user not found', async () => {
      const result = await resolver.getUserById('999');
      expect(result).toBeUndefined();
      expect(service.findById).toHaveBeenCalledWith('999');
    });
  });
});
