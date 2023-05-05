import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: ""
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

onValue(shoppingListInDB, function(snapshot) {
    // Object.values converts object into array of values
    if(snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val());

        clearShoppingListEl();

        for(let i=0; i< shoppingListArray.length; i++) {
            appendItemToShoppingListEl(shoppingListArray[i]);
        }
    } else {
        shoppingListEl.innerHTML = `<li>It's Empty</li>`
    }
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputFieldEl();
});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${item}</li>`;
    let itemID = item[0];
    let itemValue = item[1]
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfShoppingListItem = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfShoppingListItem);
    })
    shoppingListEl.append(newEl);
}
