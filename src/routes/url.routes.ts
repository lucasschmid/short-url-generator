import { Router } from 'express';
import { authMiddleware } from '../middleware/index.middleware';
import { deleteUrl, shortenUrl, redirectToUrl, listUrl, updateUrl } from '../controllers/index.controller'
const router = Router();

router.use(authMiddleware);
router.post('/shorten', shortenUrl);
router.get('/:shortUrl', redirectToUrl);
router.get('/urls/list', listUrl);
router.put('/urls/:id', updateUrl);
router.delete('/urls/:id', deleteUrl);

export default router;
