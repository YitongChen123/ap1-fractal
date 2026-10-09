// ui.js
let state = {
    depth:4,
    pointCount:5000,
    pointSize:6,
    renderMode:"points",
    colorScheme:0,

    offsetX:0,
    offsetY:0,
    scale:1.0,

    animateGrow:true,
    currentGrowPoints:0,

    drag:false,
    lastMouseX:0,
    lastMouseY:0
};

const dom = {
    depth: document.querySelector("#depth"),
    depthVal: document.querySelector("#depthVal"),
    pointCount: document.querySelector("#pointCount"),
    pcVal: document.querySelector("#pcVal"),
    pointSize: document.querySelector("#pointSize"),
    renderMode: document.querySelector("#renderMode"),
    colorScheme: document.querySelector("#colorScheme"),
    canvas: document.querySelector("#glcanvas")
};

dom.depth.oninput = ()=>{
    state.depth = Number(dom.depth.value);
    dom.depthVal.innerText = state.depth;
};
dom.pointCount.oninput = ()=>{
    state.pointCount = Number(dom.pointCount.value);
    dom.pcVal.innerText = state.pointCount;
    state.currentGrowPoints = 0;
};
dom.pointSize.oninput = ()=>{
    state.pointSize = Number(dom.pointSize.value);
};
dom.renderMode.onchange = ()=>{
    state.renderMode = dom.renderMode.value;
    state.currentGrowPoints = 0;
};
dom.colorScheme.onchange = ()=>{
    state.colorScheme = Number(dom.colorScheme.value);
};

document.addEventListener("keydown", e=>{
    switch(e.key){
        case '1': state.renderMode="points"; dom.renderMode.value="points"; state.currentGrowPoints=0; break;
        case '2': state.renderMode="lines"; dom.renderMode.value="lines"; break;
        case '3': state.renderMode="triangles"; dom.renderMode.value="triangles"; break;
        case ' ': state.animateGrow = !state.animateGrow; break;
    }
});

dom.canvas.addEventListener("mousedown", e=>{
    state.drag = true;
    const rect = dom.canvas.getBoundingClientRect();
    state.lastMouseX = e.clientX - rect.left;
    state.lastMouseY = e.clientY - rect.top;
});
document.addEventListener("mouseup", ()=> state.drag = false);
document.addEventListener("mousemove", e=>{
    if(!state.drag) return;
    const rect = dom.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const w = dom.canvas.width;
    const h = dom.canvas.height;
    const dx = 2*(mx - state.lastMouseX)/w;
    const dy = -2*(my - state.lastMouseY)/h;
    state.offsetX += dx / state.scale;
    state.offsetY += dy / state.scale;
    state.lastMouseX = mx;
    state.lastMouseY = my;
});

dom.canvas.addEventListener("wheel", e=>{
    e.preventDefault();
    const factor = e.deltaY>0 ? 0.95 : 1.05;
    state.scale *= factor;
});