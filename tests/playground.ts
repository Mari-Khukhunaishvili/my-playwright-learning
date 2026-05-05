const retries: number = 5;  // What does VS Code show?             // Week 2 (Breaking things on purpose)                
const user = { email: "john@test.com" };
console.log(user.password);      // What does VS Code show?

function getTimeout(seconds: number): number {                     // Week 2 (Fix the type errors - 3)
  return seconds * 1000;  // Hint: look at the return type
}

const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // Hint: case matters


function printName(name: string) {
  console.log(name);
}
const userName: string | undefined = undefined;
if (userName !== undefined) {
  printName(userName);  // Hint: what if userName is undefined?
}


type Product = {                                                     // Week 2 (Write test data)
    name: string;
    price: number;
    instock: boolean;
};

const product1: Product = {
    name: "Laptop",
    price: 999.99,
    instock: true       
};
const product2: Product = {
    name: "Headphones",
    price: 49.99,
    instock: false      
};
function formatPrice(price: number): string {
    return `$${price}`;
}
console.log(formatPrice(product1.price)); 
console.log(formatPrice(product2.price)); 

