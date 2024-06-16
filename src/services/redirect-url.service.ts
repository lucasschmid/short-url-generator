import { Url } from '../models/index.model';

export async function redirectToUrl(shortUrl: string) {
  try {
    const url = await Url.findOne({ where: { shortUrl, deletedAt: null } });

    if (!url) {
      throw new Error();
    }

    url.click += 1;
    await url.save();

    return url.originalUrl;
  } catch (error) {
    throw new Error('Failed to redirect to URL');
  }
}