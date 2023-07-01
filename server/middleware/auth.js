import jwt from 'jsonwebtoken';

/** in middleware, next function is what we need to use */
/** AUTHORISATION : what u want to do after u signed in */
export const verifyToken = async(req, res , next) => {
    try{
        let token = req.header("Authorization"); /* frontend will be setting it */
        /* look at jwt documentation */

        if (!token){
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")){
            token = token.slice(7 , token.length).trimLeft();
        }

        const verified = jwt.verify(token , process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
}