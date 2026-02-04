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
    console.log(grid);
    event.preventDefault();


    const codes = [...document.querySelectorAll('input[name^="tC_Cd"]')];
    const qtys = [...document.querySelectorAll('input[name^="tZ_Num"]')];

    for (let i=0;i<24;i++){
        codes[i].value=grid[i][0];
        codes[i].dispatchEvent(new Event("input", { bubbles: true }));
        codes[i].dispatchEvent(new Event("change", { bubbles: true }));
        qtys[i].value=grid[i][1];
        qtys[i].dispatchEvent(new Event("input", { bubbles: true }));
        qtys[i].dispatchEvent(new Event("change", { bubbles: true }));
        }
    }
)