
let user = "";

function startChat() {
  user = document.getElementById("username").value;
  if (!user) return alert("Isi nama dulu!");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");
  loadMessages();
  setInterval(loadMessages, 2000);
}

async function sendMessage() {
  const text = document.getElementById("text").value;
  if (!text) return;
  await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ user, text })
  });
  document.getElementById("text").value = "";
  loadMessages();
}

async function loadMessages() {
  const res = await fetch("/api/chat");
  const data = await res.json();
  const box = document.getElementById("messages");
  box.innerHTML = "";
  data.forEach(m => {
    box.innerHTML += `<div class="msg"><span>${m.user}</span>: ${m.text}</div>`;
  });
  box.scrollTop = box.scrollHeight;
}
