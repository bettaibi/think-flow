"use server";

import { project } from "@/db/schema";
import { withServerAuth } from "@/hof/withServerAuth";
import { getDbAsync } from "@/lib/db";

const createProject = withServerAuth(async (session, payload) => { 
    try{
        const db = await getDbAsync();
        const data = await db.insert(project).values(payload);

        if(data?.error){
           throw new Error(`Error creating project: ${data.error}`, {cause: 403});
        }

        return data;
    }
    catch(error){
        throw error;
    }
});

export { createProject };