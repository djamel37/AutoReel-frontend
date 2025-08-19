// script.js
async function generateReel() {
  const text = document.getElementById("inputText").value;
  const status = document.getElementById("status");
  const video = document.getElementById("resultVideo");

  if (!text.trim()) {
    status.innerText = "⚠️ Please enter some text first.";
    return;
  }

  status.innerText = "⏳ Generating reel, please wait...";

  try {
    const res = await fetch("https://autoreel-server.onrender.com/api/generate-reel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!res.ok) throw new Error("Server error");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    video.src = url;
    video.style.display = "block";
    status.innerText = "✅ Reel generated successfully!";
  } catch (err) {
    status.innerText = "❌ Error: " + err.message;
  }
}
