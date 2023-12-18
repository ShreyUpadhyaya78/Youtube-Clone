// import jsonData from '../assets/data/videosDB.json';

function disableScroll() {
  // Get the current page scroll position in the vertical direction
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Get the current page scroll position in the horizontal direction

  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // if any scroll is attempted,
  // set this to the previous value
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

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
    disableScroll();
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
      enableScroll();
    }
  });
});

//Notification Modal
document.addEventListener('DOMContentLoaded', function () {

  //Get the ids
  var bodyTag=document.getElementById('bodyTag');
  var notificationBtn = document.getElementById('notificationButton');
  var notificationModal = document.getElementById('notificationModal');

  //Event listener for when notificationBtn is clicked
  notificationBtn.addEventListener('click', function () {
    //When style block; set to none and vice versa
    notificationModal.style.display =
      notificationModal.style.display === 'block' ? 'none' : 'block';
    bodyTag.style.overflow='hidden';
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
      bodyTag.style.overflow = 'scroll';
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
  var copyInput = document.getElementById('shareURLInput');

//Select from input field
  copyInput.select();
  copyInput.setSelectionRange(0, 99999);

//Use clipboard api to copy the text
  try {
    
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

//Deselect input field
  copyInput.blur();
}

//WhatsApp share button function
function launchWhatsApp() {
  // Get the input value
  var inputValue = document.getElementById('shareURLInput').value;

  // Construct the WhatsApp URL
  var whatsappURL =
    'https://api.whatsapp.com/send?text=' + encodeURIComponent(inputValue);

  // Open the URL in a new tab
  window.open(whatsappURL, '_blank');
}
//Facebook share button function
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
//Twitter share button function
function launchTwitter() {
  // Get the input value
  var inputValue = document.getElementById('shareURLInput').value;

  // Construct the Twitter URL
  var twitterURL =
    'https://twitter.com/intent/tweet?text=' + encodeURIComponent(inputValue);

  // Open the URL in a new tab
  window.open(twitterURL, '_blank');
}

//Functions to toggle share popup
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
//Function to diable comment btn if input field is empty
function checkInput() {
  // Enable or disable the commentBtn based on input field value
  var commentInput = document.getElementById('commentInput');
  var commentBtn = document.getElementById('commentBtn');
  commentBtn.disabled = commentInput.value.trim() === ''; // Disable if empty or only whitespace
}
//Function to add new comment when comment btn is pressed
function addComment() {
  // Get the comment text from the input field
  var commentText = document.getElementById('commentInput').value;

  // Check if the input is not empty
  if (commentText.trim() !== '') {
    // Create a new comment article element
    var newComment = document.createElement('article');
    newComment.className = 'individual-comment';
    newComment.id = 'newComment';

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
    var commentsDisplay = document.getElementById('commentsDisplay');
    commentsDisplay.insertBefore(newComment, commentsDisplay.firstChild);

    // Clear the input field after adding the comment
    document.getElementById('commentInput').value = '';

    // Disable the commentBtn after adding a comment
    document.getElementById('commentBtn').disabled = true;
  }
}
//Clear the input field and disable comment btn when cancel btn pressed
function cancelComment() {
  // Clear the input field
  document.getElementById('commentInput').value = '';

  // Disable the commentBtn
  document.getElementById('commentBtn').disabled = true;
}
//Function to toggle reply popup
function toggleReplyPopup() {
  var replyPopup = document.getElementById('replyPopup');

  // Toggle the display property of the replyPopup
  if (replyPopup.style.display === 'none' || replyPopup.style.display === '') {
    replyPopup.style.display = 'block';
  } else {
    replyPopup.style.display = 'none';
  }
}
//Function to toggle sort popup
function toggleSortPopup() {
  var sortPopup = document.getElementById('sortPopup');
  var sortBtn = document.getElementById('sortBtn');
  var bodyTag = document.getElementById('bodyTag');
  // Toggle the display property of the sortPopup
  if (sortPopup.style.display === 'none' || sortPopup.style.display === '') {
    sortPopup.style.display = 'block';

    // Add a click event listener to close the popup when clicking outside
    document.addEventListener('click', closeSortPopupOutside);
  } else {
    sortPopup.style.display = 'none';
    // Remove the click event listener when closing the popup
    document.removeEventListener('click', closeSortPopupOutside);
  }
}
//Function to close sort popup when clicked outside of it
function closeSortPopupOutside(event) {
  var sortPopup = document.getElementById('sortPopup');
  var sortBtn = document.getElementById('sortBtn');
  var bodyTag = document.getElementById('bodyTag');
  // Check if the click is outside the sortPopup and the sortBtn
  if (!sortPopup.contains(event.target) && event.target !== sortBtn) {
    sortPopup.style.display = 'none';
    
    document.removeEventListener('click', closeSortPopupOutside);
  }
}

//Funtionality to sort comments 
document.addEventListener('DOMContentLoaded', function () {
  const commentsDisplay = document.getElementById('commentsDisplay');
  const newestFirstBtn = document.getElementById('newestFirstBtn');
  const topCommentsBtn = document.getElementById('topCommentsBtn');

  let originalOrder = Array.from(commentsDisplay.children);

  newestFirstBtn.addEventListener('click', function () {
    newestFirstBtn.style.backgroundColor = '#d0cece'; // Change background color
    topCommentsBtn.style.backgroundColor = '#ffffff';
//Sort the comments based on their timestamp using comparator function and querySelector
    const sortedComments = Array.from(commentsDisplay.children).sort((a, b) => {
      const timeA = parseInt(
        a.querySelector('.comment-time-number').textContent
      );
      const timeB = parseInt(
        b.querySelector('.comment-time-number').textContent
      );
      return timeA - timeB;
    });

    // commentsDisplay.innerHTML = ''; // Clear the current display
    sortedComments.forEach((comment) => commentsDisplay.appendChild(comment));
  });

  topCommentsBtn.addEventListener('click', function () {
    newestFirstBtn.style.backgroundColor = '#ffffff'; // Reset background color
    topCommentsBtn.style.backgroundColor = '#d0cece';
    // commentsDisplay.innerHTML = ''; // Clear the current display
    originalOrder.forEach((comment) => commentsDisplay.appendChild(comment));
  });
});
//Functionality to create recommended videos section from jsonData
document.addEventListener('DOMContentLoaded', function () {
  const videoCardDisplay = document.getElementById('videoCardDisplay');
  jsonData = [
    {
      id: 10,
      videoTitle: 'Mi Amor',
      duration: '3:23',
      imgSrc:
        'https://i.ytimg.com/vi/UZ_JZaNQrAw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAlajQN7dMoek6K04zYbxpnjP8DVQ',
      videoChannelName: 'Sharn - Topic',
      videoViews: '45M views',
      videoUploadTime: '7 months ago',
      category: 'Other',
      urlData: 'https://www.youtube.com/watch?v=UZ_JZaNQrAw',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/UZ_JZaNQrAw" title="Mi Amor" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 8,
      videoTitle: "Jacob's Prayer",
      duration: '1:35',
      imgSrc:
        'https://i.ytimg.com/vi/sw-XR-F6aXw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAR3SPShEQeSthdya_gHcQYTolvyg',
      videoChannelName: 'Emile Mosseri',
      videoViews: '144K views',
      videoUploadTime: '2 years ago',
      category: 'Emile',
      urlData: 'https://www.youtube.com/watch?v=sw-XR-F6aXw',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/sw-XR-F6aXw" title="Jacob&#39;s Prayer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 2,
      videoTitle: 'My Greedy Heart',
      duration: '3:19',
      imgSrc:
        'https://i.ytimg.com/vi/WoaUVyE_eZA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBjEUwqisn-hoRhF8QoNEQ5UB8CvA',
      videoChannelName: 'Emile Mosseri',
      videoViews: '9.2K views',
      videoUploadTime: '7 months ago',
      category: 'Emile',
      urlData: 'https://www.youtube.com/watch?v=WoaUVyE_eZA',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/WoaUVyE_eZA" title="My Greedy Heart" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> ',
    },
    {
      id: 7,
      videoTitle: 'Bombing California St.',
      duration: '1:32',
      imgSrc:
        'https://i.ytimg.com/vi/AI9L5N1DCyg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCqgivftjaVUutCatu9m8Gm3ov78g',
      videoChannelName: 'Emile Mosseri',
      videoViews: '40K views',
      videoUploadTime: '4 years ago',
      category: 'Emile',
      urlData: 'https://www.youtube.com/watch?v=AI9L5N1DCyg',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/AI9L5N1DCyg" title="Bombing California St." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 1,
      videoTitle: 'Can You Hear The Music',
      duration: '1:50',
      imgSrc:
        'https://i.ytimg.com/vi/4JZ-o3iAJv4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLB8DD0WpqRJ-mfsUOOu-FxaHXfhRA',
      videoChannelName: 'Ludwig Goransson',
      videoViews: '15M views',
      videoUploadTime: '4 months ago',
      category: 'Related',
      urlData: 'https://www.youtube.com/watch?v=4JZ-o3iAJv4',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/4JZ-o3iAJv4" title="Can You Hear The Music" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 6,
      videoTitle: 'Minari | Official Trailer HD | A24',
      duration: '2:05',
      imgSrc:
        'https://i.ytimg.com/vi/KQ0gFidlro8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBpZCCDCSsIQbEYuN0eT2znPNg1Cw',
      videoChannelName: 'A24',
      videoViews: '6.7M views',
      videoUploadTime: '3 years ago',
      category: 'Related',
      urlData: 'https://www.youtube.com/watch?v=KQ0gFidlro8',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/KQ0gFidlro8" title="Minari | Official Trailer HD | A24" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 9,
      videoTitle: 'green to blue',
      duration: '3:09',
      imgSrc:
        'https://i.ytimg.com/vi/bl1MKt0-XJo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLByuyrjs9kFqRxRTQIlw-jJ_n0anw',
      videoChannelName: 'daniel.mp3 - Topic',
      videoViews: '5.2M views',
      videoUploadTime: '1 year ago',
      category: 'Related',
      urlData: 'https://www.youtube.com/watch?v=bl1MKt0-XJo',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/bl1MKt0-XJo" title="green to blue" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 5,
      videoTitle: 'Ghost - Mary On A Cross',
      duration: '4:06',
      imgSrc:
        'https://i.ytimg.com/vi/8JMMjCyyznI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDxExOXmV5jkvZfwPEdvSudx-L4eQ',
      videoChannelName: 'LatinHype',
      videoViews: '56M views',
      videoUploadTime: '1 year ago',
      category: 'Other',
      urlData: 'https://www.youtube.com/watch?v=8JMMjCyyznI',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/8JMMjCyyznI" title="Ghost - Mary On A Cross" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 4,
      videoTitle: 'Euta Chhithi',
      duration: '5:05',
      imgSrc:
        'https://i.ytimg.com/vi/fMIWsRvHiZY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCaQu34IYfrvxFVPmVUqUwWm2cwWw    ',
      videoChannelName: 'The Axe - Topic',
      videoViews: '456K views',
      videoUploadTime: '8 months ago',
      category: 'Other',
      urlData: 'https://www.youtube.com/watch?v=fMIWsRvHiZY',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/fMIWsRvHiZY" title="Euta Chhithi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 3,
      videoTitle: 'La Caution - Thé à la Menthe - The Laser Dance Song',
      duration: '4:14',
      imgSrc:
        'https://i.ytimg.com/vi/k4Xx0k_TVY0/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AG-B4AC0AWKAgwIABABGH8gEygYMA8=&rs=AOn4CLDudZuz_Y7Y1ExDCxBsPBkm6GaHsg',
      videoChannelName: 'lacaution',
      videoViews: '14M views',
      videoUploadTime: '9 years ago',
      category: 'Other',
      urlData: 'https://www.youtube.com/watch?v=k4Xx0k_TVY0',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/k4Xx0k_TVY0" title="La Caution - Thé à la Menthe - The Laser Dance Song" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 11,
      videoTitle: 'Did I Stutter?',
      duration: '2:05',
      imgSrc:
        'https://i.ytimg.com/vi/CuxrwuhhOl8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBvHnjoJuKDj_V6rKTgumd2_AO9nQ',
      videoChannelName: 'beamglow - Topic',
      videoViews: '2.8M views',
      videoUploadTime: '1 year ago',
      category: 'Other',
      urlData: 'https://www.youtube.com/embed/CuxrwuhhOl8',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/CuxrwuhhOl8" title="Did I Stutter?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 12,
      videoTitle: 'Minari | The Beautiful Tragedy',
      duration: '11:08',
      imgSrc:
        'https://i.ytimg.com/an_webp/TwHVtrOeBxE/mqdefault_6s.webp?du=3000&sqp=CM6s9asG&rs=AOn4CLAUXOfZnJ4xLC2kwZxl6192aTbDIA',
      videoChannelName: 'Spikima Movies',
      videoViews: '241K views',
      videoUploadTime: '2 years ago',
      category: 'Related',
      urlData: 'https://www.youtube.com/watch?v=TwHVtrOeBxE',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/TwHVtrOeBxE" title="Minari | The Beautiful Tragedy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
    {
      id: 13,
      videoTitle: 'MACHIAVELLI: Be the Wolf Among Sheep',
      duration: '23:47',
      imgSrc:
        'https://i.ytimg.com/an_webp/dYRJmzYSTag/mqdefault_6s.webp?du=3000&sqp=CKDQ-qsG&rs=AOn4CLCr3dCLouxjebX5u-_E5iV5sAsLVQ',
      videoChannelName: 'Horses',
      videoViews: '1.4M views',
      videoUploadTime: '9 months ago',
      category: 'Other',
      urlData: 'https://www.youtube.com/watch?v=dYRJmzYSTag',
      iframeData:
        '<iframe width="853" height="480" src="https://www.youtube.com/embed/dYRJmzYSTag" title="MACHIAVELLI: Be the Wolf Among Sheep" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    },
  ];



const mainVideoPlayerContainer = document.getElementById(
  'mainVideoPlayerContainer'
);
const allCategoryBtn = document.getElementById('allCategory');
const emileCategoryBtn = document.getElementById('emileCategory');
const relatedCategoryBtn = document.getElementById('relatedCategory');

// Function to replace the iframe in #mainVideoPlayerContainer
function replaceIframe(iframeData) {
  mainVideoPlayerContainer.innerHTML = iframeData;
}

// Function to display articles based on category
function displayArticles(category) {
  videoCardDisplay.innerHTML = ''; // Clear existing articles

  // Filter articles based on category
  //When category all display all video cards
  const filteredArticles =
    category === 'All'
      ? jsonData
      : jsonData.filter((video) => video.category === category);

  // Create and append articles
  filteredArticles.forEach((video) => {
    const article = document.createElement('article');
    article.className = 'video-container';
    article.setAttribute('data-url', video.urlData);
    article.setAttribute('data-category', video.category);

    article.innerHTML = `
        <a href="#" class="thumbnail" data-duration="${video.duration}">
          <img src="${video.imgSrc}" alt="Thumbnail image" />
        </a>
        <div class="video-bottom-section">
          <div class="video-details">
            <a href="#" class="video-title">${video.videoTitle}</a>
            <a href="#" class="video-channel-name">${video.videoChannelName}</a>
            <div class="video-metadata">
              <span class="video-views">${video.videoViews}</span>
              •
              <span class="video-upload-time">${video.videoUploadTime}</span>
            </div>
          </div>
        </div>
      `;

    // Add click event listener to each article
    article.addEventListener('click', function () {
      // Update iframe based on the clicked article
      replaceIframe(video.iframeData);
    });

    videoCardDisplay.appendChild(article);
  });
}

// Add click event listeners to category buttons
allCategoryBtn.addEventListener('click', function () {
  displayArticles('All');
});

emileCategoryBtn.addEventListener('click', function () {
  displayArticles('Emile');
});

relatedCategoryBtn.addEventListener('click', function () {
  displayArticles('Related');
});

// Initial display of all articles
displayArticles('All');
});