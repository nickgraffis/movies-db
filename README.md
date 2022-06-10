# Movie Ratings CLI
🎥 A cli tool for creating and updating movies and reviews with a local MySQL server and database.

## Useage
Make sure to create a `.env` file and add the following with your relevent values:
```
DB_PORT=8889
DB_USER=root
DB_PASS=root
DB_NAME=movies
```

## How it works
We have an `inquirer` prompt that asks for an action, then a `switch` statement that performs the proper action. 
Each action is it's own module that might ask for further user input, and then perform some sort of `mysql` query.
