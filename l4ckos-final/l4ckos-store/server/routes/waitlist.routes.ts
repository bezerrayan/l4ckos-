import { Router } from "express";
import { createWaitlistEntry } from "../controllers/waitlist.controller";

const router = Router();

router.post("/waitlist", createWaitlistEntry);

export default router;
