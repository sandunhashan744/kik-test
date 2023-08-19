import { Router } from "express";

import * as Controller from '../controllers/empController.js'

const router = Router();

router.route('/employee').get(Controller.allEmp) //get all employee

router.route('/employee/:empId').get(Controller.getEmp) //get emp by id

router.route('/create').post(Controller.createEmp) // create new        

router.route('/employee/:empId').put(Controller.updateEmp) //update emp

router.route('/delete/:empId').delete(Controller.deleteEmp) //delete emp

export default router;