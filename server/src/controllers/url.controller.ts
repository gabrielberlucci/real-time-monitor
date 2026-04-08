import { createUrl } from '@/services/url.service';
import type { Request, Response } from 'express';

export const url = async (req: Request, res: Response) => {
  try {
    const urlData = req.body;
    const userId = req.user.id;

    const url = await createUrl(urlData.urlLink, userId);

    res.status(200).send({
      message: 'Url created with success',
      urlData: url,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
    });
  }
};
