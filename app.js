// app.js

// Array of quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs, " +
    
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt, " 
  
];
// Select the quote container
const quoteContainer = document.querySelector(".quote-scroll");

// Function to display quotes
function displayQuotes() {
    // Iterate through the quotes array
    quotes.forEach(quote => {
        // Create a new <div> element for each quote
        const quoteElement = document.createElement("div");
        // Add the 'quote' class to the <div> element
        quoteElement.classList.add("quote");
        // Set the inner text of the <div> element to the current quote
        quoteElement.innerText = quote;
        // Append the <div> element to the quote container
        quoteContainer.appendChild(quoteElement);
    });
}

// Call the function to display quotes
displayQuotes();

// Selecting elements
const addBtn = document.querySelector(".note-container #addBtn");
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