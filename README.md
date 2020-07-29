## NGO Directory
An app to list all Non-Governmental/Non-Profit Organization across the world.

## Motivation
The project is created to help students learn about the basics of **backend web development**.
 
## Swagger UI
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596014447/swagger_zh3nw9.png" title="NGOdirectory" alt="NGOdirectory"></a>

## Tech/framework used

<b>Built with</b>
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Features
In this app:
- authenticated users can view list of all the NGO's (organizations)
- users who are of type ngo_admin can edit organization assigned to them
- an organization can have multiple ngo_admins

## Technical Requirements and Prerequisites

**Must have the following installed in your respective development machine (i.e. Linux, Mac, Windows)**

- NodeJS and NPM
- Visual Studio Code (as code editor)
- Postman
- Robo3t

Downloads Link

- NodeJS and NPM: https://nodejs.org/en/download/
<a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04"> Linux </a>
<a href="https://www.guru99.com/download-install-node-js.html"> Windows </a>
<a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos"> Mac </a>

- Visual Studio Code (as code editor): https://code.visualstudio.com/download
- Postman (as API tool): https://www.postman.com/downloads/
- Robo3t (MongoDB GUI): https://robomongo.org/download


## Installation
Clone the project:
```
git clone https://github.com/startechup-org/ngo-directory.git
```

Go to the project directory
```
cd ngo_directory
```

Install the packages and dependencies
```
npm install
```

Run the app
```
npm start
```

Check if the server is running at: `localhost:3000`


## API Reference
Please refer to the <a href="http://34.87.81.98:3000/api-docs/"> live swagger UI. </a>

## Models
- Organization
- User (types: user, ngo_admin, super_admin)

## Relationship
Many to Many
- a user can be an admin of multiple organizations
- an organization can have multiple admins

## License
MIT © [Startechup, Inc.]()
