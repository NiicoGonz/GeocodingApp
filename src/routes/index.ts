import { Router } from "express";
const router = Router();

import {getUsers, getUserbyId, createUser, updateUser, deleteUser,getGeolocation} from '../controllers/index.controllers';

router.get('/users', getUsers);
router.get('/users/:id',getUserbyId);
router.post('/CreateUser',createUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id', deleteUser);
router.get('/geocoding',getGeolocation);

export default router;