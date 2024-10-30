import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { type Application } from 'express';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { UsersTable } from '../../src/db/schema';
import { DrizzleService } from '../../src/drizzle/diozzle.service';
import { UserService } from '../../src/user/user.service';

const userDate = {
  email: 'some@mail.com',
  username: 'some@mail.com',
  password: 'some1234',
};

describe('AppController (e2e)', () => {
  let nestApp: INestApplication;
  let app: Application;
  let drizzleService: DrizzleService;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    nestApp = moduleFixture.createNestApplication();
    app = nestApp.getHttpServer();
    await nestApp.init();

    drizzleService = nestApp.get(DrizzleService);
    userService = nestApp.get(UserService);
    await drizzleService.db.delete(UsersTable);
  });

  afterEach(async () => {
    await drizzleService.db.delete(UsersTable);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  describe('/user', () => {
    it('Get user', async () => {
      await request(app).post('/auth/register').send(userDate).expect(201);
      const logInResponse = await request(app)
        .post('/auth/log-in')
        .send(userDate)
        .expect(200);

      const user = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${logInResponse.body.accessToken}`)
        .expect(200);

      expect(user.body.email).toBe(userDate.email);
      expect(user.body.username).toBe(userDate.username);
      expect(user.body.password).toBeUndefined();
    });

    describe('Other cases', () => {
      it('Get user from cache', async () => {
        await request(app).post('/auth/register').send(userDate).expect(201);
        const logInResponse = await request(app)
          .post('/auth/log-in')
          .send(userDate)
          .expect(200);

        await request(app)
          .get('/user')
          .set('Authorization', `Bearer ${logInResponse.body.accessToken}`)
          .expect(200);

        await request(app)
          .get('/user')
          .set('Authorization', `Bearer ${logInResponse.body.accessToken}`)
          .expect(200);
      });

      it('Attempt to get access to protected resource with invalid access token', async () => {
        await request(app)
          .get('/user')
          .set('Authorization', 'Bearer bad-access-token')
          .expect(401);
      });

      it('Attempt to get access to protected resource without access token', async () => {
        await request(app).get('/user').expect(401);
      });
    });
  });

  describe('Other cases', () => {
    it('Test edge case in UserService.getUser', async () => {
      await expect(async () => {
        await userService.getUser({
          id: 'e5298dc9-3456-4fc1-a431-f8ba11111111',
        });
      }).rejects.toThrow(BadRequestException);
    });
  });
});
