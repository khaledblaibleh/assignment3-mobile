let step = "start";

let order = {
  item: "",
  size: "",
  topping: "",
  drink: ""
};

export function clearInput() {
  step = "start";
  order = { item: "", size: "", topping: "", drink: "" };
}

export function handleInput(input) {
  input = input.toLowerCase().trim();

  // STEP 1: WELCOME & MENU
  if (step === "start") {
    step = "item";
    return [
      "Welcome to our Takeout Chatbot!",
      "What would you like to order: Pizza or Burger?"
    ];
  }

  // STEP 2: CHOOSE ITEM
  if (step === "item") {
    if (input === "pizza" || input === "burger") {
      order.item = input;
      step = "size";
      return [
        `Great choice! What size ${input} would you like: Small or Large?`
      ];
    }
    return ["Sorry, please choose either 'Pizza' or 'Burger'."];
  }

  // STEP 3: CHOOSE SIZE
  if (step === "size") {
    if (input === "small" || input === "large") {
      order.size = input;
      step = "topping";
      let toppingChoice = order.item === "pizza" ? "Pepperoni or Mushroom" : "Cheese or Bacon";
      return [
        `Got it, a ${input} ${order.item}.`,
        `What topping would you like: ${toppingChoice}?`
      ];
    }
    return ["Please choose 'Small' or 'Large'."];
  }

  // STEP 4: CHOOSE TOPPING
  if (step === "topping") {
    // Basic validation for any input (you can make this stricter if you like)
    if (input.length > 2) { 
      order.topping = input;
      step = "drink";
      return [
        `Topping added: ${input}.`,
        "Would you like to add a drink for $2? (yes/no)"
      ];
    }
    return ["Please enter a valid topping name."];
  }

  // STEP 5: DRINK UP-SELL (WITH VALIDATION)
  if (step === "drink") {
    if (input === "yes" || input === "no") {
      order.drink = input;
      step = "done";

      let summary = `Order Summary: One ${order.size} ${order.item} with ${order.topping}`;
      if (order.drink === "yes") {
        summary += " and a cold drink.";
      } else {
        summary += " and no drink.";
      }

      return [
        order.drink === "yes" ? "Awesome, drink added!" : "No problem, no drink.",
        summary,
        "Order complete! Refresh to start a new order."
      ];
    }
    // This is the fix! It stays on the drink step if input is invalid.
    return ["Please answer 'yes' or 'no' for the drink."];
  }

  return ["Order complete. Refresh to start a new order."];
}