

export async function requireAuth(req, res, next){

    if(!req?.session?.userID){
        return res.json({message: 'Unauthorized user!'})
    }
    
    next()
}