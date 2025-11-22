// Nav component (renders links and auth state)

const subscribers = [];

export function onAuthChange(cb) {
  if (typeof cb === "function") subscribers.push(cb);
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

  function makeLink(href, text) {
    const el = document.createElement("a");
    el.href = href;
    el.textContent = text;
    el.className = "nav-link";
    return el;
  }

  const left = document.createElement("span");
  left.className = "nav-left";
  left.appendChild(makeLink("#/home", "Home"));
  left.appendChild(makeLink("#/cards", "Cards"));
  left.appendChild(makeLink("#/pricing", "Pricing"));
  left.appendChild(makeLink("#/grading", "Grading"));
  left.appendChild(makeLink("#/chat", "Chat"));
  left.appendChild(makeLink("#/sell", "Sell"));

  const right = document.createElement("span");
  right.className = "nav-right";

  const user = getUser();

  if (user && user.username) {
    const profile = makeLink("#/profile", user.username);
    right.appendChild(profile);

    const logout = makeLink("#/home", "Logout");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("sportsapp_user");
      emit();
    });
    right.appendChild(logout);
  } else {
    right.appendChild(makeLink("#/login", "Login"));
  }

  nav.appendChild(left);
  nav.appendChild(right);

  return nav;
}
