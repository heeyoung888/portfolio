import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

// 3D 장면 생성
const scene = new THREE.Scene();

// 카메라 설정
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(0, 0, 800);

// 렌더러 설정
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
const section = document.querySelector('.section10');
section.appendChild(renderer.domElement);

// OrbitControls (여기선 사용하지 않음)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// 글자들을 담을 그룹 생성
const group = new THREE.Group();
scene.add(group);

// 기본 텍스트 재질 (앞면만 보임)
const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.FrontSide
});

// 폰트 로드 및 텍스트 생성
const loader = new FontLoader();
let fontMain, fontSub;
const textRows = [
    "heey portfolio",
    "copyright 2025 yulssem all rights reserved"
];
loader.load('./fonts/gentilis_regular.typeface.json', (loadedFont1) => {
    fontMain = loadedFont1;
    loader.load('./fonts/optimer_regular.typeface.json', (loadedFont2) => {
        fontSub = loadedFont2;
        createTextDount(); // 두 폰트 다 로드된 후에 텍스트 생성
    });
});

function createTextDount() {
    const radius = 350; // 도넛 반지름

    textRows.forEach((text, rowIndex) => {
        const letters = [...text];
        const angleStep = (2 * Math.PI) / letters.length;
        const yOffset = rowIndex === 0 ? 60 : -60; // 위/아래 줄 위치
        const fontSize = rowIndex === 0 ? 86 : 20;  // 줄마다 글자 크기 다르게
        const font = rowIndex === 0 ? fontMain : fontSub;  // 폰트 다르게
        letters.forEach((char, i) => {
            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const geo = new TextGeometry(char, {
                font: font,
                size: fontSize,
                height: 5,
                curveSegments: 24
            });
            geo.computeBoundingBox();
            geo.center();

            const mesh = new THREE.Mesh(geo, textMaterial);
            mesh.position.set(x, yOffset, z);
            mesh.lookAt(0, 0, 0);
            group.add(mesh);
        });
    });

    // 초기 도넛 기울기 (수직 회전: 30도)
    group.rotation.x = THREE.MathUtils.degToRad(30);
}

// 마우스 드래그로 수평, 수직 회전 제어하기
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener("pointerdown", (e) => {
    isDragging = true;
    previousMousePosition.x = e.clientX;
    previousMousePosition.y = e.clientY;
});

document.addEventListener("pointermove", (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        // 수평 회전: Y축
        group.rotation.y += deltaX * 0.005;
        // 수직 회전: X축 (단, 너무 많이 회전하면 안되게 클램프 처리)
        group.rotation.x += deltaY * 0.005;
        group.rotation.x = THREE.MathUtils.clamp(group.rotation.x, THREE.MathUtils.degToRad(10), THREE.MathUtils.degToRad(70));

        previousMousePosition.x = e.clientX;
        previousMousePosition.y = e.clientY;
    }
});

document.addEventListener("pointerup", () => {
    isDragging = false;
});

// 자동 회전 (사용자 조작 없을 때)
function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
        group.rotation.y += 0.003;
    }
    renderer.render(scene, camera);
}

animate();

// 창 크기 변경 시 업데이트
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});