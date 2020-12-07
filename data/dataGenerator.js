const faker = require("faker");
const fs = require("fs");
faker.setLocale("ja");

const desiredUsers = 5000;

const randomLat = () =>
  Math.random() * (bounds.N.lat - bounds.S.lat) + bounds.S.lat;
const randomLng = () =>
  Math.random() * (bounds.E.lng - bounds.W.lng) + bounds.W.lat;
const bounds = {
  W: { lat: 35.682736, lng: 139.558426 },
  S: { lat: 35.494717, lng: 139.766576 },
  E: { lat: 35.682736, lng: 139.950204 },
  N: { lat: 35.769697, lng: 139.766576 },
};

const users = [];

for (let i = 0; i < desiredUsers; i++) {
  users[i] = {
    name: faker.fake("{{name.firstName}}{{name.lastName}}"),
    address: faker.fake("{{address.cityPrefix}}{{address.citySuffix}}"),
    lat: randomLat(),
    lng: randomLng(),
  };
}

fs.writeFile("users.json", JSON.stringify(users), function (err) {
  if (err) return console.log(err);
});
