import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('users (Query)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ users { id name email age } }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.users).toBeDefined();
        expect(res.body.data.users.length).toBeGreaterThan(0);
        expect(res.body.data.users[0]).toMatchObject({
          id: '1',
          name: 'Erislandio Soares',
          email: 'erislandiosoares@gmail.com',
          age: 30,
        });
      });
  });

  it('user (Query)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ user(id: "1") { id name email age } }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.user).toBeDefined();
        expect(res.body.data.user).toMatchObject({
          id: '1',
          name: 'Erislandio Soares',
          email: 'erislandiosoares@gmail.com',
          age: 30,
        });
      });
  });

  it('user not found (Query)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ user(id: "999") { id name } }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.user).toBeNull();
      });
  });
});
