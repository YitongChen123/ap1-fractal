// main.js
let gl, program;
let vbo;

const vertexShaderSource = `#version 300 es
precision mediump float;
in vec2 aPosition;
uniform float uScale;
uniform vec2 uOffset;
uniform float uPointSize;
void main(){
    vec2 pos = aPosition * uScale + uOffset;
    gl_Position = vec4(pos,0.0,1.0);
    gl_PointSize = uPointSize;
}
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;
uniform int uColorScheme;
out vec4 fragColor;
void main(){
    if(uColorScheme == 0){
        fragColor = vec4(1,1,1,1);
    }else if(uColorScheme ==1){
        fragColor = vec4(0.4,0.2,0.9,1);
    }else{
        fragColor = vec4(0.1,0.9,0.3,1);
    }
}
`;

function initWebGL(){
    const canvas = dom.canvas;
    gl = canvas.getContext("webgl2");
    if(!gl){ alert("不支持WebGL2"); return; }
    program = initShaders(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);
    vbo = gl.createBuffer();
    gl.clearColor(0,0,0,1);
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);

    if(state.animateGrow){
        state.currentGrowPoints +=8;
        if(state.currentGrowPoints > state.pointCount){
            state.currentGrowPoints = state.pointCount;
        }
    }

    let vertexData;
    let drawMode;
    let count;

    if(state.renderMode === "points"){
        const fullPoints = chaosGame(state.pointCount);
        vertexData = fullPoints.subarray(0, state.currentGrowPoints * 2);
        count = vertexData.length / 2;
        drawMode = gl.POINTS;
    }else if(state.renderMode === "lines"){
        vertexData = getSubdivideVertices(state.depth);
        count = vertexData.length / 2;
        drawMode = gl.LINES;
    }else{
        vertexData = getSubdivideVertices(state.depth);
        count = vertexData.length / 2;
        drawMode = gl.TRIANGLES;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.DYNAMIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(aPosLoc);

    gl.uniform1f(gl.getUniformLocation(program,"uScale"), state.scale);
    gl.uniform2f(gl.getUniformLocation(program,"uOffset"), state.offsetX, state.offsetY);
    gl.uniform1i(gl.getUniformLocation(program,"uColorScheme"), state.colorScheme);
    gl.uniform1f(gl.getUniformLocation(program,"uPointSize"), state.pointSize);

    gl.drawArrays(drawMode, 0, count);
    requestAnimationFrame(render);
}

window.onload = ()=>{
    initWebGL();
    render();
}