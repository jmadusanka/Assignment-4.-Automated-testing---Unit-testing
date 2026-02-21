import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

vi.mock('../services/dogService');

const mockDogData = {
  imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
  status: 'success',
};

describe('dogController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    vi.resetAllMocks();
    mockReq = {};
    mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };
  });

  // Test 3 – Positive: controller returns success: true and the mocked dog data
  it('should return success true and mocked dog data when service resolves', async () => {
    vi.mocked(dogService.getRandomDogImage).mockResolvedValueOnce(mockDogData);

    await getDogImage(mockReq as Request, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData,
    });
  });
});
