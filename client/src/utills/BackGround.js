import * as THREE from 'three';
export default class BackGround{
    constructor({$target}){
        const canvas = document.createElement('canvas');
        this.time = 0;
        this.renderer = new THREE.WebGLRenderer({canvas});
        // camera (fov,aspect,near,far) (시야각,가로세로비율,렌더링되는 공간비율, 공간비율)
        this.camera = new THREE.PerspectiveCamera(75,2,0.1,5);
        this.camera.position.z = 2;
        this.scene = new THREE.Scene();
        // 정육면체 (가로,세로,높이)
        this.geometry = new THREE.BoxGeometry(1,1,1);
        // 색 지정 (hex 코드)
        // this.material = new THREE.MeshBasicMaterial({color:0x4aa88}); // 광원에 반응하지않음
        this.material = new THREE.MeshPhongMaterial({color:0x44aa88});
        // 물체와 색을 이용해 Mesh 를 만듬
        this.cube = new THREE.Mesh(this.geometry,this.material);
        // 광원 추가
        this.light = new THREE.DirectionalLight(0xFFFFFF,1); // (색,강도);
        this.light.position.set(-1,2,4) // (x,y,z) 좌표
        // 마지막으로 Scene 에 넣음
        this.scene.add(this.cube);
        this.scene.add(this.light);
        $target.appendChild(canvas);

    }
    init = () =>{
        requestAnimationFrame(this.render);
    }
    render = () => {
        this.time += 0.01;
        this.cube.rotation.x = this.time;
        this.cube.rotation.y = this.time;
        this.renderer.render(this.scene,this.camera);
        
        requestAnimationFrame(this.render);
    }
}