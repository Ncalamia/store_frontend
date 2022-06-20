# Essentials - Frontend

## App Production & Deployment Timeline - June 13th, 2022 - June 20th, 2022

##  Collaborators: Nikki Calamia, Yulia Glushenko, Jacqueline Schmidt

##  Tech: 

This app was built using the following stack: SQL (PostgreSQL), Django, React, Node.js

##  App Background & User stores: 

Programmed and deployed a full-stack application that demonstrates the understanding of RESTful routes (CRUD - create, read, update, and delete). Our app was designed to depict an ecommerce store specific to homegoods and decor. 

The app is a single page application (SPA) that will render different views depending on the user interactions. The default view is our 'welcome' page which allows users to 'read' (the R in CRUD) the products that our fictional website sells. 


![Screen Shot 2022-06-20 at 5 21 21 PM](https://user-images.githubusercontent.com/103516159/174679216-d8be8e82-8610-4d7b-9a17-72d996502e92.png)


The app also includes user auth that was configured in the backend using the RESTful routes (CRUD). A user will be redirected to the 'login' view where they can either login in or signup (depending if they are a returning or new user, respectively).

If a new user decides to sign up, they will be redirected to a 'signup' view. Once they complete the form they will have 'created' a new account that will be added to the backend database. Once compelted the user will be redirected automatically to the 'login' view.

The 'login' view promps the user to fill out the form with their email and password. In the backend we have configured this to be an 'update' route which will check to see if the user exists (i.e., the email entered exists in the backend database) and if the login credentials are accurate (i.e., the correct email/password combination was entered). 


![Screen Shot 2022-06-20 at 5 22 10 PM](https://user-images.githubusercontent.com/103516159/174679314-d740d6fe-2ebd-4383-8b28-063ee7ea915a.png)


Assuming a returning user has sucessfully logged in they will be redirected to the 'main' page view. Here, a user can perform the remaining CRUD operations on the stores' products (i.e., create, update, and/or delete).

![Screen Shot 2022-06-20 at 5 23 05 PM](https://user-images.githubusercontent.com/103516159/174679381-b4fa26e6-4ff0-4826-b0d2-fc06f48422e2.png)


## Improvements for the future: 

`Implement user cart functionality on the frontend` - currently we have 3 models (user accounts, products, user cart) in our backend that reflect 3 tables in our sql database. The cart model has a one to one relationship with the customer ID and a many to many relationship with the products. We have successfully added products to the users cart in the backend and rendered (in production - not deployed) the products in a seperate 'cart' view. Our team is still currently working through the full cart functionality. 


 ![Screen Shot 2022-06-20 at 5 20 15 PM](https://user-images.githubusercontent.com/103516159/174679109-0a50d16f-c0f5-4e60-b9c4-741dea13fb18.png)

`Save State to LocalStorage & Persist on Refresh` - Currently, if a user refreshes the page, the view will automatically be directed to 'welcome'. This is because in React.js, a page refresh will automatically set each state back to its default value. Our team is planning to revisit on saving state to local storage in order to persist on refresh. 

## What went well 

Implemented GitHub best practices when collaborating on projects - I.e., created branches specific to features and/or certain functionality. Tested each before merging to dev/ main branches and eventually deploying. 

Utilized project management best practices to help prioritize daily sprint goals in order to complete MVP (minimum viable product) and stretch goals. Planned our user stories to clearly communicate functioanality and app design. 

## Links 

Front-end repo - https://homegoods-store.herokuapp.com/

Front-end Heroku (deployed app) - https://github.com/Ncalamia/store_frontend/tree/master

Back-end repo - https://github.com/jschmidt108/Django_backend

Back-end Heroku (products) - https://arcane-sea-71685.herokuapp.com/api/products

Back-end Heroku (user accounts) - https://arcane-sea-71685.herokuapp.com/api/useraccount

Back-end heroku (user carts) - https://arcane-sea-71685.herokuapp.com/api/usercart
