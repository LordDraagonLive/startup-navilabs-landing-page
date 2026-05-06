const SELECTORS = {
  copiedStatus: "copied",
  emailInput: "email",
  emailCopyForm: "emailCopyForm",
  menu: "mobileMenu",
  menuToggle: "menuToggle",
  themeToggle: "themeToggle",
  year: "year",
};

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById(SELECTORS.themeToggle);
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  if (savedTheme === "light" || (!savedTheme && prefersLight)) {
    root.classList.add("light");
  }

  toggle?.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem(
      "theme",
      root.classList.contains("light") ? "light" : "dark",
    );
  });
}

function initEmailCopy() {
  const form = document.getElementById(SELECTORS.emailCopyForm);
  const input = document.getElementById(SELECTORS.emailInput);
  const status = document.getElementById(SELECTORS.copiedStatus);

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!(input instanceof HTMLInputElement)) return;

    try {
      await navigator.clipboard.writeText(input.value);
    } catch {
      input.select();
      input.setSelectionRange(0, input.value.length);
      document.execCommand("copy");
    }

    if (status) {
      status.hidden = false;
      window.setTimeout(() => {
        status.hidden = true;
      }, 1200);
    }
  });
}

function initCurrentYear() {
  const year = document.getElementById(SELECTORS.year);
  if (year) year.textContent = String(new Date().getFullYear());
}

function initMobileMenu() {
  const toggle = document.getElementById(SELECTORS.menuToggle);
  const menu = document.getElementById(SELECTORS.menu);

  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === "A") setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

initThemeToggle();
initEmailCopy();
initCurrentYear();
initMobileMenu();
