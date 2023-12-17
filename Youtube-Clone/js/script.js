//Recent Search Modal
document.addEventListener('DOMContentLoaded', function () {
  //Get the ids
  var searchInputField = document.getElementById('searchInput');
  var recentSearchDiv = document.getElementById('recentSearchDiv');

  //Event listener for when input field is clicked
  searchInputField.addEventListener('focus', function () {
    recentSearchDiv.style.display = 'block';
  });

  //When clicked elsewhere than input field
  searchInputField.addEventListener('blur', function () {
    recentSearchDiv.style.display = 'none';
  });
});

//Upload Modal
document.addEventListener('DOMContentLoaded', function () {
  //Get the ids
  var uploadVideoBtn = document.getElementById('uploadVideoBtn');
  var uploadModal = document.getElementById('uploadModal');

  //Event listener for when uploadbtn is clicked
  uploadVideoBtn.addEventListener('click', function () {
    //When style block; set to none and vice versa
    uploadModal.style.display =
      uploadModal.style.display === 'block' ? 'none' : 'block';
    //When modal open lock the scroll
    document.body.classList.toggle('scroll-lock');
  });

  //When clicked outside the modal
  document.addEventListener('click', function (event) {
    //Check if click is not the modal, inside the modal and the button itself
    if (
      event.target !== uploadModal &&
      !uploadModal.contains(event.target) &&
      event.target !== uploadVideoBtn
    ) {
      uploadModal.style.display = 'none';
      //Scroll lock
      document.body.classList.remove('scroll-lock');
    }
  });
});

//Notification Modal
document.addEventListener('DOMContentLoaded', function () {
  //Get the ids
  var notificationBtn = document.getElementById('notificationButton');
  var notificationModal = document.getElementById('notificationModal');

  //Event listener for when uploadbtn is clicked
  notificationBtn.addEventListener('click', function () {
    //When style block; set to none and vice versa
    notificationModal.style.display =
      notificationModal.style.display === 'block' ? 'none' : 'block';
    //When modal open lock the scroll
    document.body.classList.toggle('scroll-lock');
  });

  //When clicked outside the modal
  document.addEventListener('click', function (event) {
    //Check if click is not the modal, inside the modal and the button itself
    if (
      event.target !== notificationModal &&
      !notificationModal.contains(event.target) &&
      event.target !== notificationBtn
    ) {
      notificationModal.style.display = 'none';
      //Scroll lock
      document.body.classList.remove('scroll-lock');
    }
  });
});

//Like-Dislike Button Functionality
document.addEventListener('DOMContentLoaded', function () {
  var likeBtn = document.getElementById('likeBtn');
  var dislikeBtn = document.getElementById('dislikeBtn');
  var likeCount = document.getElementById('likeCount');

  //Initially set both buttons to unclicked state
  var likeClicked = false;
  var dislikeClicked = false;

  //When like button is clicked
  likeBtn.addEventListener('click', function () {
    //If not already clicked
    if (!likeClicked) {
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
      likeBtn.classList.add('clicked');
      //If dislike button already clicked then unclick it
      if (dislikeClicked) {
        dislikeBtn.classList.remove('clicked');
        dislikeClicked = false;
      }
      //Set click state true
      likeClicked = true;
    }
    //If like button already in clicked state-> decrease count
    else {
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
      likeBtn.classList.remove('clicked');
      likeClicked = false;
    }
  });

  //When dislike button is clicked
  dislikeBtn.addEventListener('click', function () {
    //Set state to clicked if not already clicked
    if (!dislikeClicked) {
      dislikeBtn.classList.add('clicked');
      //Decrease like count and set it to unclicked when dislike clicked
      if (likeClicked) {
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        likeBtn.classList.remove('clicked');
        likeClicked = false;
      }

      dislikeClicked = true;
    }
    //If already clicked state->change to unclicked
    else {
      dislikeBtn.classList.remove('clicked');
      dislikeClicked = false;
    }
  });
});

//Copy URL function
function copyText() {
  /* Get the input field */
  var copyInput = document.getElementById('shareURLInput');

  /* Select the text field */
  copyInput.select();
  copyInput.setSelectionRange(0, 99999); /* For mobile devices */

  try {
    /* Copy the text inside the text field using the Clipboard API */
    navigator.clipboard
      .writeText(copyInput.value)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  } catch (err) {
    console.error('Clipboard API not supported', err);
  }

  /* Deselect the input field */
  copyInput.blur();
}
function toggleCheckbox() {
  var checkbox = document.getElementById('customCheckbox');
  checkbox.classList.toggle('checked');
}
function launchWhatsApp() {
  // Get the input value
  var inputValue = document.getElementById('shareURLInput').value;

  // Construct the WhatsApp URL
  var whatsappURL =
    'https://api.whatsapp.com/send?text=' + encodeURIComponent(inputValue);

  // Open the URL in a new tab
  window.open(whatsappURL, '_blank');
}
function launchFacebook() {
  // Get the input value
  var inputValue = document.getElementById('shareURLInput').value;

  // Construct the Facebook URL
  var facebookURL =
    'https://www.facebook.com/sharer/sharer.php?u=' +
    encodeURIComponent(inputValue);

  // Open the URL in a new tab
  window.open(facebookURL, '_blank');
}
function launchTwitter() {
  // Get the input value
  var inputValue = document.getElementById('shareURLInput').value;

  // Construct the Twitter URL
  var twitterURL =
    'https://twitter.com/intent/tweet?text=' + encodeURIComponent(inputValue);

  // Open the URL in a new tab
  window.open(twitterURL, '_blank');
}
function openPopup() {
  // Show the popup and overlay
  document.getElementById('sharePopup').style.display = 'block';
  document.getElementById('popupOverlay').style.display = 'block';
}

