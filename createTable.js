import { db } from "./db/db.js";



async function createTable(){
    


    await db.query(`CREATE TABLE jobs (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        company VARCHAR(60) NOT NULL,
        role VARCHAR(60) NOT NULL,
        location VARCHAR(30) NOT NULL,
        job_url TEXT NOT NULL,
        user_id INTEGER,
        status TEXT NOT NULL,
        date DATE NOT NULL,
        notes VARCHAR(200),
        FOREIGN KEY(user_id) REFERENCES users(id)
        )`) 

     /*   await db.query(`
            INSERT INTO users (name,  username, password, email)
            VALUES ('test', 'test', 'test', 'test@test.com')
            ;`)  */


        console.log("Info inserted")
}

createTable()



