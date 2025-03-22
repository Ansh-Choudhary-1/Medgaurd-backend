import {Router} from 'express';
import { createPatient , fetchPatient , addLab} from '../controllers/patient.controllers.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();


router.route("/create-patient").post(createPatient);
router.route("/fetch-patient").get(fetchPatient);
router.route("/lab-addittion").post(upload.single("xrayImage"),addLab);
//router.route("icu-addition").post();

export default router