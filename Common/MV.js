function vec2(x,y) { return [x,y]; }
function vec3(x,y,z) { return [x,y,z]; }
function vec4(x,y,z,w) { return [x,y,z,w]; }
function add(a,b) {
    let res = [];
    for(let i=0;i<a.length;i++) res.push(a[i]+b[i]);
    return res;
}
function sub(a,b) {
    let res = [];
    for(let i=0;i<a.length;i++) res.push(a[i]-b[i]);
    return res;
}
function mult(s, v) {
    let res = [];
    for(let i=0;i<v.length;i++) res.push(s*v[i]);
    return res;
}