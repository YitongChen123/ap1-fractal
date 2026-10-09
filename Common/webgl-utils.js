window.WebGLUtils = {
    setupWebGL: function(canvas, opt_attribs) {
        var names = opt_attribs || [];
        var gl = null;
        try {
            gl = canvas.getContext("webgl2", opt_attribs);
        } catch(e) {}
        if (!gl) {
            alert("Unable to initialize WebGL2. Your browser may not support it.");
            return null;
        }
        return gl;
    }
};