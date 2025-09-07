import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { firebaseConfig } from "./cred.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firestore
const db = getFirestore(app);

// 🔍 Detect category from the page filename
const category = window.location.pathname.split("/").pop().replace(".html", "");

// Update page title
document.getElementById("category-title").innerText =
  category.charAt(0).toUpperCase() + category.slice(1) + " Recipes";

// ✅ Fetch recipes dynamically from Firestore
async function fetchRecipes() {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "<p>Loading recipes...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, `savedrecipes/${category}/recipes`));

    recipeContainer.innerHTML = "";

    if (querySnapshot.empty) {
      recipeContainer.innerHTML = `<p>No ${category} recipes found.</p>`;
      return;
    }

    querySnapshot.forEach((doc) => {
      const recipe = doc.data();
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe-card");

      recipeDiv.innerHTML = `
        <h2>${recipe.dishName}</h2>
        <p><strong>Healthiness:</strong> ${recipe.healthiness}</p>
        <p><strong>Preparation Time:</strong> ${recipe.prepTime} mins</p>
        <p><strong>Calories:</strong> ${recipe.calories || "N/A"}</p>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
      `;

      recipeContainer.appendChild(recipeDiv);
    });

  } catch (error) {
    console.error(`Error fetching ${category} recipes:`, error);
    recipeContainer.innerHTML = "<p>Error loading recipes. Please try again.</p>";
  }
}

// Fetch recipes on page load
window.onload = fetchRecipes;
