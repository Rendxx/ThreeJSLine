"use strict";

var LineMaterial = function (parameters) {
    THREE.ShaderMaterial.call(this);
    parameters = parameters || {};

    var uniforms = {
        "viewportSize": { value: parameters.viewportSize },
        "color": { value: parameters.color || new THREE.Color() },
        "width": { type: "f", value: (parameters.width || 1) },
        "opacity": { type: "f", value: parameters.opacity || 1 },
        "start": { value: parameters.start },
        "end": { value: parameters.end }
    };

    this.setValues({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertex_shader').textContent,
        fragmentShader: document.getElementById('fragment_shader').textContent
    });
    this.side = THREE.DoubleSide;
};
LineMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
LineMaterial.prototype.constructor = LineMaterial;
