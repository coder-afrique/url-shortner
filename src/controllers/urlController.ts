import { Request, Response } from 'express';
import shortid from 'shortid';
import Url from '../models/urlModel';

export const shortenUrl = async (req: Request, res: Response): Promise<void> => {
  const { originalUrl } = req.body;

  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      res.json(url);
    } else {
      const shortId = shortid.generate();
      url = new Url({
        originalUrl,
        shortId,
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (url) {
      url.clicks++;
      await url.save();
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};