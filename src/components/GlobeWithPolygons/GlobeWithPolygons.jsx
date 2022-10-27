import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Title, ButtonBox, SliderBox } from '../index.js';

import countryOutlines from '../../assets/images/country_outlines_4k.png';
import space_front from '../../assets/images/space_front.png';
import space_back from '../../assets/images/space_back.png';
import space_bot from '../../assets/images/space_bot.png';
import space_left from '../../assets/images/space_left.png';
import space_top from '../../assets/images/space_top.png';
import space_right from '../../assets/images/space_right.png';

class GlobeWithPolygons extends Component {

    constructor(props) {
        super(props)

        this.state = {
            titleActive: true,
            dataLoaded: false,
            minArea: 20,
            maxVisibleDot: -0.2,
        }
        this.updateVisibleElements = this.updateVisibleElements.bind(this);
    }

    componentDidMount() {
        this.createScene();
        this.startAnimation();
        window.addEventListener('resize', this.handleWindowResize);
        this.controls.addEventListener('change', this.updateVisibleElements)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    createScene = () => {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10 );
        this.camera.position.z = 2.5;
        this.controls = new OrbitControls(this.camera, this.mount);
        this.controls.enableZoom = false
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.minDistance = 1.2;
        this.controls.maxDistance = 4;
        this.renderer = new THREE.WebGLRenderer({ antialiasing: true });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.className = 'labelRenderer';
        this.labelRenderer.domElement.id = 'labelRenderer';
        this.labelRenderer.domElement.hidden = false;
        this.mount.appendChild( this.labelRenderer.domElement );
        this.mount.appendChild( this.renderer.domElement );
        
        this.addLight();
        this.addEarth();
        this.addSkyBox();
    };

