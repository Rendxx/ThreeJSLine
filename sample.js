$(function () {
    var scene, camera, renderer;
    var controls, datGUI, stats;
    var container = $("#webGL-container")[0];
    var raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 10;
    var lines = [];
    var panel;

    /*variables for lights*/
    var ambient;

    function init() {
        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;
        /*creates empty scene object and renderer*/
        camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, .1, 5000);
        camera.position.z = 800;

        scene = new THREE.Scene();

        // render
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x111111);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.autoClear = false; // To allow render overlay on top of sprited sphere
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        /*add controls*/
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            render();
            //console.log(camera.position);
        });

        addObj();

        $("#webGL-container").append(renderer.domElement);
        /*stats*/
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        $("#webGL-container").append(stats.domElement);
    }

    function addObj() {
        var geometry = new THREE.BufferGeometry();
        var index = new Int8Array(6);
        index[0] = 0;
        index[1] = 1;
        index[2] = 2;
        index[3] = 0; 
        index[4] = 2;
        index[5] = 3;
        
        var position = new Float32Array(6 * 3);

        position[0] = -40;
        position[1] = 10;
        position[2] = 10;

        position[3] = -40;
        position[4] = -10;
        position[5] = 10;

        position[6] = 40;
        position[7] = -10;
        position[8] = 10;
        
        position[9] = -40;
        position[10] = 10;
        position[11] = 10;

        position[12] = 40;
        position[13] = -10;
        position[14] = 10;

        position[15] = 40;
        position[16] = 10;
        position[17] = 10;
        
        geometry.addAttribute('pIndex', new THREE.BufferAttribute(index, 1));
        geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
        geometry.computeBoundingSphere();
        var material = new LineMaterial({
            viewportSize: new THREE.Vector2(window.innerWidth, window.innerHeight),
            width: 10,
            color: new THREE.Color(0xff0000),
            start: new THREE.Vector3(-800, 10, 0),
            end: new THREE.Vector3(800, 10, 0),
            opacity: 0.6
        });

        var line = new THREE.Mesh(geometry, material);
        lines.push(line);
        scene.add(line);

        // end

        var geometry3 = new THREE.BufferGeometry();
        var position3 = new Float32Array(2 * 3);

        position3[0] = -800;
        position3[1] = 10;
        position3[2] = 0;

        position3[3] = 800;
        position3[4] = 10;
        position3[5] = 0;

        geometry3.addAttribute('position', new THREE.BufferAttribute(position3, 3));
        geometry3.computeBoundingSphere();
        var material3 = new EndMaterial({
            width: 10,
            color: new THREE.Color(0xff0000),
            opacity: 0.6
        });


        var end = new THREE.Points(geometry3, material3);
        scene.add(end);



        // panel

        var geometry2 = new THREE.PlaneGeometry(100, 100, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide });
        panel = new THREE.Mesh(geometry2, material);
        panel.position.z = -80;
        scene.add(panel);



        var geometry4 = new THREE.Geometry();
        geometry4.vertices.push(new THREE.Vector3(-800, 0, 0));
        geometry4.vertices.push(new THREE.Vector3(800, 0, 0));

            var material4 = new THREE.LineBasicMaterial({
                color: 0x0000ff,
                depthTest:0.0
            });
            var line4 = new THREE.Line(geometry4, material4);
            line4.position.y = 10;
            line4.position.z = 0;
        scene.add(line4);
    };

    function render() {
        renderer.clear();
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    $(window).resize(function () {
        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;

        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    });


    init();
    animate();
});