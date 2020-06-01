const port = process.env.PORT || 3000

const express = require("express")
const app = express()

//for parsing various types of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// for allowing front end to send requests to api
const cors = require('cors')
app.use(cors())

//for accessing secret variables
require("dotenv").config()
const {checkAuth,signOut} = require("./components/auth")

const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://hackportaldbUser:asHw5WBHLO1IV77x@stc-hack-portal-backend-jo4iu.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        console.log("db connected")
        app.post("/setprofile",checkAuth,(req,res)=>{
                console.log("received set profile request for ", req.userId)
                const {bio,name,skills,college,externalLink} = req.body
        
                const User = require("./components/models/User")
        
                User.findOne({_id: req.userId },(err, user)=>{
                        if(err){
                                console.log("Error in finding user",err)
                        }else{
                                console.log(user)
                        }
                })
        
        })
});


var admin = require("firebase-admin");

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

app.get("/",checkAuth,(req,res)=>{
        res.status(200).send({message:"success"})
})


app.get("/signout",checkAuth,(req,res)=>{
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
app.listen(port,()=>{
        console.log(`server started on port ${port}`)
})
