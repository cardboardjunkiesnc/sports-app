// js/components/navbar.js

// Keep track of "auth" subscribers (for later when we fake login/logout)
const subscribers = [];

export function onAuthChange(cb) {
  if (typeof cb === "function") {
    subscribers.push(cb);
  }
}

function emit() {
  subscribers.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error(e);
    }
  });
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("sportsapp_user") || "null");
  } catch {
    return null;
  }
}

export function renderNavbar() {
  const nav = document.createElement("div");

  // helper to make links
  function link(href, text) {
    const el = document.createElement("a");
    el.href = href;
    el.textContent = text;
    el.style.marginRight = "1rem";
    return el;
  }

  const left = document.createElement("span");
  left.appendChild(link("#/home", "Home"));
  left.appendChild(link("#/cards", "Cards"));
  left.appendChild(link("#/pricing", "Pricing"));
  left.appendChild(link("#/grading", "Grading"));
  left.appendChild(link("#/chat", "Chat"));
  left.appendChild(link("#/sell", "Sell"));

  const right = document.createElement("span");
  right.style.float = "right";

  const user = getUser();
  if (user && user.username) {
    // logged-in view
    const profile = link("#/profile", user.username);
    right.appendChild(profile);

    const logout = link("#/home", "Logout");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("sportsapp_user");
      emit();
    });
    right.appendChild(logout);
  } else {
    // logged-out view
    right.appendChild(link("#/login", "Login"));
  }

  nav.appendChild(left);
  nav.appendChild(right);
  return nav;
}
