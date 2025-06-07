const express = require('express');
const app = express();
const router = express.Router();
let users = [];

router.post('/set-online', (req, res) => {
  const { user, topic, isOnline } = req.body;
  users.push({ user, topic, isOnline });
  res.send('Status updated!');
});

router.get('/online-users', (req, res) => {
    const {requestingUser, requestingUserTopic} = req.query;
    const opponent = users.find(u => u.user !== requestingUser && u.isOnline && u.topic === requestingUserTopic)
    res.json(opponent || null);
});

module.exports = router;