    addLight = () => {
        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, .3, 0);
        lights[1] = new THREE.PointLight(0xffffff, .4, 0);
        lights[2] = new THREE.PointLight(0xffffff, .7, 0);
        lights[3] = new THREE.AmbientLight( 0x706570 );

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(200, 100, 400);
        lights[2].position.set(-200, -200, -50);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
        this.scene.add(lights[3]);
    };

    addEarth = () => {
        const countryOutlineMap = new THREE.TextureLoader().load( countryOutlines );
        const earthGeometry = new THREE.SphereGeometry( 1, 64, 32);
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: countryOutlineMap,
            specular: new THREE.Color('grey')
        });
        this.earthSphere = new THREE.Mesh( earthGeometry, earthMaterial );
        this.earthSphere.name = "EarthSphere";
        this.scene.add( this.earthSphere );
    };

    addSkyBox = () => {
        const skyBox = new THREE.CubeTextureLoader().load([
            space_right,
            space_left,
            space_top,
            space_bot,
            space_front,
            space_back,
        ])
        this.scene.background = skyBox;
    };

    degrees_to_radians = (degrees) => {
        return degrees * (Math.PI / 180);
    }

    addObjects = () => {
        console.log("Add objects started");
        const tempV = new THREE.Vector3();
        const cameraToPoint = new THREE.Vector3();
        const cameraPosition = new THREE.Vector3();
        const normalMatrix = new THREE.Matrix3();
        const large = this.state.minArea * this.state.minArea;
        normalMatrix.getNormalMatrix(this.camera.matrixWorldInverse);
        this.camera.getWorldPosition(cameraPosition);
        const data = this.props.polygonData;
        let output = Object.values(data);
        this.vals = [];
        for (let i = 0; i < output.length; i++) {
            let datum=output[i];
            this.vals.push(datum);
        }
        console.log("labelParentElem");
        this.countryInfos = this.vals;
        for (const countryInfo of this.countryInfos) {
            const {lat, lon, min, max, name} = countryInfo;
            const width = max[0] - min[0];
            const height = max[1] - min[1];
            const area = width * height;
            countryInfo.area = area;

            const temp = [];
            const radius = 1;
            const phi   = (90-lat)*(Math.PI/180);
            const theta = (lon+180)*(Math.PI/180);
            this.particleMesh = new THREE.SphereGeometry(1, 64, 32);
            const positionAttribute = this.particleMesh.getAttribute( 'position' );
            const vertex = new THREE.Vector3();
            for ( let i = 0; i < positionAttribute.count; i ++ ) {
                vertex.fromBufferAttribute( positionAttribute, i ); 
                vertex.x = -((radius) * Math.sin(phi)*Math.cos(theta));
                vertex.y = ((radius) * Math.cos(phi));
                vertex.z = ((radius) * Math.sin(phi)*Math.sin(theta));
                temp.push(vertex.x)
                temp.push(vertex.y)
                temp.push(vertex.z)
                positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z ); 
            }
            this.earthDiv = document.createElement( 'div' );
            this.earthDiv.className = 'labels';
            this.earthDiv.textContent = name;
            this.earthDiv.style.marginTop = '-1em';
            this.earthLabel = new CSS2DObject( this.earthDiv );
            this.earthLabel.position.set( temp[0], temp[1], temp[2]);
            this.earthSphere.add(this.earthLabel);
            countryInfo.position = this.earthLabel.position;
            countryInfo.elem = this.earthDiv;

            if (area < large) {
                countryInfo.elem.style.display = 'none';
                countryInfo.elem.hidden = true;
                continue;
                }
                countryInfo.elem.hidden = false;
                tempV.copy(countryInfo.position);
                tempV.applyMatrix3(normalMatrix);
                cameraToPoint.copy(countryInfo.position);
                cameraToPoint.applyMatrix4(this.camera.matrixWorldInverse).normalize();
                const dot = tempV.dot(cameraToPoint);
                if (dot > this.state.maxVisibleDot) {
                    countryInfo.elem.style.display = 'none';
                    countryInfo.elem.hidden = true;
                    continue;
                }
                countryInfo.elem.hidden = false;
                countryInfo.elem.style.display = '';
                tempV.copy(countryInfo.position);
                tempV.project(this.camera);
                const x = (tempV.x *  .5 + .5) * window.innerWidth;
                const y = (tempV.y * -.5 + .5) * window.innerHeight;
                countryInfo.elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
                countryInfo.elem.style.zIndex = (-tempV.z * .5 + .5) * 100000 | 0;
        }
        this.setState({titleActive: false, dataLoaded: true});
    };

    updateVisibleElements = (value, type) => {
        if (this.state.dataLoaded) {
            console.log("data loaded");
            if (type === "maxVisibleDot") {
                this.setState({maxVisibleDot: value.target.value})
            } else if (type === "minArea") {
                this.setState({minArea: value.target.value})
            }
            const tempV = new THREE.Vector3();
            const cameraToPoint = new THREE.Vector3();
            const cameraPosition = new THREE.Vector3();
            const normalMatrix = new THREE.Matrix3();
            const large = this.state.minArea * this.state.minArea;
            normalMatrix.getNormalMatrix(this.camera.matrixWorldInverse);
            this.camera.getWorldPosition(cameraPosition);
            for (const countryInfo of this.countryInfos) {
                const {position, elem, area} = countryInfo;
                if (area < large) {
                elem.style.display = 'none';
                elem.hidden = true;
                continue;
                }
                elem.hidden = false;
                tempV.copy(position);
                tempV.applyMatrix3(normalMatrix);
                cameraToPoint.copy(position);
                cameraToPoint.applyMatrix4(this.camera.matrixWorldInverse).normalize();
                const dot = tempV.dot(cameraToPoint);
                if (dot > this.state.maxVisibleDot) {
                    elem.style.display = 'none';
                    elem.hidden = true;
                    continue;
                }
                elem.hidden = false;
                elem.style.display = '';
                tempV.copy(position);
                tempV.project(this.camera);
                const x = (tempV.x *  .5 + .5) * window.innerWidth;
                const y = (tempV.y * -.5 + .5) * window.innerHeight;
                elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
                elem.style.zIndex = (-tempV.z * .5 + .5) * 100000 | 0;
            }
            this.labelRenderer.render( this.scene, this.camera );
            this.renderer.render( this.scene, this.camera );
        } else {
            console.log("no data loaded")
        }
    }

    startAnimation = () => {
        this.requestID = window.requestAnimationFrame(this.startAnimation);
        this.controls.update();
        this.labelRenderer.render( this.scene, this.camera );
        this.renderer.render( this.scene, this.camera );
    };

    handleWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

render() {
    const titleActive = this.state.titleActive;
    const minArea = this.state.minArea;
    const maxVisibleDot = this.state.maxVisibleDot;
    const titleName = "POLYGON GLOBE";
    const authorName = "DAVID GRICE";
    return (
      <>
        <div
          ref={ref => (this.mount = ref)} 
          data = {this.props.polygonData} 
        >
        </div>
        {titleActive ? <Title titleName={titleName} authorName={authorName}/> : 
        <SliderBox 
            minArea = {minArea}
            maxVisibleDot = {maxVisibleDot}
            textOne = "Min Area"
            textTwo = "Max Visible Dot"
            functionOne = {(defaultValue, type) => this.updateVisibleElements(defaultValue, type)}
        />}
        
        <ButtonBox
            addEmbassyPointsNames = {(event) => this.addObjects(event)}
            textTwo = "Names"
        />
      </>
    )
  }
}

export default GlobeWithPolygons;