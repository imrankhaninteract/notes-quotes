// Array of quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "Believe you can and you're halfway there. -Theodore Roosevelt",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "It always seems impossible until it's done. - Nelson Mandela"
];

// Function to display quotes like breaking news
function displayQuotes() {
    const quoteContainer = document.createElement("div");
    quoteContainer.classList.add("quote-container");

    quotes.forEach(quote => {
        const quoteElement = document.createElement("div");
        quoteElement.classList.add("quote");
        quoteElement.innerText = quote;
        quoteContainer.appendChild(quoteElement);
    });

    const main = document.querySelector("#main");
    main.insertAdjacentElement("beforebegin", quoteContainer);
}

// Call the function to display quotes
displayQuotes();

// Selecting elements
const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Function to save notes to local storage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(note => data.push(note.value));
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

// Function to add a new note
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    note.querySelector(".save").addEventListener("click", () => saveNotes());

    note.querySelector("textarea").addEventListener("focusout", () => saveNotes());

    main.appendChild(note);
    saveNotes();
};

// Event listener for adding a new note
addBtn.addEventListener("click", () => addNote());

// Immediately invoked function to load notes from local storage
(() => {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
        addNote();
    } else {
        lsNotes.forEach(lsNote => addNote(lsNote));
    }
})();
