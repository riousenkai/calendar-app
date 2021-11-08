# Calendar App

(Best if viewed in 1920 x 1080 screen resolution with Google Chrome)

## Technologies / Frameworks used:
* JavaScript / React
* CSS
* Easybase (for serverless backend)

## How to install:
1. Clone repository
2. Go to the project's root directory on your terminal
3. Run 'npm install' on terminal
4. Run 'npm start' after all packages are installed

## Notable bug:
* There is an issue when adding an event that has a single quotation mark in its title or description. This seems to be an issue with Easybase's database.
  * Current solution: using .replace to change the single quotation mark to an empty string (ex. He's to Hes)

![Image](https://i.imgur.com/cvWJllG.png)
