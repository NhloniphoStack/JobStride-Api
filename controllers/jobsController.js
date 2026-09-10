import { db } from "../db/db.js"



export async function getJobs(req, res){

    const userID = req?.session?.userID

    const dbData = await db.query('SELECT * FROM jobs WHERE user_id = $1', [userID])

    const jobs = dbData?.rows

    if(!jobs){
        return res.json({message: 'There are no Jobs!'})
    }

    return res.json(jobs)
}

export async function addJob(req, res){
    
    const {company, role, location, job_url, status, date, notes} = req.body

    const userID = req.session.userID

    if(!company || !role || !location || !job_url || !status || !date){
        return res.status(400).json({error: 'All fields are required to add job'})
    }

    await db.query(`INSERT INTO jobs (company, role, location, job_url, status, date, notes, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [company, role, location, job_url, status, date, notes, userID])

    console.log("info added")

    return res.json({message: 'Job added!'})
}


export async function getJob(req, res){
    
    let { jobid } = req.params  ///{jobid: 04}

    jobid = parseInt(jobid)
    

     if(Number.isNaN(jobid)){
        return res.status(400).json({message: "Invalid id input"})
    }


    
    const jobData = await db.query('SELECT * FROM jobs WHERE id = $1', [jobid])
    const job = jobData?.rows[0]

    return res.json(job)
}

export async function deleteJob(req, res){
    let { jobid } = req.params

    
    jobid = Number(jobid)
    console.log("jobid:", jobid)

    if(Number.isNaN(jobid)){
        return res.status(400).json({error: "Invalid id input"})
    }


    
    const existing = await db.query('SELECT * FROM jobs WHERE id = $1', [jobid])

   const dbJob = existing.rows[0]

    if(!dbJob){
        return res.json({error: "Theres no such job!, job may already be deleted"})
    }

     
     await db.query(`DELETE FROM jobs WHERE id = $1`, [jobid])

     return res.json({message: "Job deleted!"})

    
   
}

export async function editJob(req, res){
    console.log("attempted to edit")
    const { jobid }  = req.params

 console.log("jobid:", jobid)

    let { location, date, job_url, notes } = req.body

    if(!location || !date || !job_url || !notes){
        return res.status(400).json({error: "All fields are required!"})
    }

    const userID = req?.session?.userID

    const jobData = await db.query('SELECT * FROM jobs WHERE id = $1', [jobid])
    
    const job = jobData?.rows[0]

    if(!job){
        return res.json({message: "There's no such job"})
    }

    const edit = await db.query('UPDATE jobs SET location = $1, date = $2, job_url = $3, notes = $4 WHERE user_id = $5 AND id = $6', [location, date, job_url, notes, userID, jobid])

    return res.json({message: "Job edited!"})

}

