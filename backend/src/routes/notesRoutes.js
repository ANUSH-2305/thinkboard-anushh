import express from "express"; 
import { createNode, deleteAllNodes, getAllNodes, updateNode, getNodeById } from "../controllers/noteController.js";

const router = express.Router();

router.get("/",getAllNodes);

router.get("/:id",getNodeById);

router.post("/",createNode);


router.put("/:id",updateNode);


router.delete("/:id",deleteAllNodes );


export default router;

 