function closePopup() {
  // Hide the popup and overlay
  document.getElementById('sharePopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
}
function checkInput() {
      // Enable or disable the commentBtn based on input field value
      var commentInput = document.getElementById("commentInput");
      var commentBtn = document.getElementById("commentBtn");
      commentBtn.disabled = commentInput.value.trim() === ""; // Disable if empty or only whitespace
    }

    function addComment() {
      // Get the comment text from the input field
      var commentText = document.getElementById("commentInput").value;

      // Check if the input is not empty
      if (commentText.trim() !== "") {
        // Create a new comment article element
        var newComment = document.createElement("article");
        newComment.className = "individual-comment";
        newComment.id = "newComment";

        // Construct the HTML for the new comment
        newComment.innerHTML = `
          <div class="commenter-icon">
            <a href="#"><img src="assets/images/Main-Commenter-Profile.jpg" alt="Commenter icon" class="commenter-icon-img"/></a>
          </div>
          <div class="individual-comment-metadata">
            <div class="username-comment-time">
              <a href="#" class="username-comment-time-link">
                <span class="username"> @thisuser </span>
                <span class="comment-time"><span class="comment-time-number">0</span> seconds ago </span>
              </a>
            </div>
            <div class="comment-text" id="commentTextArea">
              ${commentText}
            </div>
            <div class="like-dislike-reply">
              <div class="comment-like-and-counter">
                <button class="comment-like-btn">
                  <img src="assets/images/like.png" alt="Comment Like Button"/>
                </button>
              </div>
              <button class="comment-dislike-btn">
                <img src="assets/images/dislike.png" alt="Comment Dislike Button"/>
              </button>
              <button class="comment-reply-btn">Reply</button>
            </div>
          </div>
        `;

        // Add the new comment to the beginning of the comments display area
        var commentsDisplay = document.getElementById("commentsDisplay");
        commentsDisplay.insertBefore(newComment, commentsDisplay.firstChild);

        // Clear the input field after adding the comment
        document.getElementById("commentInput").value = "";

        // Disable the commentBtn after adding a comment
        document.getElementById("commentBtn").disabled = true;
      }
    }

    function cancelComment() {
      // Clear the input field
      document.getElementById("commentInput").value = "";

      // Disable the commentBtn
      document.getElementById("commentBtn").disabled = true;
    }
function toggleReplyPopup() {
  var replyPopup = document.getElementById('replyPopup');

  // Toggle the display property of the replyPopup
  if (replyPopup.style.display === 'none' || replyPopup.style.display === '') {
    replyPopup.style.display = 'block';
  } else {
    replyPopup.style.display = 'none';
  }
}

    function toggleSortPopup() {
      var sortPopup = document.getElementById("sortPopup");
      var sortBtn = document.getElementById("sortBtn");

      // Toggle the display property of the sortPopup
      if (sortPopup.style.display === "none" || sortPopup.style.display === "") {
        sortPopup.style.display = "block";

        // Add a click event listener to close the popup when clicking outside
        document.addEventListener("click", closeSortPopupOutside);
      } else {
        sortPopup.style.display = "none";
        
        // Remove the click event listener when closing the popup
        document.removeEventListener("click", closeSortPopupOutside);
      }
    }

    function closeSortPopupOutside(event) {
      var sortPopup = document.getElementById("sortPopup");
      var sortBtn = document.getElementById("sortBtn");

      // Check if the click is outside the sortPopup and the sortBtn
      if (!sortPopup.contains(event.target) && event.target !== sortBtn) {
        sortPopup.style.display = "none";
        document.removeEventListener("click", closeSortPopupOutside);
      }
    }

document.addEventListener('DOMContentLoaded', function () {
  const commentsDisplay = document.getElementById('commentsDisplay');
  const newestFirstBtn = document.getElementById('newestFirstBtn');
  const topCommentsBtn = document.getElementById('topCommentsBtn');

  let originalOrder = Array.from(commentsDisplay.children);

  newestFirstBtn.addEventListener('click', function () {
    newestFirstBtn.style.backgroundColor = '#d0cece'; // Change background color
    topCommentsBtn.style.backgroundColor = '#ffffff';

    const sortedComments = Array.from(commentsDisplay.children).sort((a, b) => {
      const timeA = parseInt(
        a.querySelector('.comment-time-number').textContent
      );
      const timeB = parseInt(
        b.querySelector('.comment-time-number').textContent
      );
      return timeA - timeB;
    });

    commentsDisplay.innerHTML = ''; // Clear the current display
    sortedComments.forEach((comment) => commentsDisplay.appendChild(comment));
  });

  topCommentsBtn.addEventListener('click', function () {
    newestFirstBtn.style.backgroundColor = '#ffffff'; // Reset background color
    topCommentsBtn.style.backgroundColor = '#d0cece';
    commentsDisplay.innerHTML = ''; // Clear the current display
    originalOrder.forEach((comment) => commentsDisplay.appendChild(comment));
  });
});
