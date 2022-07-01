# Surfboard Coding Challenge

## Getting started

1. Clone this repository

2. Install dependencies
      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, run `npm start` from inside the `react-app` directory.

<br />

## Challenge Instructions

Please design and implement a product for users to run investor meetings in. Your product should meet the following product requirements, at a minimum:

- An agenda
    - A list of meeting topics
        - Each topic contains a title, time estimate, and a text description
    - Users should be able to navigate between topics
    - The presenter should be able to add, delete and edit topics
