let user = "";
let userColor = randomColor();

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, text, color: userColor })
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
    const div = document.createElement("div");
    div.className = "msg " + (m.user === user ? "me" : "other");

    div.innerHTML = `
      <div class="user" style="color:${m.color || "#38bdf8"}">${m.user}</div>
      <div>${m.text}</div>
    `;

    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

function randomColor() {
  const colors = ["#38bdf8", "#a78bfa", "#fb7185", "#34d399", "#facc15"];
  return colors[Math.floor(Math.random() * colors.length)];
}
