let cart = [];

document.addEventListener("DOMContentLoaded", function() {
    const cartLink = document.getElementById("cart-link");
    const cartContainer = document.getElementById("cart-container");
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const productList = document.getElementById("product-list");

    cartLink.addEventListener("click", function() {
        cartContainer.classList.toggle("show");
    });

    productList.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-cart")) {
            const product = event.target.parentNode;
            const productName = product.querySelector("h2").textContent;
            const productPrice = product.querySelector("p").textContent;
            const productImage = product.querySelector("img").src;

            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            cart.push(cartItem);
            updateCart();
        }
    });

    function updateCart() {
        cartList.innerHTML = "";
        cartTotal.textContent = "Total: $0.00";

        cart.forEach(function(item) {
            const cartItemHTML = `
                <li>
                    <img src="${item.image}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <button class="remove-from-cart">Remove</button>
                </li>
            `;

            cartList.innerHTML += cartItemHTML;
        });

        const totalPrice = cart.reduce(function(acc, item) {
            return acc + parseFloat(item.price.replace("$", ""));
        }, 0);

        cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    cartList.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const cartItem = event.target.parentNode;
            const index = cart.findIndex(function(item) {
                return item.name === cartItem.querySelector("h2").textContent;
            });

            cart.splice(index, 1);
            updateCart();
        }
    });

    checkoutBtn.addEventListener("click", function() {
        alert("Checkout functionality not implemented yet!");
    });
});
// Signup functionality
document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    document.getElementById("signup-error").textContent = "Passwords do not match";
    return;
  }

  // Create a new user object
  const user = {
    username: username,
    email: email,
    password: password
  };

  // Store the user data in local storage
  localStorage.setItem("users", JSON.stringify([user]));

  // Clear the form fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";

  // Display a success message
  document.getElementById("signup-error").textContent = "Sign up successful!";
});

// Signin functionality
document.getElementById("signin-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Retrieve the user data from local storage
  const users = JSON.parse(localStorage.getItem("users"));

  // Check if the user exists
  const user = users.find(function(user) {
    return user.username === username && user.password === password;
  });

  if (!user) {
    document.getElementById("signin-error").textContent = "Invalid username or password";
    return;
  }

  // Display a success message
  document.getElementById("signin-error").textContent = "Sign in successful!";
});
// Function to validate email
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Function to validate password
function validatePassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}

// Function to check if username is available
function checkUsernameAvailability(username) {
  const users = JSON.parse(localStorage.getItem("users"));
  return !users.find(function(user) {
    return user.username === username;
  });
}

// Function to check if email is available
function checkEmailAvailability(email) {
  const users = JSON.parse(localStorage.getItem("users"));
  return !users.find(function(user) {
    return user.email === email;
  });
}

// Signup functionality
document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!validateEmail(email)) {
    document.getElementById("signup-error").textContent = "Invalid email";
    return;
  }

  if (!validatePassword(password)) {
    document.getElementById("signup-error").textContent = "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("signup-error").textContent = "Passwords do not match";
    return;
  }

  if (!checkUsernameAvailability(username)) {
    document.getElementById("signup-error").textContent = "Username is already taken";
    return;
  }

  if (!checkEmailAvailability(email)) {
    document.getElementById("signup-error").textContent = "Email is already taken";
    return;
  }

  // Create a new user object
  const user = {
    username: username,
    email: email,
    password: password
  };

  // Store the user data in local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // Clear the form fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";

  // Display a success message
  document.getElementById("signup-error").textContent = "Sign up successful!";
});

// Signin functionality
document.getElementById("signin-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Retrieve the user data from local storage
  const users = JSON.parse(localStorage.getItem("users"));

  // Check if the user exists
  const user = users.find(function(user) {
    return user.username === username && user.password === password;
  });

  if (!user) {
    document.getElementById("signin-error").textContent = "Invalid username or password";
    return;
  }

  // Display a success message
  document.getElementById("signin-error").textContent = "Sign in successful!";
});
/* JavaScript */
document.getElementById("signin-link").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("signin-form-container").style.display = "block";
});

document.getElementById("signup-link").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("signup-form-container").style.display = "block";
});

document.getElementById("signin-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Retrieve the user data from local storage
  const users = JSON.parse(localStorage.getItem("users"));

  // Check if the user exists
  const user = users.find(function(user) {
    return user.username === username && user.password === password;
  });

  if (!user) {
    document.getElementById("signin-error").textContent = "Invalid username or password";
    return;
  }

  // Display a success message
  document.getElementById("signin-error").textContent = "Sign in successful!";
});

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    document.getElementById("signup-error").textContent = "Passwords do not match";
    return;
  }

  // Create a new user object
  const user = {
    username: username,
    email: email,
    password: password
  };

  // Store the user data in local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // Clear the form fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElement