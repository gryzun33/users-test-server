const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const USERS_COUNT = 50;

const API_URL = `https://randomuser.me/api/?results=${USERS_COUNT}`;

async function fetchUsers() {
  try {
    const response = await axios.get(API_URL);

    if (response.status === 200) {
      const users = response.data.results.map((user) => ({
        firstName: user.name.first,
        lastName: user.name.last,
        height: getRandomHeight(),
        weight: getRandomWeight(),
        gender: user.gender,
        address: `${user.location.city}, ${user.location.country}`,
        photo: user.picture.large,
      }));

      await saveUsersToFile(users);
    } else {
      console.error('Failed to fetch users:', response.status);
    }
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
}

function getRandomHeight() {
  return Math.floor(Math.random() * (200 - 150 + 1)) + 150;
}

function getRandomWeight() {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
}

async function saveUsersToFile(users) {
  const fileName = 'users.json';
  const filePath = path.join(__dirname, fileName);

  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    console.log(`Successfully saved ${users.length} users to ${fileName}`);
  } catch (err) {
    console.error('Error saving users to file:', err.message);
  }
}

fetchUsers();
