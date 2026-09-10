import { db } from '../db/db.js'
import validator from 'validator'

export async function login(req, res){
   console.log("attempt to login")
    let {username, password} = req.body
    

    if(!username || !password){
        return res.status(400).json({error: 'All fields are required!' })
    }

    
    
    username = username.trim()

    const dbData = await db.query(`SELECT * FROM users WHERE username = $1;`, [username])
   
    const dbUsername = dbData?.rows[0]?.username

    

    if(!dbUsername){
        return res.status(400).json({error: "Invalid user, please signup"})
    }

    const dbPasswordData = await db.query(`SELECT password FROM users WHERE username = $1;`, [username])
    
    const dbPassword = dbPasswordData?.rows[0]?.password

    if(dbPassword !== password){
      return res.status(400).json({error: "Password doesnt match!"})
    }

    const userID = dbData?.rows[0]?.id

    req.session.userID = userID

   
    
    return res.json({message: "Login successful"})


    

    
}


export async function signup(req, res){
    let {name, created_at, username, password, email} = req.body

    if(!username || !name || !password || !email || !created_at){
        return res.status(404).json({error: "All fields are required!"})
    }

    const checkEmail = validator.isEmail(email)

    if(!checkEmail){
        return res.status(400).json({error: 'Invalid email format'})
    }

    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)){
        return res.status(400).json({error: 'Invalid username format'})
    }

    name = name.trim();
    username = username.trim()
    email = email.trim()
    
    const existingData  = await db.query(`SELECT * FROM users WHERE username = $1`, [username])

    const existing = existingData?.rows[0]

    if(existing){
        return res.status(400).json({error: 'Account already exist for this user'})
    }

    


   const results = await db.query(`INSERT INTO users (name, username, password, email, created_at)
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id
        `, [name, username, password, email, created_at])

     const userID = results?.rows[0]?.id
     

     req.session.userID = userID


   return res.json({message: "Signup successful!"})


}


export async function logout(req, res){
    req.session.destroy((err) => {
        if(err){
        return res.status(400).json({error: "Failed to Logout"})
    }
        res.clearCookie('connect.sid')

    return res.json({message: "Logout successful"})

    })

    
}