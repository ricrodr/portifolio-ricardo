(() => {
  "use strict";

  const header = document.getElementById("navbar");
  const toggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const mobile = window.matchMedia("(max-width: 700px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setMenu(open, returnFocus = false) {
    navLinks.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("span").textContent = open ? "Fechar" : "Menu";
    if (returnFocus) toggle.focus();
  }

  toggle.hidden = false;
  header.classList.add("js-menu");
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    setMenu(false);
    if (mobile.matches) {
      const section = document.querySelector(link.hash);
      if (section) {
        section.setAttribute("tabindex", "-1");
        section.focus({ preventScroll: true });
        section.addEventListener(
          "blur",
          () => section.removeAttribute("tabindex"),
          { once: true },
        );
      }
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    )
      setMenu(false, true);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  header.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !header.contains(event.relatedTarget))
      setMenu(false);
  });
  mobile.addEventListener("change", () => setMenu(false));

  const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks.map((link) =>
    document.querySelector(link.hash),
  );
  let scrollQueued = false;
  function updateNavigation() {
    header.classList.toggle("scrolled", window.scrollY > 12);
    const activationLine = header.offsetHeight + 100;
    let currentId = "";
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationLine)
        currentId = section.id;
    }
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 8
    )
      currentId = "contato";
    sectionLinks.forEach((link) => {
      if (link.hash === `#${currentId}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollQueued = false;
  }
  function scheduleNavigationUpdate() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(updateNavigation);
  }
  window.addEventListener("scroll", scheduleNavigationUpdate, {
    passive: true,
  });
  window.addEventListener("resize", scheduleNavigationUpdate, {
    passive: true,
  });
  window.addEventListener("load", updateNavigation, { once: true });
  updateNavigation();

  // Keep every project readable when JavaScript is unavailable.
  const toolbar = document.getElementById("projectToolbar");
  const filters = [...toolbar.querySelectorAll("[data-filter]")];
  const projects = [...document.querySelectorAll(".project")];
  const count = document.getElementById("projectCount");
  toolbar.hidden = false;
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filters.forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle("active", active);
        filter.setAttribute("aria-pressed", String(active));
      });
      let visible = 0;
      projects.forEach((project) => {
        project.hidden =
          category !== "todos" && project.dataset.category !== category;
        if (!project.hidden) visible += 1;
      });
      count.textContent = `${String(visible).padStart(2, "0")} ${visible === 1 ? "projeto ou frente" : "projetos e frentes"}`;
      scheduleNavigationUpdate();
    });
  });
  document
    .querySelectorAll(".project-details")
    .forEach((details) =>
      details.addEventListener("toggle", scheduleNavigationUpdate),
    );

  // A deterministic local demo: no requests, real records, or invented client metrics.
  const run = document.getElementById("runDemo");
  const runLabel = document.getElementById("runLabel");
  const runIcon = document.getElementById("runIcon");
  const message = document.getElementById("demoMessage");
  const steps = [...document.querySelectorAll("[data-step]")];
  const demoRecords = [
    { id: "DEMO-01", value: "125,50" },
    { id: "DEMO-02", value: "80,00" },
    { id: "DEMO-03", value: "240,75" },
  ];
  let running = false;
  const wait = () =>
    new Promise((resolve) =>
      window.setTimeout(resolve, reducedMotion.matches ? 0 : 800),
    );
  run.hidden = false;

  run.addEventListener("click", async () => {
    if (running) return;
    running = true;
    run.disabled = true;
    runLabel.textContent = "Automação em andamento";
    runIcon.textContent = "↻";
    steps.forEach((step) => step.classList.remove("is-active", "is-complete"));
    try {
      steps[0].classList.add("is-active");
      message.textContent = "Coletando 3 registros de demonstração…";
      await wait();
      const records = demoRecords.map((record) => ({ ...record }));
      steps[0].classList.replace("is-active", "is-complete");
      steps[1].classList.add("is-active");
      message.textContent = "Validando campos e padronizando valores…";
      await wait();
      const normalized = records.map((record) => ({
        ...record,
        value: Number(record.value.replace(",", ".")),
      }));
      if (
        !normalized.every(
          (record) => record.id && Number.isFinite(record.value),
        )
      )
        throw new Error("Invalid demo record");
      steps[1].classList.replace("is-active", "is-complete");
      steps[2].classList.add("is-active");
      message.textContent = "Integrando os dados à saída local…";
      await wait();
      const output = JSON.stringify({
        records: normalized,
        status: "complete",
      });
      const result = JSON.parse(output);
      steps[2].classList.replace("is-active", "is-complete");
      message.textContent = `Pronto! ${result.records.length} registros processados nesta simulação.`;
      runLabel.textContent = "Executar novamente";
      runIcon.textContent = "↻";
    } catch {
      steps.forEach((step) =>
        step.classList.remove("is-active", "is-complete"),
      );
      message.textContent = "Não foi possível concluir. Tente novamente.";
      runLabel.textContent = "Tentar novamente";
      runIcon.textContent = "▶";
    } finally {
      run.disabled = false;
      running = false;
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
