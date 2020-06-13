const admin = require("firebase-admin")
const checkAuth =
        (req, res, next) => {
                console.log("auth token:",req.headers.authtoken)
                if (req.headers.authtoken) {
                        admin.auth().verifyIdToken(req.headers.authtoken)
                                .then((decodedToken) => {
                                        console.log("decoded token",decodedToken)
                                        req.userId = decodedToken.user_id
                                        req.email = decodedToken.email
                                        next()
                                }).catch(() => {
                                        console.log("some problem with token. Unable to decode")
                                        res.status(403).send({message:'Unauthorized'})
                                });
                } else {
                        res.status(403).send('Unauthorized')
                }
        }
const signOut = (uid)=>{
        console.log("signing out ",uid)
        admin.auth().revokeRefreshTokens(uid)
}
module.exports = {checkAuth,signOut}