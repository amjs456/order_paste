function parseData(data){
    return data
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => line.split("\t"));
}


addEventListener("paste", (event)=>{
    const pasted_data = event.clipboardData?.getData("text/plain");
    const grid = parseData(pasted_data);
    event.preventDefault();

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
            el_code.value=grid[i][0];
            el_code.dispatchEvent(new Event("input", { bubbles: true }));
            el_code.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if (el_qty){
            el_qty.value=grid[i][1];
            el_qty.dispatchEvent(new Event("input", { bubbles: true }));
            el_qty.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
    }
)