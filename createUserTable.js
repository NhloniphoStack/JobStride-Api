import { db } from "./db/db.js";


async function createUserTable(){

    try{

        await db.query('CREATE TABLE users ( id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name TEXT NOT NULL, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, email TEXT NOT NULL, created_at DATE NOT NULL)'
    )

     console.log("users  table created")

    }catch(err){
        console.log(err)
    }finally{
        await db.end()
    }
    
    

   
}


createUserTable()