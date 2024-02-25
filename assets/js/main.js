/* Introduction */
function applyScaleAndFadeAnimation(element) {
    element.style.animation = 'scaleAndFade 2s ease-in-out forwards';
    element.style.opacity = 1; // This might not be necessary if animation is set to 'forwards'
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const header = document.querySelector('header');
    const paths = document.querySelectorAll('path[id^="path"]');
    const svgContainer = document.querySelector('svg'); // Assuming the SVG is directly contained within the loader or appropriately targeted
    const heroIdx = document.querySelector('.hero'); // Corrected selector for hero index
    const services = document.querySelector('#services'); // Assuming you have a services section
    const heroContent = document.querySelector('.hero-content');

    if (!sessionStorage.getItem('animationsPlayed')) {
        loader.style.visibility = 'visible';
  
        // Sequentially animate SVG letters
        const svgAnimationDelay = paths.length * 70; // Calculate based on number of paths and delay between them
        paths.forEach((path, index) => {
            setTimeout(() => {
                path.style.opacity = 1;
            }, index * 70);
        });
  
        setTimeout(() => {
            applyScaleAndFadeAnimation(svgContainer); // Apply scale and fade to the entire SVG container
  
            const fadeInStartDelay = 200;

            setTimeout(() => {
                heroIdx.style.opacity = 1;
                heroIdx.style.animation = 'fadeIn 2s ease-in-out forwards';
            }, fadeInStartDelay);
            
            setTimeout(() => {
                heroContent.style.opacity = 1;
                heroContent.style.animation = 'fadeIn 2s ease-in-out forwards';
            }, fadeInStartDelay*8);
            
            setTimeout(() => {
                header.style.opacity = 1;
                header.style.animation = 'fadeIn 2s ease-in-out forwards';
            }, fadeInStartDelay*12);
  
            setTimeout(() => {
                services.style.opacity = 1;
                services.style.animation = 'fadeIn 2s ease-in-out forwards';
            }, fadeInStartDelay*12); 
  
        }, svgAnimationDelay);
  
        loader.addEventListener('animationend', () => {
            loader.style.visibility = 'hidden';
            sessionStorage.setItem('animationsPlayed', 'true');
        });
  
    } else {
        // If animations have already played in the session
        loader.style.display = 'none';
        header.style.opacity = 1;
        heroIdx.style.opacity = 1;
        services.style.opacity = 1;
        heroContent.style.opacity = 1;
    }
  });
  

/* Burger menu and nav display */
document.addEventListener('DOMContentLoaded', function() {
    // Select the checkbox
    const menuToggle = document.getElementById('burger');
    // Select the menu
    const mainNav = document.querySelector('.mainNav');

    // Listen for changes on the checkbox
    menuToggle.addEventListener('change', function() {
        // Check if the checkbox is checked
        if (this.checked) {
            // Add the class to show the menu
            mainNav.classList.add('nav-active');
        } else {
            // Remove the class to hide the menu
            mainNav.classList.remove('nav-active');
        }
    });
});

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyOn() {
    // Get the header
    var header = document.querySelector("header");
    // Get the offset position of the navbar
    var sticky = header.offsetTop;
    
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        
    } else {
        header.classList.remove("sticky");
    }
}

// When the user scrolls the page, execute stickyOn
window.onscroll = function() {stickyOn()};


/* Multilingual support */

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`assets/languages/${lang}.json`);
    return response.json();
  }
  
 // Function to set the language preference
 function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }
  
 // Function to update content based on selected language
 function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = langData[key];
    });
  }
  
 // Function to change language
 async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
  }
 
 // Call updateContent() on page load
 window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
  });

