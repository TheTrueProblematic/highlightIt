// ---------------- page‑side helper ----------------
function pageSideClick(frameInfo) {
  const LOG = tag => console.log(`[HighlighIT‑page][frame ${frameInfo.frameId}] ${tag}`);

  function attemptClick() {
    // Match both the <div> wrapper and its internal <button>
    const el =
      document.querySelector('button[data-unique-id="Ribbon-Highlighter"]') ||
      document.querySelector('[data-unique-id="Ribbon-Highlighter"]');

    if (el && !el.disabled) {
      el.click();
      LOG('✅ CLICKED element');
      return true;
    }
    return false;
  }

  if (attemptClick()) return; // immediate success

  LOG('not present – polling up to 15 s');
  const started = Date.now();
  const timer = setInterval(() => {
    if (attemptClick() || Date.now() - started > 15000) {
      clearInterval(timer);
      if (Date.now() - started > 15000) LOG('❌ gave up after 15 s');
    }
  }, 300);
}

// ------------ background helper ------------------
async function trigger(tabId, source) {
  console.log(`[HighlighIT‑bg] ${source} → injecting into all frames`);
  await chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    world: 'MAIN',
    func: pageSideClick,
    args: [chrome.webNavigation ? {} : { frameId: 0 }] // Safari stub arg
  });
  console.log('[HighlighIT‑bg] injection dispatched');
}

// ------------ keyboard shortcut ------------------
chrome.commands.onCommand.addListener(async cmd => {
  if (cmd !== 'trigger-ribbon-highlighter') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) trigger(tab.id, 'shortcut');
});

// ------------ toolbar icon click -----------------
chrome.action.onClicked.addListener(tab => {
  if (tab.id !== undefined) trigger(tab.id, 'icon');
});
