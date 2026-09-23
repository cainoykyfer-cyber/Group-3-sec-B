
const express = require('express');
const notificationsRouter = require('./fonollera.notification.routes.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Notifications route
app.use('/notifications', notificationsRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});