// fractal.js
const rootTri = [
    [-0.8, -0.8],
    [ 0.8, -0.8],
    [ 0.0,  0.8]
];

// 混沌游戏生成点云
function chaosGame(count) {
    const verts = [];
    let px = 0.0;
    let py = 0.0;
    for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * 3);
        const v = rootTri[idx];
        px = (px + v[0]) / 2.0;
        py = (py + v[1]) / 2.0;
        verts.push(px, py);
    }
    return new Float32Array(verts);
}

// 递归细分
function subdivide(tri, depth, maxDepth, out) {
    const [ax,ay,bx,by,cx,cy] = tri;
    if(depth >= maxDepth){
        out.push(ax,ay, bx,by, cx,cy);
        return;
    }
    const abx=(ax+bx)/2, aby=(ay+by)/2;
    const bcx=(bx+cx)/2, bcy=(by+cy)/2;
    const cax=(cx+ax)/2, cay=(cy+ay)/2;

    subdivide([ax,ay, abx,aby, cax,cay], depth+1, maxDepth, out);
    subdivide([abx,aby, bx,by, bcx,bcy], depth+1, maxDepth, out);
    subdivide([cax,cay, bcx,bcy, cx,cy], depth+1, maxDepth, out);
}

function getSubdivideVertices(maxDepth){
    const buf = [];
    subdivide([
        rootTri[0][0],rootTri[0][1],
        rootTri[1][0],rootTri[1][1],
        rootTri[2][0],rootTri[2][1]
    ], 0, maxDepth, buf);
    return new Float32Array(buf);
}