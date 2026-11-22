/**
 * Basmagly Theme Engine
 * Controls Dark Mode, Light Mode, and Warm Sepia Reading Mode.
 */

(function () {
  function applyTheme(themeName) {
    const validTheme = ["dark", "light", "sepia"].includes(themeName) ? themeName : "light";
    document.documentElement.setAttribute("data-theme", validTheme);
    if (validTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("basmagly_theme", validTheme);
    updateThemeButtons(validTheme);
  }

  window.setBasmaglyTheme = function (themeName) {
    applyTheme(themeName);
    if (window.BasmaglyStorage) {
      window.BasmaglyStorage.setTheme(themeName);
    }
  };

  function updateThemeButtons(activeTheme) {
    document.querySelectorAll("[data-theme-btn]").forEach(btn => {
      const btnTheme = btn.getAttribute("data-theme-btn");
      if (btnTheme === activeTheme) {
        btn.classList.add("theme-btn-active");
      } else {
        btn.classList.remove("theme-btn-active");
      }
    });
  }

  // Initialize immediately
  const initialTheme = localStorage.getItem("basmagly_theme") || "light";
  document.documentElement.setAttribute("data-theme", initialTheme);
  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = localStorage.getItem("basmagly_theme") || "light";
    applyTheme(currentTheme);

    document.querySelectorAll("[data-theme-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        const selected = btn.getAttribute("data-theme-btn");
        window.setBasmaglyTheme(selected);
      });
    });
  });
})();
