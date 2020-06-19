# STC-HACKPORTAL-BACKEND

>Repo for the REST API related to the STC HackPortal using Node.js
 
-```npm i nodemon```
-```nodemon app.js``` _This gets the server running_

## Routes

- Users
- Events
- Teams

### Operation of Routes

#### Users

1. **Show User**
----
  Returns data regarding the profile of a user,i.e, 
  - _id
  - name
  - email
  - college
  - expectedGraduation
  - bio
  - skills (an array of skills the user has)
  - githubLink, 
  - stackOverflowLink, 
  - externalLink.
  - teams (an array of teams the user is a part of)
                

* **URL**

  /users/getprofile

* **Method:**

  `GET`

2. **Add User**
----
  Adds User Data to the Database, the data includes:
  
  - name
  - college
  - expectedGraduation
  - bio
  - skills
  - githubLink
  - stackOverflowLink 
  - externalLink
  - teams.

* **URL**

  /users/setprofile

* **Method:**

  `POST`
  
#### Events

1. **Show Hackathon**
----
  Returns the data related to every hackathon present in the database,i.e 
  
  - _id, 
  - creatorId(id of the hackathon creator),
  - startDate, 
  - endDate, 
  - location, 
  - nameOfEvent, 
  - description, 
  - eventUrl

* **URL**

  /events/getevent

* **Method:**

  `GET`

2. **Show Specific Hackathon**
----
  Returns Id specific data related to a hackathon,i.e 
  
  - _id, 
  - creatorId(id of the hackathon creator),
  - startDate, 
  - endDate, 
  - location, 
  - nameOfEvent, 
  - description, 
  - eventUrl

* **URL**

  /events/aboutevent/:Id

* **Method:**

  `GET`
  
 3. **Add Hackathon**
----
  Adds a Hackathon to the Database, with the following data: 
  
  - startDate, 
  - endDate, 
  - location, 
  - nameOfEvent, 
  - description, 
  - eventUrl

 
* **URL**

  /events/setevent

* **Method:**

  `POST`
  
#### Teams

1. **Show Specific Team**
----
  Returns data related to an Id specific Team,i.e 
  
  - _id
  - creatorId,(this refers to the creator of the team) 
  - teamName 
  - hackathonId(this refers to the hackathon the team is a part of), 
  - description (team description)
  - members (array of members)
  - skillsrequired (array of skills required)

* **URL**

  /teams/:Id

* **Method:**

  `GET`
  
 2. **Add Team**
----
  Adds a Team into the database with the following details: 
  
  - teamName, 
  - hackathonId(this refers to the hackathon the team is a part of), 
  - description,(team description)
  - members ( array of members)
  -skillsrequired (array of skills required)

* **URL**

  /teams/setteam

* **Method:**

  `POST`


 