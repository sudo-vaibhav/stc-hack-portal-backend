const admin = require("firebase-admin")
const checkAuth =
        (req, res, next) => {
                if (req.headers.authtoken) {
                        admin.auth().verifyIdToken(req.headers.authtoken)
                                .then((decodedToken) => {
                                        console.log(decodedToken)
                                        next()
                                }).catch(() => {
                                        res.status(403).send({message:'Unauthorized'})
                                });
                } else {
                        res.status(403).send('Unauthorized')
                }
        }
const signOut = (uid)=>{
        admin.auth().revokeRefreshTokens(uid)
}
module.exports = {checkAuth,signOut}