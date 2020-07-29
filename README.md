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
- Visual Studio Code
- Postman
- Robo3t

**Downloads Link**

- NodeJS and NPM: https://nodejs.org/en/download/

> <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04"> Linux </a>
> <a href="https://www.guru99.com/download-install-node-js.html"> Windows </a>
> <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos"> Mac </a>

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

## Using your own cloud hosted database 
**MongoDB Atlas Setup**

This app uses MongoDB Atlas, which is a fully-managed cloud database. In case of wanting to use your own database instance with MongoDB Atlas to store your data, please follow the instructions below:

**Account Creation and Cluster Setup**
- Sign up for an account in MongoDB: https://account.mongodb.com/account/register
- Select **Shared Clusters** which is the Free plan, then click **Create a cluster**
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596030548/atlas-1_vayl5w.png">

- Set the **Cloud Provider** and **Region**. In the example, AWS is chosen and on Singapore region (since its close to Philippines). Please select the region close to your country. The other default settings are initially chosen for the Free plan. Click **Create Cluster** afterwards.
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596030594/atlas-2_real_f9mslk.png">

- Wait while your cluster is being provisioned. This may take a while.
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596030672/atlas-3_ozwdjy.png">

- After your cluster is provisioned, click on **Collections**
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596032007/atlas4_lusvuj.png">

- Next, click **Add My Own Data**
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596032092/atlas5_fbhhsw.png">

- Create your database and your collection.
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596032205/atlas6_xzpuyw.png">

- The Atlas Database Dashboard (under the collections tab) will be shown
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596032259/atlas7_zrfd82.png">

**Retrieving the Database Connection String**
- In this part, we should connect to our Atlas Database, navigate again to your cluster dashboard and click on **Connect**
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596032007/atlas4_lusvuj.png">

- In **Connect to Cluster**, select **Allow Access from Anywhere**
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596032976/atlas8_gfs0vk.png">

- Add a whitelist api and create the database user
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596033131/atlas8-real2_ckxyww.png">
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596033276/atlas-9_ixlnjz.png">

- After this, **Choose a connection method** and select **Connect your application**
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596033318/atlas10_pw2vdo.png">

- Copy the connection string. Remember to replace the '<password>' with your database user password and '<dbname>' with the database that will be used.
```
mongodb+srv://admin:<password>@cluster0.soffw.mongodb.net/<dbname>
```
<img src="https://res.cloudinary.com/dymspxfgk/image/upload/v1596033370/atlas11_zbykgy.png">

- Open .env file from the source code and replace the 'MONGO_URI' value with your connection string.
```
MONGO_URI=<your mongodb atlas connection string here>
```
- Test if you can connect and insert data into your new cloud database instance.

## Relationship
Many to Many
- a user can be an admin of multiple organizations
- an organization can have multiple admins

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
