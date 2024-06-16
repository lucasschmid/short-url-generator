import { Url } from '../models/index.model';
import { generateShortUrl } from '../utils/generateShortUrl';

export async function shortenUrl(originalUrl: string, userId: number | null) {
  const shortUrl = generateShortUrl();
  
  try {
    const { BASE_URL } = process.env;
    const url = await Url.create({ originalUrl, shortUrl, userId });
    return `${BASE_URL}/${url.shortUrl}`;
  } catch (error) {
    throw new Error('Failed to shorten URL');
  }
}