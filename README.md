# FrontCamp-NodeJS-Express

To check tasks 3-5 use command npm run start

Task 1:
1. Install NodeJS. Use npm to install express framework to your project folder.
2. Implement and run simple web-server which will always (any route, any request) return JSON of fixed blog article object.
3. Extend web-server functionality from #2. Use Rest API to implement CRUD operations endpoints for blog articles. You can log to console all operations until part 2. Use postman, or fiddler or other tool to test your endpoints.
Example of routes:
GET    /blogs
GET    /blogs/{id}
POST   /blogs
PUT    /blogs/{id}
DELETE /blogs/{id}
4. Use any express view engine to return welcome page to user when accessing any route that server doesn’t understand/not configured. This will replace implementation from #2.
5.*Advanced:
Use http://nodemon.io/ for development.
Add simple logging mechanism to write URL and Date info to file per each request (try https://github.com/winstonjs/winston or any other library).

Task 2:
1. Install and setup mongoose.
2. Create Mongoose scheme for blog article model.
3. Replace "console logs"/stubs from part 1 to real communication with database.
Find all blogs
Find blog by ID
Insert blog
Update blog record
Delete blog from DB
4. Implement error handling middleware (examples here) which will send an error without stack trace to client.
 
*Advanced:
Describe mongoose scheme for User model. Implement user registration, add authorization and authentication using http://www.passportjs.org/ (any strategy) for accessing blog article.
