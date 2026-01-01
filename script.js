/**************** LOAD SAVED DATA ****************/
let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
let discount = 0;
let rating = 0;


/**************** SEARCH FUNCTIONALITY ****************/
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchBar");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        alert(`Searching for: ${query}`);
    } else {
        alert("Please enter a search term!");
    }
});


/**************** SUBSCRIBE FUNCTIONALITY ****************/
const subscribeBtn = document.getElementById("subscribeBtn");
const emailInput = document.getElementById("emailInput");

subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Please enter your email!");
    } else {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        alert(`Subscribed with: ${email}`);
        emailInput.value = "";
    }
});


/**************** STAR RATING ****************/
const stars = document.querySelectorAll(".star-rating span");

stars.forEach(star => {
    star.addEventListener("mouseover", () => {
        const value = star.getAttribute("data-value");
        stars.forEach(s =>
            s.classList.toggle("hovered", s.getAttribute("data-value") <= value)
        );
    });

    star.addEventListener("mouseout", () => {
        stars.forEach(s => s.classList.remove("hovered"));
    });

    star.addEventListener("click", () => {
        rating = parseInt(star.getAttribute("data-value"));
        stars.forEach(s =>
            s.classList.toggle("selected", s.getAttribute("data-value") <= rating)
        );
    });
});


/**************** FEEDBACK SUBMISSION ****************/
const submitFeedback = document.getElementById("submitFeedback");
const feedbackText = document.getElementById("feedbackText");

submitFeedback.addEventListener("click", () => {
    const feedback = feedbackText.value.trim();

    if (rating === 0) {
        alert("Please select a star rating!");
    } else if (feedback === "") {
        alert("Please write your feedback!");
    } else {
        feedbacks.push({ rating, feedback });
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

        alert(
            `Thank you for your feedback!\nRating: ${rating} stars\nFeedback: ${feedback}`
        );

        rating = 0;
        feedbackText.value = "";
        stars.forEach(s => s.classList.remove("selected", "hovered"));
    }
});


/**************** CART FUNCTIONALITY ****************/
const cartBtn = document.getElementById("cartBtn");
const cartDropdown = document.getElementById("cartDropdown");
const cartItemsList = document.getElementById("cartItemsList");
const cartTotalDisplay = document.getElementById("cartTotal");
const cartCountDisplay = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");

const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponInput = document.getElementById("couponInput");
const couponMessage = document.getElementById("couponMessage");


/******** ADD TO CART ********/
document.querySelectorAll(".product button").forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.parentElement;
        const name = productCard.querySelector("h3").innerText;
        const price = parseInt(button.dataset.price);

        cartItems.push({ name, price });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCart();
    });
});


/******** UPDATE CART ********/
function updateCart() {
    cartCountDisplay.innerText = cartItems.length;
    cartItemsList.innerHTML = "";

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button data-index="${index}">Remove</button>
        `;
        cartItemsList.appendChild(li);
    });

    document.querySelectorAll("#cartItemsList button").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = parseInt(e.target.dataset.index);
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCart();
        });
    });

    let total = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (discount > 0 && cartItems.length > 0) {
        total -= total * (discount / 100);
        couponMessage.innerText = `Coupon applied! ${discount}% off.`;
    } else if (cartItems.length === 0) {
        couponMessage.innerText = "";
        discount = 0;
    }

    cartTotalDisplay.innerText = Math.round(total);
}


/******** APPLY COUPON ********/
applyCouponBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
        couponMessage.innerText = "Add items before applying coupon!";
        discount = 0;
        return;
    }

    const code = couponInput.value.trim().toUpperCase();

    if (code === "GLOW10") {
        discount = 10;
    } else if (code === "GLOW20") {
        discount = 20;
    } else {
        discount = 0;
        couponMessage.innerText = "Invalid coupon code!";
    }

    updateCart();
});


/******** OPEN CART ********/
cartBtn.addEventListener("click", e => {
    e.stopPropagation();
    cartDropdown.style.display = "block";
    cartOverlay.style.display = "block";
});


/******** PREVENT CLOSE INSIDE CART ********/
cartDropdown.addEventListener("click", e => {
    e.stopPropagation();
});


/******** CLOSE CART ********/
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("click", closeCart);

function closeCart() {
    cartDropdown.style.display = "none";
    cartOverlay.style.display = "none";
}


/******** LOAD CART ON PAGE REFRESH ********/
window.addEventListener("load", () => {
    updateCart();
});