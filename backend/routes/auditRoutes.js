import express from "express";

import {
  generateSummary,
  getAudits,
  getAuditById,
  saveLead,
} from "../controllers/auditController.js";

const router = express.Router();

router.post(
  "/generate-summary",
  generateSummary
);

router.get("/audits", getAudits);
router.get("/audit/:id", getAuditById);
router.post("/lead", saveLead);

export default router;