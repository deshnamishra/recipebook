const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const recipeFormContainer = document.getElementById("recipe-form-container");
const saveBtn = document.getElementById("save-recipe");
const recipeList = document.getElementById("recipe-list");

// --- Signup ---
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful!");
    }).catch(err => alert(err.message));
});

// --- Login ---
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
    }).catch(err => alert(err.message));
});

// --- Logout ---
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// --- Auth State ---
auth.onAuthStateChanged((user) => {
  if (user) {
    recipeFormContainer.style.display = "block";
    loadUserRecipes(user.uid);
  } else {
    recipeFormContainer.style.display = "none";
    recipeList.innerHTML = "";
  }
});

// --- Save Recipe ---
saveBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  if (!user) return alert("Login first!");

  const title = document.getElementById("recipe-title").value;
  const description = document.getElementById("recipe-description").value;
  const category = document.getElementById("category").value;

  const recipe = { title, description, category, createdAt: new Date() };

  db.collection("users")
    .doc(user.uid)
    .collection("savedrecipes")
    .add(recipe)
    .then(() => alert("Recipe saved!"))
    .catch(err => console.error("Save error", err));
});

// --- Load User Recipes ---
function loadUserRecipes(uid) {
  recipeList.innerHTML = "";
  db.collection("users")
    .doc(uid)
    .collection("savedrecipes")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const recipe = doc.data();
        const li = document.createElement("li");
        li.textContent = `${recipe.title} (${recipe.category}) - ${recipe.description}`;
        recipeList.appendChild(li);
      });
    });
}
