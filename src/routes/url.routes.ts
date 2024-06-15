import { Router } from 'express';
import { authMiddleware } from '../middleware/index.middleware';
import { deleteUrl, shortenUrl, redirectToUrl, getUrlsLogged, updateUrl } from '../controllers/index.controller'
const router = Router();

router.use(authMiddleware);
router.post('/shorten', shortenUrl);
router.get('/:shortUrl', redirectToUrl);
router.get('/urls/logged', getUrlsLogged);
router.put('/urls/:id', updateUrl);
router.delete('/urls/:id', deleteUrl);

export default router;
