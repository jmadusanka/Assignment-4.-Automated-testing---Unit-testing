import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import dogRoutes from '../routes/dogRoutes';
import * as dogService from '../services/dogService';

vi.mock('../services/dogService');

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('dogApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 5 –  GET /api/dogs/random returns 500 with error
  it('should return 500 and an error message when the service fails', async () => {
    vi.mocked(dogService.getRandomDogImage).mockRejectedValueOnce(
      new Error('Failed to fetch dog image: Network error')
    );

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});
