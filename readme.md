# STC-HACKPORTAL-BACKEND

>Repo for the REST API related to the STC HackPortal using Node.js
 
-```npm i nodemon```
-```nodemon app.js``` _This gets the server running_

## Routes

- Users
- Events
- Teams
- Signout

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
  - githubLink 
  - stackOverflowLink 
  - externalLink 
  - teams (an array of teams the user is a part of)
  - invites ( an array of invites the user has recieved)
                

* **URL**

  /users/getuserprofile

* **Method:**

  `GET`

2. **Add User**
----
  Adds User Data to the Database, the data required includes:
  
  - name
  - college
  - expectedGraduation
  - bio
  - skills (optional)
  - githubLink (optional)
  - stackOverflowLink (optional)
  - externalLink (optional)


* **URL**

  /users/setprofile

* **Method:**

  `POST`
  
 3. **Accepting an Invite**
----
  Adds the user Id to the "members of the team", Removes the user Id from the "teams pending requests", Adds the team Id to the "teams of the user" and Removes the team Id from the "users invites". Data required includes:
  
  - teamId (id of the team that sent the invite)

* **URL**

  /users/acceptinvite

* **Method:**

  `POST`
  
4. **Rejecting an Invite**
----
  Removes the team Id from the "teams pending requests" and Removes the team Id from the "users invites". Data required includes:
  
  
  - teamId (id of the team that sent the invite)

* **URL**

  /users/rejectinvite

* **Method:**

  `POST`
  
 
#### Events

1. **Show Event**
----
  Returns the data related to every event present in the database,i.e 
  
  - _id, 
  - creatorId(id of the event creator),
  - startDate, 
  - endDate, 
  - location, 
  - nameOfEvent, 
  - description, 
  - eventUrl
  - minimumTeamSize
  - maximumTeamSize

* **URL**

  /events/getevents

* **Method:**

  `GET`

2. **Show Specific Event**
----
  Returns Id specific data related to a event,i.e 
  
  - _id, 
  - creatorId(id of the event creator),
  - startDate, 
  - endDate, 
  - location, 
  - nameOfEvent, 
  - description, 
  - eventUrl
  - minimumTeamSize
  - maximumTeamSize

* **URL**

  /events/aboutevent/:Id

* **Method:**

  `GET`
  
 3. **Add Event**
----
  Adds a Event to the Database, data required includes: 
  
  - startDate
  - endDate
  - location 
  - nameOfEvent 
  - description (optional) 
  - eventUrl (optional)
  - minimumTeamSize
  - maximumTeamSize

 
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
  - eventId(this refers to the event the team is a part of), 
  - description (team description) 
  - members (array of members)
  - pendingRequests ( array of pending requests sent to users)
  - skillsRequired (array of skills required)
  - 

* **URL**

  /teams/:teamId

* **Method:**

  `GET`
  
 2. **Add Team**
----
  Adds a Team into the database with the following details: 
  
  - teamName, 
  - eventId (this refers to the event the team is a part of)
  - description (team description) (optional)
  - skillsRequired (array of skills required)

* **URL**

  /teams/setteam

* **Method:**

  `POST`
 
  3. **Send an Invite to a User**
----
  As an Admin(Creator of the team), you can send an invite to a user to join your team,on doing so the invitee's Id will be added to the "teams pending requests" and the team's Id will be added to the "users invites" ,required data includes: 
  
  - inviteeEmail (Email Id of the invitee) 
  - teamId ( Id of the Team)

* **URL**

  /teams/sendinvite

* **Method:**

  `POST`
  
  4. **Cancel an Invite to a User**
----
  As an Admin(Creator of the team), you can cancel the invite you sent to a User, on doing so, the invitee's Id will be removed from the "teams pending requests" and the team's Id will be removed from  the "users invites" ,required data includes: 
  
  - inviteeEmail (Email Id of the invitee) 
  - teamId ( Id of the Team)


* **URL**

  /teams/cancelinvite

* **Method:**

  `POST`
  
   5. **Remove Member from the Team**
----
  As an admin, you can remove a member from the team, on doing so the member's Id will be removed from the "teams members" and the team's Id will be removed from the "users teams", required data includes:
  
 - inviteeEmail (Email Id of the Member) 
 - teamId ( Id of the Team)
 
* **URL**

  /teams/removemember

* **Method:**

  `POST`
  
#### Signout

 1. **Signout**
----
  Signout from the portal:
  
* **URL**

  /signout/

* **Method:**

  `GET`
 

 


 
