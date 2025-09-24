// ========== Helpers ==========
const $ = (sel) => document.querySelector(sel);

function setYear() {
  $("#year").textContent = new Date().getFullYear();
}

// Fill welcome text from name (from localStorage or form submit)
function setWelcomeName(name) {
  const target = $("#welcome");
  target.textContent = name ? `Hi ${name}, Welcome To Website` : "Hi, Welcome To Website";
}

// Validate phone number (simple Indonesian mobile pattern, flexible)
function isValidPhone(phone) {
  // Accepts numbers with optional spaces/dashes, must start with 08 or +62
  const cleaned = phone.replace(/[^\d+]/g, "");
  const reID = /^(\+62|0)8\d{8,12}$/;
  return reID.test(cleaned);
}

// ========== Form Handling ==========
function initForm() {
  const form = $("#contactForm");
  const errorEl = $("#formError");
  const output = $("#output");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const msg = $("#msg").value.trim();

    // Basic validation
    if (!name || !email || !phone || !msg) {
      errorEl.textContent = "Please fill in all fields.";
      return;
    }
    if (!form.checkValidity()) {
      errorEl.textContent = "Please provide a valid email.";
      return;
    }
    if (!isValidPhone(phone)) {
      errorEl.textContent = "Please enter a valid Indonesian phone number (start with 08 or +62).";
      return;
    }

    // Success: show results in the right panel
    const submittedAt = new Date().toLocaleString();
    output.innerHTML = `
      <div class="kv">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${msg}</p>
        <p><strong>Submitted At:</strong> ${submittedAt}</p>
      </div>
    `;

    // Update greeting and remember name for next visit
    setWelcomeName(name);
    localStorage.setItem("cc_name", name);

    // Optionally clear the form (comment out if not desired)
    form.reset();
  });

  // Live-update welcome as user types their name (nice touch)
  $("#name").addEventListener("input", (e) => {
    setWelcomeName(e.target.value.trim());
  });
}

// ========== Init ==========
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initForm();
  const saved = localStorage.getItem("cc_name");
  if (saved) setWelcomeName(saved);
});
