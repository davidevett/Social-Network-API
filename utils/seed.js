const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomVideos } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to the database!');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thought');
    }

    let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('user');
    }

    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await User.create({ username: `user${i + 1}` });
      users.push({
        username: user.username,
        email: user.email,
        thoughts: [],
        friends: [],
      });
    }
    const userData = await User.create(users);

    const thought = [];
    for (let i = 0; i < 100; i++) {
      const thought = await Thought.create({
        username: user[i % 10].id,
        thoughtText: `thought ${i + 1}`,
        createdAt: new Date(Date.now() - (Math.floor(Math.random() * 10000000000))),
        updatedAt: new Date(Date.now() - (Math.floor(Math.random() * 10000000000))),
      });
      user[i % 10].thoughts.push(thought._id);
      await user[i % 10].save();
    }
    const thoughtData = await Thought.create(thought)
    console.log('Seeding complete!');
    process.exit();

})