import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { type Application } from 'express';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { UsersTable } from '../../src/db/schema';
import { DrizzleService } from '../../src/drizzle/diozzle.service';

const userDate = {
  email: 'some@mail.com',
  username: 'some@mail.com',
  password: 'some1234',
};

describe('AppController (e2e)', () => {
  let nestApp: INestApplication;
  let app: Application;
  let drizzleService: DrizzleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    nestApp = moduleFixture.createNestApplication();
    app = nestApp.getHttpServer();
    await nestApp.init();

    drizzleService = nestApp.get(DrizzleService);
    await drizzleService.db.delete(UsersTable);
  });

  afterEach(async () => {
    await drizzleService.db.delete(UsersTable);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  describe('/auth/register', () => {
    it('Successful registration', () => {
      return request(app).post('/auth/register').send(userDate).expect(201);
    });

    describe('Other cases', () => {
      it('User with this email already exists', async () => {
        await request(app).post('/auth/register').send(userDate).expect(201);

        const r = await request(app)
          .post('/auth/register')
          .send(userDate)
          .expect(400);
        expect(r.body.message).toBe('User with this email already exists');
      });

      it('User with this username already exists', async () => {
        await request(app)
          .post('/auth/register')
          .send({
            email: 'some@mail.com',
            username: 'some@mail.com',
            password: 'some1234',
          })
          .expect(201);

        const r = await request(app)
          .post('/auth/register')
          .send({
            ...userDate,
            email: 'some2@mail.com',
          })
          .expect(400);
        expect(r.body.message).toBe('User with this username already exists');
      });
    });
  });

  describe('/auth/log-in', () => {
    it('Successful log-in', async () => {
      await request(app).post('/auth/register').send(userDate).expect(201);
      const r = await request(app)
        .post('/auth/log-in')
        .send(userDate)
        .expect(200);
      expect(r.body).toBeDefined();
    });

    describe('Other cases', () => {
      it('User not exists', async () => {
        const r = await request(app)
          .post('/auth/log-in')
          .send({ ...userDate, email: 'random@mail.com' })
          .expect(400);
        expect(r.body.message).toBe('User not exists');
      });

      it('Bad password', async () => {
        await request(app).post('/auth/register').send(userDate).expect(201);
        const r = await request(app)
          .post('/auth/log-in')
          .send({ ...userDate, password: 'bad-password' })
          .expect(400);
        expect(r.body.message).toBe('Bad password');
      });
    });
  });
});
