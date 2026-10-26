//Nesse projeto eu utilizei IA no CSS, pois eu não lembro dos códigos do CSS que tem que usar, no Java eu utilizei para gerar a parte do tema claro e escuro e para gerar a parte do formulário de contato e No HTML eu usei para corrigir erros dos códigos.
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "Claro";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Claro" : "Escuro";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Ativar tema claro" : "Ativar tema escuro"
  );
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

document.getElementById("year").textContent = new Date().getFullYear();

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "";
  feedback.className = "form__feedback";

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();
  const lgpd = form.lgpd.checked;

  if (nome.length < 3) {
    mostrarErro("Informe um nome com pelo menos 3 caracteres.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarErro("Informe um e-mail válido.");
    return;
  }

  if (mensagem.length < 10) {
    mostrarErro("A mensagem deve ter pelo menos 10 caracteres.");
    return;
  }

  if (!lgpd) {
    mostrarErro("É necessário aceitar o uso dos dados conforme a LGPD.");
    return;
  }

  feedback.textContent = "Mensagem validada com sucesso!";
  feedback.classList.add("success");
  form.reset();
});

function mostrarErro(texto) {
  feedback.textContent = texto;
  feedback.classList.add("error");
}

const sections = document.querySelectorAll(".section, .hero");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});