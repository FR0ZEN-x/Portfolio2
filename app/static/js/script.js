'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// Testimonials modal functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Add click event to all modal items
if (testimonialsItem.length > 0) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      if (this.querySelector("[data-testimonials-avatar]")) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      }
      if (this.querySelector("[data-testimonials-title]")) {
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      }
      if (this.querySelector("[data-testimonials-text]")) {
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      }
      testimonialsModalFunc();
    });
  }
}

// Add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// Portfolio filter functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// Add event in all select items
if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// Filter variables and function
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  // Add event to all form input fields
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // Check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // WhatsApp integration
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="fullname"]')?.value || '';
    const email = document.querySelector('input[name="email"]')?.value || '';
    const message = document.querySelector('textarea[name="message"]')?.value || '';

    // Your WhatsApp number in international format (no + or dashes)
    const phone = '916303774539';

    // Build the text and encode it for URL
    const text = `New message from portfolio:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp chat
    window.open(url, '_blank');

    // Reset form
    form.reset();
    formBtn.setAttribute("disabled", "");
  });
}

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  // Add event to all nav links
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      // Remove active class from all pages and links
      for (let j = 0; j < pages.length; j++) {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }

      // Add active class to current page and link
      const targetPage = this.innerHTML.toLowerCase();
      for (let j = 0; j < pages.length; j++) {
        if (targetPage === pages[j].dataset.page) {
          pages[j].classList.add("active");
          this.classList.add("active");
          window.scrollTo(0, 0);
          break;
        }
      }
    });
  }
}

// Initialize active page based on URL
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'about';
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  navLinks.forEach(link => {
    const linkText = link.textContent.trim();
    // Special case for $$$ navigation link
    if ((linkText === '$$$' && currentPage === 'eidi') ||
        (linkText.toLowerCase() === currentPage)) {
      link.classList.add('active');
    }
  });

  // Add active class to the current page article
  pages.forEach(page => {
    if (page.dataset.page === currentPage) {
      page.classList.add('active');
    }
  });
});



// Testimonials slider line functionality
(function() {
  window.addEventListener('load', function() {
    const testimonialsList = document.querySelector('.testimonials-list');
    const testimonialItems = document.querySelectorAll('.testimonials-item');
    const testimonialsSection = document.querySelector('.testimonials');

    if (!testimonialsList || !testimonialsSection || testimonialItems.length <= 1) return;

    // Remove existing navigation buttons if any
    const existingButtons = testimonialsSection.querySelectorAll('.slider-nav-btn');
    existingButtons.forEach(btn => btn.remove());

    // Create slider indicators container
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slider-indicators';
    indicatorsContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
    `;

    // Create an indicator for each testimonial
    testimonialItems.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'slider-indicator';
      indicator.style.cssText = `
        width: 25px;
        height: 4px;
        background: var(--jet);
        border-radius: 2px;
        cursor: pointer;
        transition: background 0.3s ease;
      `;

      // Mark first indicator as active
      if (index === 0) {
        indicator.style.background = 'var(--orange-yellow-crayola)';
      }

      // Add click event to navigate to the corresponding testimonial
      indicator.addEventListener('click', () => {
        scrollToItem(index);
        updateIndicators(index);
      });

      indicatorsContainer.appendChild(indicator);
    });

    // Add indicators to the testimonials section
    testimonialsSection.appendChild(indicatorsContainer);

    // Initialize current index
    let currentIndex = 0;

    // Listen for scroll events to update the active indicator
    testimonialsList.addEventListener('scroll', () => {
      const itemWidth = testimonialItems[0].offsetWidth;
      const scrollPosition = testimonialsList.scrollLeft;
      currentIndex = Math.round(scrollPosition / itemWidth);
      updateIndicators(currentIndex);
    });

    // Function to update indicator states
    function updateIndicators(activeIndex) {
      const indicators = indicatorsContainer.querySelectorAll('.slider-indicator');
      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.style.background = 'var(--orange-yellow-crayola)';
        } else {
          indicator.style.background = 'var(--jet)';
        }
      });
    }

    // Function to scroll to specific item
    function scrollToItem(index) {
      const itemWidth = testimonialItems[0].offsetWidth;
      testimonialsList.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
      currentIndex = index;
    }

    // Optional: Auto-scroll functionality
    let autoScrollInterval;

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        scrollToItem(currentIndex);
        updateIndicators(currentIndex);
      }, 5000); // Change slide every 5 seconds
    }

    // Start auto-scroll
    startAutoScroll();

    // Pause auto-scroll when user interacts
    testimonialsList.addEventListener('mouseenter', () => {
      clearInterval(autoScrollInterval);
    });

    // Resume auto-scroll when user stops interacting
    testimonialsList.addEventListener('mouseleave', () => {
      startAutoScroll();
    });
  });
})();


// Handle sidebar responsiveness
(function() {
  // Get elements
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarInfoMore = document.querySelector(".sidebar-info_more");

  // Function to adjust sidebar visibility properly
  function handleSidebarResponsiveness() {
    if (window.innerWidth >= 1250) {
      // On large screens, always show the sidebar content
      if (sidebarInfoMore) {
        sidebarInfoMore.style.opacity = "1";
        sidebarInfoMore.style.visibility = "visible";
      }
    } else {
      // On small screens, respect the active state
      if (sidebarInfoMore && !sidebar.classList.contains("active")) {
        sidebarInfoMore.style.opacity = "";
        sidebarInfoMore.style.visibility = "";
      }
    }
  }

  // Run immediately when script loads
  handleSidebarResponsiveness();

  // Run after a small delay to ensure DOM is fully processed
  setTimeout(handleSidebarResponsiveness, 50);

  // Run on page load
  window.addEventListener('DOMContentLoaded', handleSidebarResponsiveness);
  window.addEventListener('load', handleSidebarResponsiveness);

  // Run when window is resized
  window.addEventListener('resize', handleSidebarResponsiveness);

  // Also run when sidebar toggle button is clicked
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function() {
      // Small delay to let the active class be applied first
      setTimeout(handleSidebarResponsiveness, 10);
    });
  }
})();

  // Script to trigger the hidden Razorpay button when our custom button is clicked
  document.addEventListener('DOMContentLoaded', function() {
    const customBtn = document.getElementById('custom-razorpay-btn');

    customBtn.addEventListener('click', function() {
      // Short delay to ensure Razorpay script is loaded
      setTimeout(function() {
        const razorpayBtn = document.querySelector('.razorpay-payment-button');
        if (razorpayBtn) {
          razorpayBtn.click();
        }
      }, 100);
    });
  });
