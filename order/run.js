document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("run").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;


    const codeValues = [...document.querySelectorAll('input[name^="code"]')]
      .map(el => el.value);
    const qtyValues = [...document.querySelectorAll('input[name^="qty"]')]
      .map(el => el.value);

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (codeValues, qtyValues) => {
        const code_name_base = "txt_shohin_cd";
        const qty_name_base = "txt_suryou";

        for (let i=0;i<24;i++){
          const code_name = code_name_base+(i+1);
          const el_code = document.querySelector(
              `input[name="${CSS.escape(code_name)}"]`
          );
          const qty_name = qty_name_base+(i+1);
          const el_qty = document.querySelector(
              `input[name="${CSS.escape(qty_name)}"]`
          );
          if (el_code) {
            el_code.value=codeValues[i];
            el_code.dispatchEvent(new Event("input", { bubbles: true }));
            el_code.dispatchEvent(new Event("change", { bubbles: true }));
          }
          if (el_qty){
            el_qty.value=qtyValues[i];
            el_qty.dispatchEvent(new Event("input", { bubbles: true }));
            el_qty.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      },
      args:[codeValues, qtyValues]
    });
  });
});