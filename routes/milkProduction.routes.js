/**
 * @swagger
 * components:
 *   schemas:
 *     milkProduction:
 *       type: object
 *       required:
 *         - email
 *         - quantity
 *       properties:
 *         email:
 *           type: string
 *           description: email of the farmer
 *           example: farmer@example.com
 *         quantity:
 *           type: number
 *           description: Quantity of milk production
 */
/**
 * @swagger
 * tags:
 *   - name: milkProduction
 *     description: The milkProduction managing API
 * /mpas/milkProduction/allMilkProductions:
 *   get:
 *     summary: List of all milkProduction
 *     tags:
 *       - milkProduction
 *     responses:
 *       200:
 *         description: This is the milkProduction list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/milkProduction'
 */
/** 
 * @swagger

 * /mpas/milkProduction/addMilkProduction:
 *   post:
 *     summary: Create a milkProduction
 *     tags:
 *       - milkProduction
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/milkProduction'
 *     responses:
 *       200:
 *         description: This milkProduction is created
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       500:
 *         description: Some server error
*/

/**
 * @swagger
 * /mpas/mcc/updateMcc:
 *   patch:
 *     summary: Update milkProduction
 *     tags:
 *       - milkProduction
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/milkProduction'
 *     responses:
 *       '200':
 *         description: milkProduction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger

 * /mpas/milkProduction/deleteMilkProduction:
 *   delete:
 *     summary: removing a milkProduction
 *     tags:
 *       - milkProduction
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/milkProduction'
 *     responses:
 *       '200':
 *         description: milkProduction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /mpas/mcc/findMcc:
 *   get:
 *     summary:  Find milkProduction by ID
 *     tags:
 *       - milkProduction
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: milkProduction is found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/milkProduction'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

const express = require("express");
const router = express.Router();
const {
  listOfmilkProduction,
  findmilkProductionById,
  removemilkProduction,
  addmilkProduction,
  updatemilkProduction,
} = require("../controller/milkProduction.controller");
const { verifyToken } = require("../middlewares/tokenVerification");

router.post("/addMilkProduction", verifyToken, addmilkProduction);
router.delete("/deleteMilkProduction", removemilkProduction);
router.get("/findMilkProduction", findmilkProductionById);
router.get("/allMilkProductions", listOfmilkProduction);
router.put("/updateMilkProduction", updatemilkProduction);

module.exports = router;
