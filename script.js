// Initialize Quill editor
const quill = new Quill("#editor-container", {
  theme: "snow",
  placeholder: "Write your email...",
});

function toggleMenu() {
  var element = document.getElementById("hiddenMenu");
  element.classList.toggle("hidden");
  var element2 = document.getElementById("hiddenUserDetails");
  element2.classList.add("hidden")
}
function toggleUserDetails() {
  var element1 = document.getElementById("hiddenUserDetails");
  element1.classList.toggle("hidden");
  var element2 = document.getElementById("hiddenMenu");
  element2.classList.add("hidden")
}





document.addEventListener("DOMContentLoaded", () => {
  // Array of email objects
  const emails = [
    { subject: "Welcome to our service!", from: "support@service.com", receivedTime: new Date("2024-11-26T10:41:00") },
    { subject: "Your order has shipped", from: "orders@shop.com", receivedTime: new Date("2024-11-26T11:00:00") },
    { subject: "Important account update", from: "info@bank.com", receivedTime: new Date("2024-11-25T16:00:00") },
    { subject: "New offer available!", from: "promo@store.com", receivedTime: new Date("2024-11-25T09:00:00") },
    { subject: "Important account update", from: "info@bank.com", receivedTime: new Date("2024-11-25T16:00:00") },
    { subject: "New offer available!", from: "promo@store.com", receivedTime: new Date("2024-11-25T09:00:00") },
    { subject: "Important account update", from: "info@bank.com", receivedTime: new Date("2024-11-25T16:00:00") },
    { subject: "New offer available!", from: "promo@store.com", receivedTime: new Date("2024-11-25T09:00:00") },
  ];

  const emailListContainer = document.getElementById("email-list");
  const mainContent = document.getElementById("main-content");
  const main_section = document.querySelector(".main-section");


  function formatReceivedTime(receivedTime) {
    const now = new Date();
    const isToday = now.toDateString() === receivedTime.toDateString();
    const isSameYear = now.getFullYear() === receivedTime.getFullYear();

    if (isToday) {
      // Show time (e.g., "10:41")
      return receivedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (isSameYear) {
      // Show date in "DD MMM" format (e.g., "25 Nov")
      return receivedTime.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    } else {
      // Show full date in "DD MMM YYYY" format (e.g., "12 Feb")
      return receivedTime.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    }
  }




// Array of predefined email templates
const templates = [
  {
    subject: "Meeting",
    content: "Hi [Name],\n\nThank you for scheduling the meeting. Looking forward to discussing further.\n\nBest regards,"
  },
  {
    subject: "Follow-Up",
    content: "Hello [Name],\n\nI’m writing to follow up on our previous conversation. Let me know your thoughts.\n\nRegards,"
  },
  {
    subject: "Updates",
    content: "Dear [Name],\n\nI’m pleased to inform you about our latest updates. Please find more details below.\n\nWarm regards,"
  },
  {
    subject: "Inquiry",
    content: "Hi there,\n\nThank you for your inquiry. I’ll get back to you with the details soon.\n\nBest wishes,"
  },
  {
    subject: "Leave Request",
    content: "Dear [Manager's Name],\n\nI hope this message finds you well. I am writing to formally request leave from [start date] to [end date] due to [reason]. Please let me know if further details are required.\n\nThank you for your understanding.\n\nBest regards,"
  }
];

// References to DOM elements
const subjectInput = document.getElementById("subject");
const subjectSuggestions = document.getElementById("subject-suggestions");
const editorContainer = document.getElementById("editor-container");

// Function to display suggestions based on user input
function suggestContent(query) {
  const filteredTemplates = templates.filter((template) =>
    template.subject.toLowerCase().includes(query.toLowerCase())
  );

  subjectSuggestions.innerHTML = ""; // Clear previous suggestions

  filteredTemplates.forEach((template) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Subject: ${template.subject}`;
    listItem.addEventListener("click", () => {
      // When a suggestion is clicked, fill in the subject and content
      subjectInput.value = template.subject;
      editorContainer.innerHTML = template.content;
      subjectSuggestions.classList.add("hidden"); // Hide suggestions
    });
    subjectSuggestions.appendChild(listItem);
  });

  if (filteredTemplates.length > 0) {
    subjectSuggestions.classList.remove("hidden"); // Show suggestions
  } else {
    subjectSuggestions.classList.add("hidden"); // Hide suggestions if none found
  }
}

// Event listener for subject input
subjectInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query) {
    suggestContent(query); // Show suggestions based on input
  } else {
    subjectSuggestions.classList.add("hidden"); // Hide suggestions when input is empty
  }
});

// Handle "Enter" key to autofill selected template
subjectInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission

    const query = subjectInput.value.trim();
    const matchedTemplate = templates.find((template) =>
      template.subject.toLowerCase() === query.toLowerCase()
    );

    if (matchedTemplate) {
      // Autofill content if a template matches exactly
      editorContainer.innerHTML = matchedTemplate.content;
      subjectSuggestions.classList.add("hidden"); // Hide suggestions
    } else {
      alert("No matching template found.");
    }
  }
});

// Event listener for when the subject input loses focus (hide suggestions after a short delay)
subjectInput.addEventListener("blur", () => {
  setTimeout(() => subjectSuggestions.classList.add("hidden"), 200);
});













  // Function to create email items dynamically

function createEmailItems() {
  emails.forEach((email, index) => {
    const emailItem = document.createElement("div");
    emailItem.classList.add("email-item");
    const formattedTime = formatReceivedTime(email.receivedTime);

    emailItem.innerHTML = `
         <div class="email-select-star">
          <input type="checkbox" class="select-icon">
          <i class="fa-regular fa-star star-icon"></i>
        </div>
        <div class="email-info">
          <h4>${email.subject}</h4>
          <p>${email.from}</p>
        </div>
        <div class="email-time">
          ${formattedTime}
        </div>
        <div class="email-icons">
          <i class="fa-solid fa-archive icon archive"></i>
          <i class="fa-solid fa-trash icon delete"></i>
          <i class="fa-regular fa-envelope icon unread"></i>
        </div>
        
      
    `;

    // Append the new email item to the email list
    emailListContainer.appendChild(emailItem);

    // Add click event listener to show email content when clicking anywhere on the email item
    emailItem.addEventListener("click", (e) => {
      // Prevent triggering email view if icons or checkbox are clicked
      if (e.target.tagName === "I" || e.target.type === "checkbox") return;
      showEmailContent(email);
    });
  });
}


  // Function to show email content in main-content
  function showEmailContent(email) {
    // Add the back button to email view dynamically
    const emailView = document.createElement('div');
    emailView.classList.add('email-view');
    emailView.innerHTML = `
      <button class="back-button" id="back-button">
        <i class="fas fa-arrow-left"></i> <!-- FontAwesome left arrow icon -->
      </button>
      <h1>${email.subject}</h1>
      <p><strong>From:</strong> ${email.from}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut erat at erat auctor gravida vel id purus. Nam vitae justo non libero ullamcorper tincidunt.</p>
      <p><small>Received on: 2024-11-16</small></p>
    `;

    // Clear the main content and append the new email view
    mainContent.innerHTML = '';
    mainContent.appendChild(emailView);

    // Show the email content and hide the email list
    mainContent.style.display = "block"; 
    main_section.style.display = "none"; 
  

    // Add event listener for back button
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => {
      // Hide the email content
      mainContent.style.display = "none"; 
      // Show the sidebar (email list)
      main_section.style.display = "block"; 
    });
  }

  // Initialize the email items on page load
  createEmailItems();
});



// Open the compose popup
function openCompose() {
  const composePopup = document.getElementById("compose-popup");
  composePopup.style.display = "block";
}

// Close the compose popup and clear the form
function closeCompose() {
  const composePopup = document.getElementById("compose-popup");
  composePopup.style.display = "none";
  clearComposeForm();
}

// Function to minimize the compose popup
function minimizeCompose() {
  const composePopup = document.getElementById('compose-popup');
  if (composePopup.classList.contains('minimized')) {
    // Restore to normal view
    composePopup.classList.remove('minimized');
    composePopup.style.height = 'auto';
    composePopup.style.width = '415px';
  } else {
    // Minimize the popup
    composePopup.classList.add('minimized');
    composePopup.style.height = '80px'; // Minimal height
    composePopup.style.width = '400px';
    composePopup.style.marginTop = '20px';
    
  }
}

function fullCompose() {
  const composePopup = document.getElementById('compose-popup');
  if (composePopup.classList.contains('fullscreen')) {
    // Exit fullscreen
    composePopup.classList.remove('fullscreen');
    composePopup.style.width = '415px';
    composePopup.style.height = 'auto';
    composePopup.style.top = 'unset';
    composePopup.style.left = 'unset';
    composePopup.style.right = '20px';
    composePopup.style.bottom = '100px';
  } else {
    // Enter fullscreen
    composePopup.classList.add('fullscreen');
    composePopup.style.width = '100%';
    composePopup.style.height = '100%';
    composePopup.style.top = '0';
    composePopup.style.left = '0';
    composePopup.style.right = '0';
    composePopup.style.bottom = '0';
  }
}


const menuIcon = document.querySelector('.menu_icon');
const navBar = document.querySelector('.nav_bar');

// Add click event to toggle the 'collapsed' class
menuIcon.addEventListener('click', () => {
  navBar.classList.toggle('collapsed');  // Toggles between expanded and collapsed states

  const composeBtn = document.getElementById(compose-btn);

  if(composeBtn && composeBtn.classList.contains("collapsed")){
    composeBtn.style.padding = "2px"
  }

});
document.addEventListener('DOMContentLoaded', () => {
  const chevron = document.querySelector('.submenu_toggle'); // The "More" button
  const subMenu = document.querySelector('.submenu_hide'); // The submenu element
  const moreText = chevron.querySelector('.nav_bar_name'); // The "More" text span

  if (chevron && subMenu) {
    chevron.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior

      // Toggle submenu visibility
      subMenu.classList.toggle('submenu_hide');

      // Change "More" to "Less" based on submenu state
      if (subMenu.classList.contains('submenu_hide')) {
        moreText.textContent = 'More';
      } else {
        moreText.textContent = 'Less';
      }
    });
  }
});







// Toggle visibility of the Cc field
function toggleCc() {
  const ccField = document.getElementById("cc-field");
  ccField.style.display = ccField.style.display === "none" ? "block" : "none";
}

// Toggle visibility of the Bcc field
function toggleBcc() {
  const bccField = document.getElementById("bcc-field");
  bccField.style.display = bccField.style.display === "none" ? "block" : "none";
}

// Send email functionality
// Function to send the email
function sendEmail() {
  // Get values from the form fields
  const toField = document.getElementById('to-field').value;
  const ccField = document.getElementById('cc-field').value;
  const bccField = document.getElementById('bcc-field').value;
  const subjectField = document.querySelector('input[name="subject"]').value;
  const bodyField = document.getElementById('editor-container').innerText;

  // Basic form validation
  if (!toField || !subjectField || !bodyField) {
    alert("Please fill in all the required fields.");
    return;
  }

  // For demonstration purposes, we will log the email details
  console.log("Email sent to:", toField);
  console.log("Cc:", ccField);
  console.log("Bcc:", bccField);
  console.log("Subject:", subjectField);
  console.log("Body:", bodyField);

  // Create a success message element
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerHTML = `
    <h2>Email Sent Successfully!</h2>
    <p>Your email has been sent to <strong>${toField}.</p>
  `;

  // Style the success message (you can add your own custom styles here)
  successMessage.style.backgroundColor = '#4CAF50';
  successMessage.style.color = 'white';
  successMessage.style.padding = '10px';
  successMessage.style.position = 'fixed';
  successMessage.style.top = '20px';
  successMessage.style.left = '50%';
  successMessage.style.transform = 'translateX(-50%)';
  successMessage.style.borderRadius = '5px';
  successMessage.style.zIndex = '1000';
  successMessage.style.fontFamily = 'Arial, sans-serif';

  // Append the success message to the body (top of the page)
  document.body.appendChild(successMessage);

  // Optionally, hide the success message after a few seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000); // Hide after 5 seconds

  // Reset the form and hide extra fields
  document.getElementById('compose-form').reset();
  document.getElementById('cc-field').style.display = 'none';
  document.getElementById('bcc-field').style.display = 'none';
  quill.setText('');
}



// Function to go back to inbox
function goBackToInbox() {
  const mainSection = document.querySelector('.main-section');
  const mainContent = document.querySelector('.main-content');
  
  // Hide the email content and show the sidebar (main-section with email list)
  mainContent.style.display = 'none';
  mainSection.style.display = 'block';
}

// Clear the compose form fields
function clearComposeForm() {
  document.getElementById("compose-form").reset();
  const ccField = document.getElementById("cc-field");
  const bccField = document.getElementById("bcc-field");
  ccField.style.display = "none";
  bccField.style.display = "none";
}


function deleteEmail() {
  // Get the compose popup
  const composePopup = document.getElementById('compose-popup');
  
  // Clear all form fields
  document.getElementById('compose-form').reset();
  document.getElementById('cc-field').style.display = 'none';
  document.getElementById('bcc-field').style.display = 'none';
  
  // Clear the Quill editor content
  quill.setText(''); // This will clear the Quill editor

  // Hide the compose popup
  composePopup.style.display = 'none';

  // Create a success message for deletion
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerHTML = `
    <h2>Email Draft Deleted!</h2>
    <p>Your email draft has been deleted successfully.</p>
  `;

  // Style the success message (optional)
  successMessage.style.backgroundColor = '#f44336'; // Red color for delete
  successMessage.style.color = 'white';
  successMessage.style.padding = '10px';
  successMessage.style.position = 'fixed';
  successMessage.style.top = '20px';
  successMessage.style.left = '50%';
  successMessage.style.transform = 'translateX(-50%)';
  successMessage.style.borderRadius = '5px';
  successMessage.style.zIndex = '1000';
  successMessage.style.fontFamily = 'Arial, sans-serif';

  // Append the success message to the body (top of the page)
  document.body.appendChild(successMessage);

  // Optionally, hide the success message after a few seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000); // Hide after 5 seconds
}


function handleFileChange() {
  const fileInput = document.getElementById("attach-file");
  const fileName = fileInput.files[0]?.name; // Get the name of the attached file

  if (fileName) {
    // Show the file name below the Attach button
    document.getElementById("file-name").textContent = "Attached: " + fileName;
  } else {
    // Clear the file name if no file is selected
    document.getElementById("file-name").textContent = "";
  }
}

function archiveEmail(index) {
  alert(`Email archived: ${emails[index].subject}`);
  // Implement archiving logic here (e.g., remove from the list, add to archives)
}
function deleteEmail(index) {
  alert(`Email deleted: ${emails[index].subject}`);
  // Implement deletion logic here (e.g., remove from array and UI)
  emails.splice(index, 1); // Remove email from array
  emailListContainer.innerHTML = ""; // Clear current list
  createEmailItems(); // Re-render email list
}
function markUnread(index) {
  alert(`Email marked as unread: ${emails[index].subject}`);
  // Implement marking as unread logic (e.g., update style or property)
}
function toggleStar(star) {
  star.classList.toggle("fas"); // Toggle between solid and regular star
  star.classList.toggle("far");
}
