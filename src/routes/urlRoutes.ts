import express from 'express';
import { shortenUrl, redirectToOriginalUrl } from '../controllers/urlController';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortId', redirectToOriginalUrl);

export default router;