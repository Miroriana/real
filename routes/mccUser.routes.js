/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     mccUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phoneNumber
 *         - nationalId
 *         - sector
 *       properties:
 *         fullName:
 *           type: string
 *           description: Name of the MCC user
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Email of the MCC user
 *           example: john.doe@example.com
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the MCC user
 *           example: +1234567890
 *         nationalId:
 *           type: number
 *           description: National ID of the MCC user
 *           example: 123456789
 *         sector:
 *           type: number
 *           description: sector of the MCC user
 *           example: sec1
 */

/**
 * @swagger
 * tags:
 *   name: mccUser
 *   description: The mcc user managing API
 */

/**
 * @swagger
 * /mpas/mccUser/addMccUser:
 *   post:
 *     summary: Create a mcc
 *     tags:
 *       - mccUser
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/mccUser'
 *     responses:
 *       200:
 *         description: This mcc is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/mccUser'
 *       500:
 *         description: Some server error
 */

const express = require("express");
const {
  addMccUser,
  removeMccUser,
  findMccUserById,
  listOfMccUser,
  updateMccUser,
} = require("../controller/mccUser.controller");
const { verifyToken } = require("../middlewares/tokenVerification");

const mccUserRouter = express.Router();

mccUserRouter.post("/addMccUser", verifyToken, addMccUser);
mccUserRouter.delete("/removeMccUser", removeMccUser);
mccUserRouter.get("/findMccUser", findMccUserById);
mccUserRouter.get("/allMccUser", listOfMccUser);
mccUserRouter.patch("/updateMccUser", updateMccUser);

module.exports = mccUserRouter;
