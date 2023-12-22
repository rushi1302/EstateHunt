import express from 'express'
// import { verifyToken } from '../utils/verifyToken.js';
import { createListing } from '../controllers/list.controller.js';

const router = express.Router();

router.post('/create', createListing)

export default router;