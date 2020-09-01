# Hector Kichen Test App

## About

I decided to use the recommended environment as I thought it would be fun to learn how to use Express and I was already comfortable with React. To make the data persist after refreshes, I attached this to a PostgreSQL database. The database name is *hectorkitchen* and has password *test123*. There's no confidential information here so don't worry about keeping the password secure. I have made a number of similar apps in the past but didn't want to copy any of my previous content.

## Installation

Make sure you have npm and PostgreSQL installed.

After cloning the repository enter `npm i` into the root directory of your terminal to install the necessary packages for this app. If any packages are missing still, install them by typing `npm i --save <package_name>`. Eg. `npm i --save express-generator`. You'll need React, Express, nodemon, bootstrap. After this, type `npm build` to build the app.

To run the app move to the express-static-serve\react-app\server folder and enter `npm start` in the terminal. The app will be running on http://localhost:5000/.

## Comments

Some of the CRUD functionality was repeated for authors and books although I found it unnecessarily complicated (and almost tightly coupling) to add a general details component and a general list component. I also added in delete functionality, although not requested, it seemed natural that it should be included. Although no filtering functionality was added, the select option for book authors and the display of the books written by an author warrant some credit in my opinion.

If I were to expand on this app, I would add in user profiles and authentication. Furthermore, I would incorporate unit and integration testing, first for the UI and later if any complex logic is added. Also, database configuration details would be in a separate file, removed from version control.

I would be more than happy to accept feedback and consider any changes you suggest and make sure to email me any questions or bugs you encounter at [killian.dunne97@gmail.com](mailto:killian.dunne97@gmail.com). Thanks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
