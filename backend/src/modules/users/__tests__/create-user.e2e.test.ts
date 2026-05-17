import { jest } from '@jest/globals';
jest.mock('nodemailer');

import request from 'supertest';
import { app } from '../../../server.js';
import { prisma } from '../../../shared/infrastructure/prisma/prisma.instance.js';
import { setEmailService } from '../../../compositionRoot.js';
import { NodemailerEmailService } from '../../../shared/infrastructure/email/NodemailerEmailService.js';
import type { Transporter, SendMailOptions } from 'nodemailer';

const mockTransporter: Partial<Transporter> = {
  sendMail: jest.fn(async (_: SendMailOptions) => Promise.resolve()),
};

beforeAll(() => {
  setEmailService(new NodemailerEmailService(mockTransporter as Transporter));
});

beforeEach(async () => {
  await prisma.user.deleteMany({
    where: { email: 'test.user@ecotech.com' },
  });
});

describe('POST /api/users', () => {
  it('debe crear un usuario nuevo', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'test.user@ecotech.com',
      role: 'INVENTORY_MANAGER',
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(/User created successfully/);
  });

  it('debe rechazar usuario duplicado', async () => {
    await request(app).post('/api/users').send({
      email: 'test.user@ecotech.com',
      role: 'INVENTORY_MANAGER',
    });
    const response = await request(app).post('/api/users').send({
      email: 'test.user@ecotech.com',
      role: 'INVENTORY_MANAGER',
    });
    expect(response.status).toBe(409);
    expect(response.body.error).toMatch(/already exists/);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
