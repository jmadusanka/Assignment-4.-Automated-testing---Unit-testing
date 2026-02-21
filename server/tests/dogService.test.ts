import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

const mockApiData = {
  message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
  status: 'success',
};

describe('dogService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 1 – returns imageUrl and success status when API responds correctly
  it('should return imageUrl and success status when API responds correctly', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockApiData),
    } as unknown as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiData.message);
    expect(result.status).toBe('success');
    expect(fetch).toHaveBeenCalledOnce();
  });

  // Test 2 – get returns ok: false / status 500, error is thrown
  it('should throw an error when the API returns HTTP 500', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});
