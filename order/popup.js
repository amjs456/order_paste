function parseData(data){
    return data
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => line.split("\t"));
}

function setValue(el, value){
    el.forcus();
    el.value = value;
}

function getCodeInputElements() {
    const codes = [...document.querySelectorAll('input[name="code"]')];
    const qtys = [...document.querySelectorAll('input[name="qty"]')];
    const n = Math.min(codes.length, qtys.length);
    console.log(n);
    return Array.from({length:n},(_,i)=>({code:codes[i], qty:qtys[i]}));
}

addEventListener("paste", (event) => {
    const target = event.target;
    const pasted_data = event.clipboardData?.getData("text/plain");
    const grid = parseData(pasted_data);
    event.preventDefault();
    const pairs=getCodeInputElements();
    console.log(pairs);

    for (let r=0;r<Math.min(grid.length);r++){
        const row=grid[r];
        const code=(row[0]??"").trim();
        const qty=(row[1]??"").trim();
    }
});