import "./style.css";
import { createClient } from "@propelauth/javascript";

const authClient = createClient({
  // The base URL where your authentication pages are hosted. You can find this under the Frontend Integration section for your project.
  authUrl: "https://95971036530.propelauthtest.com",
  // If true, periodically refresh the access token in the background. This helps ensure you always have a valid token ready to go. Default true.
  enableBackgroundTokenRefresh: true,
});

let DOMAIN_NAME = "http://ec2-18-188-148-3.us-east-2.compute.amazonaws.com";

const makePosts = document.getElementById("make-posts");
const makePostButton = document.getElementById("post-container");
const modalWindowOverlay = document.getElementById("modal-overlay");
const windowCloser = document.getElementById("close-popup");
const popupHeading = document.getElementById("popup-title");
const searchSection = document.getElementById("section-name");
const sidebar = document.querySelector(".sidebar");
let username = "";

document.getElementById("signup").onclick = authClient.redirectToSignupPage;
document.getElementById("login").onclick = authClient.redirectToLoginPage;
document.getElementById("username").onclick = authClient.redirectToAccountPage;
document.getElementById("logout").onclick = authClient.logout;

authClient.addLoggedInChangeObserver((isLoggedIn) => {
  if (isLoggedIn) {
    document.getElementById("display-when-logged-in").style.display = "revert";
    document.getElementById("display-when-logged-out").style.display = "none";
    if (searchSection.textContent === "Welcome") {
      makePosts.style.display = "none";
    } else {
      makePosts.style.display = "inline-block";
    }

    // Get authentication info and set email to it
    authClient.getAuthenticationInfoOrNull().then((authInfo) => {
      document.getElementById("username").innerHTML = authInfo?.user?.username;
      username = authInfo?.user?.username;
    });
  } else {
    document.getElementById("display-when-logged-in").style.display = "none";
    document.getElementById("display-when-logged-out").style.display = "revert";
    makePosts.style.display = "none";
  }
});

const closeWindow = () => {
  modalWindowOverlay.style.display = "none";
};

const showModalWindow = () => {
  modalWindowOverlay.style.display = "flex";
  popupHeading.innerHTML = `Make post to: ${searchSection.textContent}`;
  const departmentSelect = document.getElementById("department-select");
  if (searchSection.textContent === "Department") {
    // Show the dropdown menu
    departmentSelect.style.display = "inline-block";
    // You might want to add logic here to handle the form submission based on the selected department
  } else {
    departmentSelect.style.display = "none";
  }
};

makePosts.addEventListener("click", showModalWindow);
windowCloser.addEventListener("click", closeWindow);

document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
  const homeButton = document.querySelector("#umd-bulletin");
  homeButton.addEventListener("click", function (event) {
    const sectionName = "Welcome";
    document.getElementById("section-name").textContent = sectionName;
    // Show the make-posts button
    // Change the page title
    makePosts.style.display = "none";
    document.title = sectionName + " - UMD Bulletin";
    let fakeEvent = new Event("click");
    document.getElementById("search-button").dispatchEvent(fakeEvent);
  });

  // Add click event listener to each link
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Check if the clicked link is the logout link

      if (this.textContent !== "Logout") {
        event.preventDefault(); // Prevent the default link behavior
        const sectionName = this.textContent; // Get the text of the clicked link
        // Update the section name placeholder
        document.getElementById("section-name").textContent = sectionName;
        makePosts.style.display = "inline-block";
        document.title = sectionName + " - UMD Bulletin";
        let fakeEvent = new Event("click");
        document.getElementById("search-button").dispatchEvent(fakeEvent);
      }
    });
  });

  // Add event listener to the search button
  document
    .getElementById("search-button")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission
      const searchInput = document.getElementById("search-input");
      const searchResults = document.getElementById("search-results");
      const searchSection = document.getElementById("section-name");
      const searchTerm = searchInput.value;
      const searchSec = searchSection.textContent;

      // Function to fetch and display posts based on the search section
      function fetchAndDisplayPosts(url) {
        console.log(url);
        fetch(url, {
          method: "GET", // or 'POST', 'PUT', etc.
          mode: "cors", // Set the mode here
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((posts) => {
            // Clear previous search results
            searchResults.innerHTML = "";
            posts.reverse();
            // Display the search results
            posts.forEach((post) => {
              // Create a container for each post
              const postContainer = document.createElement("div");
              postContainer.className = "post-box"; // Assign a class for styling

              // Create and append the title
              const title = document.createElement("h3");
              title.textContent = post.title;
              postContainer.appendChild(title);

              // Create and append the author
              const author = document.createElement("p");
              author.textContent = `Author: ${post.author}`;
              postContainer.appendChild(author);
              if (searchSec == "Department") {
                const department = document.createElement("p");
                department.textContent = `Department: ${post.tab}`;
                postContainer.appendChild(department);
              }
              // Create and append the description
              const description = document.createElement("p");
              description.textContent = `Description: ${post.description}`;
              postContainer.appendChild(description);

              // Append the post container to the search results
              searchResults.appendChild(postContainer);
            });
          })
          .catch((error) => console.error("Error fetching posts:", error));
      }

      // Determine the URL based on the search section
      let url = DOMAIN_NAME;
      let searchUrl = `search=${encodeURIComponent(searchTerm)}`;
      if (searchTerm === "") {
        searchUrl = "";
      }
      if (searchSec == "Department") {
        url += `/posts/department?` + searchUrl;
      } else if (searchSec == "Selling") {
        url += `/posts/selling?` + searchUrl;
      } else if (searchSec == "Clubs") {
        url += `/posts/clubs?` + searchUrl;
      } else {
        url += `/posts?` + searchUrl;
      }

      // Fetch and display posts
      fetchAndDisplayPosts(url);
    });

  const makePostButton = document.getElementById("make-post-button");
  const departmentSelect = document.getElementById("department-select");
  const sectionName = document.getElementById("section-name");
  console.log(sectionName);
  makePostButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission
    let tab = searchSection.textContent;
    // Check if the current section is "Department"
    if (sectionName.textContent === "Department") {
      // Show the dropdown menu
      tab = departmentSelect.value;
      // You might want to add logic here to handle the form submission based on the selected department
    }
    // Proceed with the existing logic for other sections
    const title = document.getElementById("title-input").value;
    const description = document.getElementById("description").value;
    // Example value, adjust as needed

    // Construct the data object
    const data = {
      title: title,
      author: username, // Replace with actual author data
      description: description,
      tab: tab,
    };
    console.log(data);
    // Send POST request to the updated endpoint
    fetch(DOMAIN_NAME + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let event = new Event("click");
        windowCloser.dispatchEvent(event);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message
      });
    let fakeEvent = new Event("click");
    document.getElementById("search-button").dispatchEvent(fakeEvent);
  });

  let fakeEvent = new Event("click");
  document.getElementById("search-button").dispatchEvent(fakeEvent);
});