// Function to smoothly scroll to a specific element on the page
function smoothScrollTo(elementId) {
  const targetElement = document.getElementById(elementId);
  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Auto-generate the service navigation items from a JSON file
function createNavItemsFromJson(jsonPath) {
    fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        // Adjusting based on the data structure; assuming data.items is the array
        const itemsArray = data.items || [];
        const storiesNavMenu = document.querySelector('.stories-nav-menu');
        const storiesNavMenuHeader = document.querySelector('.stories-nav-menu-header');

        if (storiesNavMenu){
          itemsArray.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'prod';
            listItem.id = item.id;
            const circleDiv = document.createElement('div');
            circleDiv.className = 'circle';
            circleDiv.style.backgroundImage = `url('assets/images/service_icons/${item.imagePath}')`;
            const prodLink = document.createElement('a');
            prodLink.className = 'prod-link';

            prodLink.href = item.prodLink;
            prodLink.appendChild(circleDiv);

            listItem.appendChild(prodLink);
            // Create the prod-name div and add it to the listItem
            const prodNameDiv = document.createElement('div');
            prodNameDiv.className = 'prod-name';
            prodNameDiv.dataset.i18n = item.prodNameData;
            listItem.appendChild(prodNameDiv);

            // Append the fully constructed listItem to the navigation menu
            storiesNavMenu.appendChild(listItem);

          });      
        
        }

        if (storiesNavMenuHeader){
          itemsArray.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'prod';
            listItem.id = item.id;
            const circleDiv = document.createElement('div');
            circleDiv.className = 'circle';
            circleDiv.style.backgroundImage = `url('assets/images/service_icons/${item.imagePath}')`;
            const prodLink = document.createElement('a');
            prodLink.className = 'prod-link';
            prodLink.href = item.prodLink;
            prodLink.appendChild(circleDiv);

            listItem.appendChild(prodLink);
            // Create the prod-name div and add it to the listItem
            const prodNameDiv = document.createElement('div');
            prodNameDiv.className = 'prod-name';
            prodNameDiv.dataset.i18n = item.prodNameData;
            listItem.appendChild(prodNameDiv);

            // Append the fully constructed listItem to the navigation menu
            storiesNavMenuHeader.appendChild(listItem);

          });      
        }

        
      })
      .catch(error => console.error('Error creating navigation items:', error));
}

createNavItemsFromJson("assets/inc/services.json");

const serviceBtn = document.getElementById('serviceButton');
if (serviceBtn) {
    serviceBtn.addEventListener('click', function() {
        const storiesNavMenu = document.querySelector('.stories-nav-menu-header');
        /* Check if the service menu has not fadeInServiceMenu class*/
        if (!storiesNavMenu.classList.contains('fadeInServiceMenu')) {
            storiesNavMenu.classList.add('fadeInServiceMenu');
        }
        else {
            storiesNavMenu.classList.add('fadeOutServiceMenu');
            setTimeout(function() {
                storiesNavMenu.classList.remove('fadeInServiceMenu');
                storiesNavMenu.classList.remove('fadeOutServiceMenu');
            }, 500);
           
        }
        
    });
}


/* Hero slideshow */
function initializeHeroSlideshow() {
  // Define the array of image filenames
  const imageFilenames = ['DSC08946 (Website).jpg', 'DSC08988 (Website).jpg', 'DSC08941 (Website).jpg', 'DSC08956 (Website).jpg', 'DSC08978 (Website).jpg', 'DSC08945 (Website).jpg', 'DSC08972 (Website).jpg', 'DSC08995 (Website).jpg', 'DSC08982 (Website).jpg', 'DSC08986 (Website).jpg', 'DSC08991 (Website).jpg', 'DSC09001 (Website).jpg', 'DSC08981 (Website).jpg', 'DSC08996 (Website).jpg', 'DSC08975 (Website).jpg', 'DSC08948 (Website).jpg', 'DSC08971 (Website).jpg', 'DSC08966 (Website).jpg', 'DSC08939 (Website).jpg', 'DSC08993 (Website).jpg', 'DSC09000 (Website).jpg', 'DSC08980 (Website).jpg', 'DSC08970 (Website).jpg', 'DSC08949 (Website).jpg', 'DSC08973 (Website).jpg', 'DSC08977 (Website).jpg', 'DSC08990 (Website).jpg', 'DSC08987 (Website).jpg', 'DSC08983 (Website).jpg', 'DSC08989 (Website).jpg', 'DSC08944 (Website).jpg', 'DSC08953 (Website).jpg', 'DSC08979 (Website).jpg', 'DSC08940 (Website).jpg', 'DSC08947 (Website).jpg'];

  document.addEventListener('DOMContentLoaded', () => {
      const slideshow = document.getElementById('hero-slideshow');

      // Dynamically create .hero-slides divs with images
      imageFilenames.forEach((filename, index) => {
          let slide = document.createElement('div');
          slide.className = 'hero-slides fade';
          let img = document.createElement('img');
          img.src = `assets/images/ccm_images/${filename}`;
          img.alt = `Slide ${index + 1}`;
          slide.appendChild(img);
          slideshow.appendChild(slide);
      });

      showSlides();
  });

  let slideIndex = 0;

  function showSlides() {
      let slides = document.getElementsByClassName("hero-slides");
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.opacity = "0";
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1; }
      slides[slideIndex - 1].style.opacity = "1";
      setTimeout(showSlides, 4000); // Change image every 4 seconds
  }
}

initializeHeroSlideshow();