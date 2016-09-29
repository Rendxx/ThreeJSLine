"use strict";

var EndMaterial = function (parameters) {
    THREE.ShaderMaterial.call(this);
    parameters = parameters || {};

    var uniforms = {
        "color": { value: parameters.color || new THREE.Color() },
        "width": { type: "f", value: (parameters.width || 1) },
        "opacity": { type: "f", value: parameters.opacity || 1 }
    };

    this.setValues({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertex_shader2').textContent,
        fragmentShader: document.getElementById('fragment_shader2').textContent
    });
};
EndMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
EndMaterial.prototype.constructor = EndMaterial;
