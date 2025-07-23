import type { RequestHandler } from "express";

import skillRepository from "./skillRepository";

const add: RequestHandler = async (req, res, next) =>{
    try{
        const newSkill = {
             nom:req.body.nom,
     logo:req.body.logo,
        };
        const insertId = await skillRepository.create(newSkill)
        res.status(201).json({ insertId });
    }catch(err){
        next(err)
    }
}
export default { add };