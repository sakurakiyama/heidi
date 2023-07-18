import express from 'express';
const router = express.Router();
import aiController from '../controllers/aiController/index.js';

router.post('/askHeidi', aiController.askHeidi, (req, res) => {
  return res.status(200).json(res.locals.review);
});

export default router;
