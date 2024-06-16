import { Router } from 'express';
import { authMiddleware } from '../middleware/index.middleware';
import { deleteUrl, shortenUrl, redirectToUrl, listUrl, updateUrl } from '../controllers/index.controller'

const router = Router();

router.use(authMiddleware);

router.get('/list', listUrl);
router.put('/:id', updateUrl);
router.delete('/:id', deleteUrl);

router.post('/shorten', shortenUrl);
router.get('/:shortUrl', redirectToUrl);

export default router;
