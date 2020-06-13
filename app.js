const port = process.env.PORT || 3000

const express = require("express")
const app = express()

//MongoDb Atlas and mongoose
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://hackportaldbUser:'+ process.env.SECRETKEY+ '@stc-hack-portal-backend-jo4iu.gcp.mongodb.net/hack-portal?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})


//for parsing various types of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for allowing front end to send requests to api
const cors = require('cors')
app.use(cors())

//for using route directories
const EventRoutes = require("./components/routes/events")
const TeamRoutes = require("./components/routes/teams")

//for using and assigning prefixed routes
app.use('/api/hackathons', EventRoutes);
app.use('/api/teams', TeamRoutes);

//Error Handling
app.use((req,res,next) =>
{
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
})

app.use((error,req,res,next) => {
  res.status(error.status || 500);
  res.json({
    error: {
        status: error.status,
      message: error.message
    }
  })
})

//for accessing secret variables
require("dotenv").config()
const {checkAuth,signOut} = require("./components/auth")



var admin = require("firebase-admin");

var serviceAccount = {
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
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

app.get("/signout",(req,res)=>{
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
