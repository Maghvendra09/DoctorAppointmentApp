import express,{Router} from 'express'
import authMiddleware from "../middlewares/auth.middleware.js";
import { getAllDoctorsController, getAllUsersController,changeAccountStatusController, changeAccountStatusRejectController } from '../controllers/admin.controller.js';

const routers = Router()

routers.get('/getAllUsers',authMiddleware,getAllUsersController)

routers.get('/getAllDoctor',authMiddleware,getAllDoctorsController)

routers.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

routers.post('/changeAccountStatusReject',authMiddleware,changeAccountStatusRejectController)
export default routers