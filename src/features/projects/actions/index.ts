"use server";

import { project } from "@/db/schema";
import { getDbAsync } from "@/lib/db";

const createProject = async (payload) => { 
    try{
        const db = await getDbAsync();
        const data = await db.insert(project).values(payload);
        
        if(data?.error){
           throw Error(`Error creating project: ${data.error}`);
        }

        return data;
    }
    catch(error){
        throw error;
    }
}


export { createProject };