/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Veterinary:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - nationalId
 *         - phoneNumber
 *         - province
 *         - district
 *       properties:
 *         fullName:
 *           type: string
 *           description: Name of the veterinary
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Email of the veterinary
 *           example: john.doe@example.com
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the veterinary
 *           example: +1234567890
 *         nationalId:
 *           type: number
 *           description: National ID of the veterinary
 *           example: 123456789
 *         province:
 *           type: string
 *           description: Province of the veterinary
 *           example: prov1
 *         district:
 *           type: string
 *           description: District of the veterinary
 *           example: distr1
 */

/**
 * @swagger
 * tags:
 *   - name: SystemStatistics
 *     description: The statistics of whole system managing API
 *   - name: VeterinaryStatistics
 *     description: The statistics of specific district managing API
 *   - name: MCCStatistics
 *     description: The statistics of specific sector managing API
 *   - name: Veterinary
 *     description: The veterinary managing API
 * /mpas/veterian/vet/allVets:
 *   get:
 *     summary: List of all veterinaries
 *     tags:
 *       - Veterinary
 *     responses:
 *       200:
 *         description: This is the veterinary list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veterinary'
 */
/**
 * @swagger
 *
 * /mpas/veterian/vet/addVet:
 *   post:
 *     summary: Create a veterinary
 *     tags:
 *       - Veterinary
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *     responses:
 *       200:
 *         description: This Veterinary is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /mpas/veterian/vet/updateVet:
 *   patch:
 *     summary: Update veterinarian
 *     tags:
 *       - Veterinary
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
 *             $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *     responses:
 *       '200':
 *         description: Veterinarian updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * /mpas/veterian/vet/removeVet:
 *   delete:
 *     summary: Remove veterinarian
 *     tags:
 *       - Veterinary
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Veterinarian deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
/**
 * @swagger
 * /mpas/veterian/vet/findVet:
 *   get:
 *     summary: Find veterinarian by ID
 *     tags:
 *       - Veterinary
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Veterinarian is found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'  # Corrected schema reference to match the case
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */

const express = require("express");
const { verifyToken } = require("../middlewares/tokenVerification");
const {
  addVeterian,
  removeVeterinary,
  findVeterinaryById,
  listOfVeterinary,
  updateVeterinary,
} = require("../controller/admin.controller");
const { systemQuantity } = require("../controller/Statistics/systemQunatity");
const { DailyQuantity } = require("../controller/Statistics/dailyStatistics");
const {
  monthlyQuantity,
} = require("../controller/Statistics/monthlyStatistics");
const {
  DistrictDailyQuantity,
} = require("../controller/Statistics/districtDailyStatistics");
const {
  DistrictMonthlyQuantity,
} = require("../controller/Statistics/DistrictMonthlyStatistics");
const {
  SectorDailyQuantity,
} = require("../controller/Statistics/sectorDailyStatistics");
const {
  SectorMonthlyQuantity,
} = require("../controller/Statistics/sectorMonthlyStatistics");

const adminRouter = express.Router();

adminRouter.post("/addVet", verifyToken, addVeterian);
adminRouter.delete("/removeVet", verifyToken, removeVeterinary);
adminRouter.get("/findVet", findVeterinaryById);
adminRouter.get("/allVets", listOfVeterinary);
adminRouter.patch("/updateVet", updateVeterinary);

/**
 * @swagger
 * /mpas/veterian/vet/systemStatistics:
 *   get:
 *     summary: Find total quantity of system
 *     tags:
 *       - SystemStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get("/systemStatistics", verifyToken, systemQuantity);

/**
 * @swagger
 * /mpas/veterian/vet/dailyStatistics:
 *   get:
 *     summary: Find total quantity of system within a week
 *     tags:
 *       - SystemStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get("/dailyStatistics", verifyToken, DailyQuantity);

/**
 * @swagger
 * /mpas/veterian/vet/monthlyStatistics:
 *   get:
 *     summary: Find total quantity of system within a previous 12 months
 *     tags:
 *       - SystemStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get("/monthlyStatistics", verifyToken, monthlyQuantity);

/**
 * @swagger
 * /mpas/veterian/vet/districtMonthlyStatistics:
 *   get:
 *     summary: Find total quantity of district within a previous 12 months
 *     tags:
 *       - VeterinaryStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get(
  "/districtMonthlyStatistics",
  verifyToken,
  DistrictMonthlyQuantity
);

/**
 * @swagger
 * /mpas/veterian/vet/districtDailyStatistics:
 *   get:
 *     summary: Find total quantity of district within a week
 *     tags:
 *       - VeterinaryStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get("/districtDailyStatistics", verifyToken, DistrictDailyQuantity);

/**
 * @swagger
 * /mpas/veterian/vet/sectorDailyQuantity:
 *   get:
 *     summary: Find total quantity of sector within a week
 *     tags:
 *       - MCCStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get("/sectorDailyQuantity", verifyToken, SectorDailyQuantity);

/**
 * @swagger
 * /mpas/veterian/vet/sectorMonthlyQuantity:
 *   get:
 *     summary: Find total quantity of sector within previous 12 months
 *     tags:
 *       - MCCStatistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Data  found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinary'
 *       '500':
 *         description: Some server error
 *       '400':
 *         description: Bad request
 */
adminRouter.get("/sectorMonthlyQuantity", verifyToken, SectorMonthlyQuantity);

module.exports = adminRouter;
