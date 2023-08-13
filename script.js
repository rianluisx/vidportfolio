
//projects

const videos = document.querySelector(".videos");
const videoplayer = document.querySelector(".videos .videoplayer");
const close = document.querySelector(".videos .close");

const playVideo = (googleDriveLink) => {
    videos.classList.add("active");
    const videoId = extractGoogleDriveVideoId(googleDriveLink);
    
    let width, height;
    
    // Define different resolutions based on media queries
    if (window.matchMedia("(max-width: 550px)").matches) {
        width = 320; // Adjust width for smaller screens
        height = 180; // Adjust height for smaller screens
    } else if (window.matchMedia("(max-width: 800px)").matches) {
        width = 450;
        height = 320;
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
        width = 820;
        height = 450;
    } else {
        width = 1280; // Default width for larger screens
        height = 720; // Default height for larger screens
    }
    
    const embeddableUrl = `https://drive.google.com/file/d/${videoId}/preview`;
    const iframe = `<iframe src="${embeddableUrl}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
    videoplayer.innerHTML = iframe;
}


close.addEventListener("click", () => {
    videos.classList.remove("active");
    videoplayer.innerHTML = ''; // Remove the iframe content
});

// Function to extract Google Drive video ID from a link
function extractGoogleDriveVideoId(link) {
    const regex = /\/file\/d\/([a-zA-Z0-9_-]+)\//;
    const match = link.match(regex);
    if (match && match[1]) {
        return match[1];
    } else {
        console.error("Invalid Google Drive link format");
        return null;
    }
}

//about script
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("content");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-title");    
    }

    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");    
    }

    event.currentTarget.classList.add("active-title");
    document.getElementById(tabname).classList.add("active-tab");
}

// sidebar

var sidebar = document.getElementById("sidebar");

function openmnu(){
    sidebar.style.right = "0";
}

function closemnu(){
    sidebar.style.right = "-200px";
}

// contacts 

const scriptURL = 'https://script.google.com/macros/s/AKfycbyyNzseZolYSz3qDPnCjgZkuJclBYOydmBB2aX1N213NhlBHSAkCz0iQmVJGa4B_SQx/exec'
const form = document.forms['submit-to-google-sheet']
const sent = document.getElementById("sent")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        sent.innerHTML = "Submitted Successfully!"
        setTimeout(function(){
            sent.innerHTML = ""
        }, 5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

//sticky navbar

const navbar = document.getElementById('navbar');

const navbarOffsetTop = navbar.offsetTop;

function toggleSticky() {
    if (window.pageYOffset >= navbarOffsetTop) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

window.addEventListener('scroll', toggleSticky);