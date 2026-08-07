const { faker } = require("@faker-js/faker");

function createRegistrationUser() {
  const timestamp = Date.now();
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: `qa.toolshop.${timestamp}@example.com`,
    password: "Welcome1!",
  };
}

module.exports = { createRegistrationUser };
