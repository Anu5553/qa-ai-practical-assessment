function buildUniqueUser() {
  const timestamp = Date.now();
  return {
    firstName: "Qa",
    lastName: "Tester",
    dob: "1990-01-15",
    country: "Netherlands (the)",
    postalCode: "1111AA",
    houseNumber: "1",
    street: "Test Street",
    city: "Amsterdam",
    state: "NH",
    phone: "5551234567",
    email: `qa.toolshop.${timestamp}@example.com`,
    password: "Welcome@12345X",
  };
}

module.exports = { buildUniqueUser };
