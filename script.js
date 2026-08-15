const feelingInput = document.getElementById("feelingInput");
const gutter = document.getElementById("gutter");
const charCount = document.getElementById("charCount");
const runBtn = document.getElementById("runBtn");
const terminal = document.getElementById("terminal");
const statusBadge = document.getElementById("statusBadge");
const idleCursor = document.getElementById("idleCursor");

function updateGutter() {
  const lines = feelingInput.value.split("\n").length;
  gutter.innerHTML = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join("");
}

function updateCharCount() {
  charCount.textContent = `${feelingInput.value.length} belgi`;
}

feelingInput.addEventListener("input", () => {
  updateGutter();
  updateCharCount();
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function appendLine(text, className) {
  const p = document.createElement("p");
  p.className = `term-line ${className || ""}`.trim();
  p.textContent = text;
  terminal.insertBefore(p, terminal.lastElementChild);
  terminal.scrollTop = terminal.scrollHeight;
}

async function runCompileAnimation() {
  terminal.innerHTML = `<span class="cursor" id="idleCursor">█</span>`;
  const steps = [
    ["$ compiling emotional_state.txt ...", "term-muted"],
    ["$ parsing tokens ...", "term-muted"],
    ["$ running static analysis ...", "term-muted"]
  ];
  for (const [text, cls] of steps) {
    appendLine(text, cls);
    await sleep(280);
  }
}

async function renderResult(result) {
  await sleep(200);

  if (result.status === "OK") {
    appendLine(`✔ 0 xato topildi — ${result.errorType}`, "term-mint");
  } else {
    appendLine(`✖ ${result.errorType} (severity: ${result.severity})`, "term-error");
  }

  await sleep(200);
  appendLine("Stack trace:", "term-heading");
  for (const line of result.stackTrace) {
    await sleep(180);
    appendLine(`  ${line}`, "term-amber");
  }

  await sleep(200);
  appendLine("Suggested fix:", "term-heading");
  for (const fix of result.fixes) {
    await sleep(180);
    appendLine(`  → ${fix}`, "term-mint");
  }
}

async function handleRun() {
  const text = feelingInput.value.trim();

  if (!text) {
    terminal.innerHTML = `<p class="term-line term-error">✖ EmptyInputException — matn kiritilmagan</p><span class="cursor" id="idleCursor">█</span>`;
    return;
  }

  runBtn.disabled = true;
  statusBadge.textContent = "running";
  statusBadge.className = "panel-status status-running";

  await runCompileAnimation();

  try {
    const response = await fetch("/api/debug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("network error");
    }

    const result = await response.json();
    await renderResult(result);

    statusBadge.textContent = result.status === "ERROR" ? "error" : "ok";
    statusBadge.className = `panel-status ${result.status === "ERROR" ? "status-error" : "status-ok"}`;
  } catch (err) {
    appendLine("✖ ServerUnreachableError — backend bilan bog'lanib bo'lmadi", "term-error");
    appendLine("  → backend serverni ishga tushiring (npm start)", "term-mint");
    statusBadge.textContent = "error";
    statusBadge.className = "panel-status status-error";
  }

  runBtn.disabled = false;
}

runBtn.addEventListener("click", handleRun);

feelingInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    handleRun();
  }
});

updateGutter();
updateCharCount();
