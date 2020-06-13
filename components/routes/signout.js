var admin = require("firebase-admin");
const Router = require("express").Router()

Router.get("/",(req,res)=>{
        admin.auth().verifyIdToken(req.headers.authtoken)
        .then((decodedToken) => {
                console.log(decodedToken)
                admin.auth().revokeRefreshTokens(decodedToken.uid)
                .then(()=>{
                        console.log("refresh tokens revoked for ",decodedToken.uid)
                        res.status(200).send({message:"signed out"})
                })
        })  
})
module.exports = Router