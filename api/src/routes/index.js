import express from 'express';
import itemRoutes from './itemRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/items', itemRoutes);

export default router;
