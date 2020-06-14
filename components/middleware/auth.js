var admin = require("firebase-admin");


// required for configuring firebase admin sdk
var serviceAccount = {
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}

admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://hackportal-53efe.firebaseio.com"
})

const checkAuth =
        (req, res, next) => {
                console.log("auth token:",req.headers.authtoken)
                if (req.headers.authtoken) {
                        //only for testing
                        if(req.headers.authtoken=="test"){
                                req.userId = `xVw6qPV1zrhlT2D8U47FD7IZH5N2`
                                req.email = "vasumanhas000@gmail.com"
                                next()
                        }
                        else{
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
                        }
                } else {
                        res.status(403).send('Unauthorized')
                }
        }
// const signOut = (uid)=>{
//         console.log("signing out ",uid)
//         admin.auth().revokeRefreshTokens(uid)
// }
module.exports = {checkAuth}