import { Router } from "express";

import * as Controller from '../controllers/empController.js'

const router = Router();

router.route('/employee').get(Controller.allEmp)

router.route('/create').post(Controller.createEmp)

router.route('/employee/:empId').put(Controller.updateEmp)

router.route('/delete/:empId').delete(Controller.deleteEmp)

export default router;