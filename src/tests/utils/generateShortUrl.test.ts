import { generateShortUrl } from '../../utils/generateShortUrl';

describe('generateShortUrl function', () => {
    it('should generate a string of length 6', () => {
        const result = generateShortUrl();
        expect(result).toHaveLength(6);
    });

    it('should generate a string consisting of alphanumeric characters', () => {
        const result = generateShortUrl();
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        expect(alphanumericRegex.test(result)).toBe(true);
    });
});
