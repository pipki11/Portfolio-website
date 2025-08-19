// Theme toggle and nav interactions
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const yearSpan = document.getElementById("year");

  // Year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Persist theme
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.classList.add("light");

  function setIcon() {
    const isLight = root.classList.contains("light");
    themeToggle.innerHTML = isLight
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }
  setIcon();

  themeToggle?.addEventListener("click", () => {
    root.classList.toggle("light");
    const mode = root.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", mode);
    setIcon();
  });

  navToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close nav when clicking a link (mobile)
  navLinks?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Portfolio CV download/open handler
  const portfolioLink = document.getElementById("portfolioLink");
  if (portfolioLink) {
    portfolioLink.addEventListener("click", async (e) => {
      // Allow default if user holds modifier keys or middle-click
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      try {
        const resp = await fetch(portfolioLink.getAttribute("href"));
        if (!resp.ok) throw new Error("Network response was not ok");
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        // open in new tab
        window.open(url, "_blank");
        // trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = "cv.tex";
        document.body.appendChild(a);
        a.click();
        a.remove();
        // release object URL after a short delay
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      } catch (err) {
        // fallback: navigate to the link so browser handles it
        window.location.href = portfolioLink.getAttribute("href");
      }
    });
  }
})();
