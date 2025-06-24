ecowarriors.js
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
let teamIndex = 0;
let autoSlideInterval;
const cardsPerSlide = () => {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
};

function slideTeam(direction) {
  const track = document.getElementById("teamTrack");
  const cards = document.querySelectorAll(".team-card");
  const totalCards = cards.length;
  const visible = cardsPerSlide();
  const maxIndex = Math.ceil(totalCards / visible) - 1;

  teamIndex += direction;
  if (teamIndex < 0) teamIndex = maxIndex;
  if (teamIndex > maxIndex) teamIndex = 0;

  const slideWidth = track.offsetWidth / totalCards * visible;
  const offset = teamIndex * slideWidth;
  track.style.transform = `translateX(-${offset}px)`;
}

// Scroll-triggered animation for headings
function revealAnimatedHeadings() {
  const headings = document.querySelectorAll('.animated-heading');
  const triggerPoint = window.innerHeight * 0.85;

  headings.forEach(heading => {
    const headingTop = heading.getBoundingClientRect().top;

    if (headingTop < triggerPoint) {
      heading.classList.add('visible');
    }
  });
}

// Run on scroll and page load
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavLink() {
  let scrollPos = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

const track = document.getElementById("teamTrack");
  const card   = track.querySelector(".team-card");
  const gap    = 16; // must match your CSS `gap: 1rem` (16px) or whatever you chose
  const step   = card.offsetWidth + gap;

  // manual scroll (arrow buttons)
  function slideTeam(direction) {
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  // autoplay logic
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      // if we've reached (or passed) the end, jump back to start
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3000); // every 3 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // kick it off
  startAutoPlay();

  // pause on hover, resume on leave
  track.addEventListener("mouseenter", stopAutoPlay);
  track.addEventListener("mouseleave", startAutoPlay);