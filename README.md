# Better Chat

A simple repo that tests the connection of Memphis and NestJS.

- Have Memphis running locally (with Docker).
- Have NodeJS and NestJS installed locally.
- Clone this repo and run `npm install`.
- Run `npm start`.
- Make a POST request to `http://localhost:3000/chat`. The expected request body is as follows:

```
{
  "author": "any string of choice",
  "text": "any string of choice"
}
```

- It should response with a true status and an acknowledged message.
- Check the Memphis dashboard at `http://localhost:9000/stations/chat` to confirm the message went through Memphis.
- Also, make a GET request at `http://localhost:3000/chat` to view all chatMessages that were sent while this NestJS server was running.