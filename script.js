document.addEventListener("DOMContentLoaded", () => {
  let currentLanguage = "en";

  const langButtons = {
    en: document.getElementById("lang-en"),
    hi: document.getElementById("lang-hi"),
  };

  const contactForm = document.getElementById("contact-form");

  // Helper to get nested property from object
  const getNestedProperty = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const updateContent = (lang) => {
    const contentData = window.content[lang];
    if (!contentData) return;

    // Update all elements with data-lang-key
    document.querySelectorAll("[data-lang-key]").forEach((element) => {
      const key = element.getAttribute("data-lang-key");
      const value = getNestedProperty(contentData, key);
      if (value) {
        element.innerText = value;
      }
    });

    // --- Dynamic Content Population ---

    // 1. Nav Links
    const navContainer = document.getElementById("nav-links-container");
    navContainer.innerHTML = contentData.nav
      .map(
        (link) => `
      <a href="${link.href}" class="text-gray-700 hover:text-primary transition-colors font-semibold">
        ${link.label}
      </a>
    `
      )
      .join("");

    // 1b. Mobile Nav Links
    const mobileNavContainer = document.getElementById(
      "mobile-nav-links-container"
    );
    if (mobileNavContainer) {
      mobileNavContainer.innerHTML = contentData.nav
        .map(
          (link) => `
      <a href="${link.href}" class="text-gray-700 hover:text-primary transition-colors font-semibold text-lg py-2 block w-full text-center mobile-nav-link">
        ${link.label}
      </a>
    `
        )
        .join("");
    }

    // Update About Image
    const aboutImage = document.getElementById("about-image");
    if (aboutImage) aboutImage.src = contentData.about.image;

    // 2. About Stats
    const statsContainer = document.getElementById("about-stats-container");
    if (contentData.about.stats) {
      statsContainer.innerHTML = contentData.about.stats
        .map(
          (stat) => `
        <div class="bg-primary/10 p-4 rounded-lg shadow-md text-center">
          <p class="text-2xl font-bold text-secondary">${stat.value}</p>
          <p class="text-xs font-semibold text-neutral-dark uppercase tracking-wider">${stat.label}</p>
        </div>
      `
        )
        .join("");
    }

    // 3. About Details
    const detailsContainer = document.getElementById("about-details-container");
    detailsContainer.innerHTML = contentData.about.details
      .map(
        (detail) => `
      <li class="flex justify-between text-sm">
        <span class="font-semibold text-neutral-dark">${detail.label}:</span>
        <span class="text-gray-700 text-right">${detail.value}</span>
      </li>
    `
      )
      .join("");

    // 4. About Body
    const bodyContainer = document.getElementById("about-body-container");
    bodyContainer.innerHTML = contentData.about.body
      .map(
        (paragraph) => `
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">${paragraph}</p>
    `
      )
      .join("");

    // 5. Political Journey
    const journeyContainer = document.getElementById(
      "journey-timeline-container"
    );
    journeyContainer.innerHTML = contentData.journey.events
      .map(
        (event) => `
      <div class="timeline-item">
        <div class="timeline-dot bg-secondary"></div>
        <div class="pl-4">
          <time class="mb-1 text-sm font-semibold leading-none text-primary">${event.year}</time>
          <h3 class="text-lg font-bold text-secondary">${event.title}</h3>
          <p class="text-base font-normal text-gray-600">${event.description}</p>
        </div>
      </div>
    `
      )
      .join("");

    // 5. News Events
    const newsContainer = document.getElementById("news-events-container");
    newsContainer.innerHTML = contentData.news.events
      .map(
        (event) => `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
        <div class="p-6">
          <p class="text-sm text-gray-500 mb-2">${event.date}</p>
          <h3 class="font-bold text-lg mb-2 text-secondary">${event.title}</h3>
          <p class="text-gray-600 text-sm">${event.description}</p>
        </div>
      </div>
    `
      )
      .join("");

    // 6. Focus Areas
    const focusContainer = document.getElementById("focus-areas-container");
    focusContainer.innerHTML = contentData.focus.areas
      .map(
        (area) => `
      <div class="text-center p-4">
        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="${area.icon}"></path>
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2 text-secondary">${area.title}</h3>
      </div>
    `
      )
      .join("");

    // 7. Achievements
    const achievementsContainer = document.getElementById(
      "achievements-container"
    );
    achievementsContainer.innerHTML = contentData.achievements.achievements
      .map(
        (item) => `
      <div class="flex items-start space-x-4">
        <div>
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}"></path>
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-lg">${item.title}</h3>
          <p class="text-white/80">${item.description}</p>
        </div>
      </div>
    `
      )
      .join("");

    // 8. Gallery
    const galleryContainer = document.getElementById(
      "gallery-images-container"
    );
    galleryContainer.innerHTML = contentData.gallery.images
      .map(
        (image) => `
      <img src="${image}" alt="Gallery image" class="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    `
      )
      .join("");

    // 9. Social Links
    const socialContainer = document.getElementById("social-links-container");
    socialContainer.innerHTML = contentData.contact.socialLinks
      .map(
        (link) => `
      <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-primary transition-transform transform hover:scale-110">
        <span class="sr-only">${link.name}</span>
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="${link.path}"></path>
        </svg>
      </a>
    `
      )
      .join("");
  };

  const setLanguage = (lang) => {
    currentLanguage = lang;
    updateContent(lang);

    // Update button styles
    if (lang === "en") {
      langButtons.en.classList.add("bg-secondary", "text-white");
      langButtons.en.classList.remove("bg-white", "text-secondary");
      langButtons.hi.classList.add("bg-white", "text-secondary");
      langButtons.hi.classList.remove("bg-secondary", "text-white");
    } else {
      langButtons.hi.classList.add("bg-secondary", "text-white");
      langButtons.hi.classList.remove("bg-white", "text-secondary");
      langButtons.en.classList.add("bg-white", "text-secondary");
      langButtons.en.classList.remove("bg-secondary", "text-white");
    }
  };

  // Language toggle listeners
  langButtons.en.addEventListener("click", () => setLanguage("en"));
  langButtons.hi.addEventListener("click", () => setLanguage("hi"));

  // Contact form listener
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitLabel = document.querySelector(
      '[data-lang-key="contact.formSubmitLabel"]'
    );
    const originalText = submitLabel.innerText;
    alert(
      currentLanguage === "en"
        ? "Thank you for your message!"
        : "आपके संदेश के लिए धन्यवाद!"
    );
    contactForm.reset();
  });

  // Initial content load
  setLanguage(currentLanguage);

  // Intersection Observer for fade-in sections
  const sections = document.querySelectorAll(".fade-in-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // --- Hero Slideshow ---
  const setupHeroSlideshow = () => {
    const slideshowContainer = document.getElementById("hero-slideshow");
    if (!slideshowContainer) return;

    // Use a different set of images for the slideshow
    const images = window.content?.en?.gallery?.images || [];

    images.forEach((imgSrc, index) => {
      const slide = document.createElement("div");
      slide.className = "hero-slide";
      slide.style.backgroundImage = `url('${imgSrc}')`;
      slideshowContainer.appendChild(slide);
    });

    const slides = slideshowContainer.querySelectorAll(".hero-slide");
    let currentSlide = 0;

    if (slides.length > 0) {
      slides[currentSlide].style.opacity = 1; // Show the first slide

      setInterval(() => {
        slides[currentSlide].style.opacity = 0; // Fade out current
        currentSlide = (currentSlide + 1) % slides.length; // Move to next
        slides[currentSlide].style.opacity = 1; // Fade in next
      }, 5000); // Change image every 5 seconds
    }
  };

  setupHeroSlideshow();

  // --- Mobile Menu Logic ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        // Small delay to allow display:block to apply before transition
        setTimeout(() => {
          mobileMenu.classList.remove("scale-y-0", "opacity-0");
          mobileMenu.classList.add("scale-y-100", "opacity-100");
        }, 10);
      } else {
        mobileMenu.classList.remove("scale-y-100", "opacity-100");
        mobileMenu.classList.add("scale-y-0", "opacity-0");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300); // Match transition duration
      }
    });

    // Close menu when clicking a link
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("mobile-nav-link")) {
        mobileMenu.classList.remove("scale-y-100", "opacity-100");
        mobileMenu.classList.add("scale-y-0", "opacity-0");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    });
  }
});
