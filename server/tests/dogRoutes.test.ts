import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import dogRoutes from '../routes/dogRoutes';
import * as dogController from '../controllers/dogController';

vi.mock('../controllers/dogController');

const mockImageUrl = 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('dogRoutes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 4 – Positive: GET /api/dogs/random returns 200, success true, mocked imageUrl
  it('should return 200, success true and the mocked imageUrl', async () => {
    vi.mocked(dogController.getDogImage).mockImplementation(async (_req, res) => {
      res.json({
        success: true,
        data: { imageUrl: mockImageUrl, status: 'success' },
      });
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain(mockImageUrl);
  });
});
