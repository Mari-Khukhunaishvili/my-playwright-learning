import { test } from "@playwright/test";                 //Bring in Playwright's test function so I can define and run tests.
import { validUser, getLoginUrl } from "../test-data";   //Go to my test-data.ts file and bring in the validUser object and getLoginUrl function.
test("test data is wired correctly", async () => {      // Create a test called "test data is wired correctly" and run this function asynchronously (because tests may involve waiting).
  const { email, password } = validUser;  // destructuring! Take the validUser object and pull out the email and password properties into separate variables.
  console.log("URL:", getLoginUrl("staging"));          //Call the getLoginUrl function with "staging" and print the result with the label "URL:".
  console.log("Email:", email);                         //Print the user's email I extracted earlier.
  console.log("Password:", password);                   //Print the user's password I extracted earlier.    
  // Does it print what you expect?
});
     //Whole program in one sentence:
     //Run a Playwright test that imports test data, extracts a user's email and password,
     //generates a login URL for staging, and prints everything to the console (to verify that the test data is correctly wired up).