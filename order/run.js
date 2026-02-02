document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("run").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    const input = document.getElementById("data");
    const file = input.files[0];


    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (file) => {
        console.log(file.name);
        const code_name_base = "txt_shohin_cd";
        const qty_name_base = "txt_suryou";

        for (let i=0;i<10;i++){
          const code_name = code_name_base+(i+1);
          const el = document.querySelector(
              `input[name="${CSS.escape(code_name)}"]`
          );
          if (el) {
            el.value = el.value + "追加したい文字";
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      },
      args:[file],
    });
  });
});