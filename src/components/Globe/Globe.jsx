import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Title, ButtonBox, CountryNameBox, CountryModal } from '../index.js';
import styles from './Globe.module.css';

import earthmap from '../../assets/images/earthmap4k.jpg';
import earthbump from '../../assets/images/earthbump4k.jpg';
import earthspec from '../../assets/images/earthspec4k.jpg';
import particle from '../../assets/images/particle.jpg';
//import clouds from '../../assets/images/earthhiresclouds4K.jpg';
import space_front from '../../assets/images/space_front.png';
import space_back from '../../assets/images/space_back.png';
import space_bot from '../../assets/images/space_bot.png';
import space_left from '../../assets/images/space_left.png';
import space_top from '../../assets/images/space_top.png';
import space_right from '../../assets/images/space_right.png';

class Globe extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            titleActive: true,
            nameActive: false,
            labelsAdded: false,
            pointsActive: false,
            pointHovered: false,
            pointHoveredName: '',
            countryModalActive: false,
            countryData: [],
        }
        this.addEmbassyPoints = this.addEmbassyPoints.bind(this);
        this.addEmbassyPointsNames = this.addEmbassyPointsNames.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.removeChildren = this.removeChildren.bind(this);
        this.removeNames = this.removeNames.bind(this);
    }
    

    componentDidMount() {
        this.createScene();
        this.startAnimation();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate() {
        if (this.state.pointsActive) {
            try {
                this.removeNames();
            } catch (error) {
                console.log("No names active")
            }
        } else if (this.state.nameActive) {
            // this.earthDivGroup = document.createElement( 'div' );
            // this.earthDivGroup.id = 'divNameGroup';
            // this.earthDivGroup.className = 'divNameGroup';
            // this.labelRenderer.appendChild(this.earthDivGroup.domElement);
            this.labelRenderer.domElement.hidden = false;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    createScene = () => {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.controls = new OrbitControls(this.camera, this.mount);
        this.controls.enableZoom = false
        
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
        this.camera.position.z = 20;
        this.addLight();
        this.addEarth();
        this.addSkyBox();
    };

    addSceneObjects = (type) => {
        const data = this.props.pointData;
        let output = Object.values(data);
        this.vals = [];
        for (let i = 0; i < output.length; i++) {
            let datum=output[i];
            this.vals.push(datum);
        }
        if (type === 'EmbassyNoNames') {
            for(let i = 0; i < this.vals.length; i++){
                if(this.vals[i].Bureau==='EUR'){
                    this.addCoord(
                        'red', this.vals[i].Latitude, this.vals[i].Longitude, 
                        this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                        this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                        this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                        this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                        this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                        this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                        this.vals[i].Unnamed_17);
                } else if(this.vals[i].Bureau==='NEA') {
                    this.addCoord(
                        'yellow', this.vals[i].Latitude, this.vals[i].Longitude, 
                        this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                        this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                        this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                        this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                        this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                        this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                        this.vals[i].Unnamed_17);
                } else if(this.vals[i].Bureau==='SCA') {
                    this.addCoord(
                        'orangered', this.vals[i].Latitude, this.vals[i].Longitude, 
                        this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                        this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                        this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                        this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                        this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                        this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                        this.vals[i].Unnamed_17);
                } else if(this.vals[i].Bureau==='EAP') {
                    this.addCoord(
                        'pink', this.vals[i].Latitude, this.vals[i].Longitude, 
                        this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                        this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                        this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                        this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                        this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                        this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                        this.vals[i].Unnamed_17);
                } else if(this.vals[i].Bureau==='AF') {
                    this.addCoord(
                        'white', this.vals[i].Latitude, this.vals[i].Longitude, 
                        this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                        this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                        this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                        this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                        this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                        this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                        this.vals[i].Unnamed_17);
                } else if (this.vals[i].Bureau==='WHA') {
                    this.addCoord(
                        'blue', this.vals[i].Latitude, this.vals[i].Longitude, 
                        this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                        this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                        this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                        this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                        this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                        this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                        this.vals[i].Unnamed_17);
                }
            }
        } else if (type === 'EmbassyWithNames')  {
            if (this.state.labelsAdded === false) {
                for (let i = 0; i < this.vals.length; i++){
                    if (this.vals[i].Bureau==='EUR'){
                        this.addParticlesWithNames(
                            'red', this.vals[i].Latitude, this.vals[i].Longitude, 
                            this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                            this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                            this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                            this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                            this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                            this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                            this.vals[i].Unnamed_17);
                    } else if (this.vals[i].Bureau==='NEA') {
                        this.addParticlesWithNames(
                            'yellow', this.vals[i].Latitude, this.vals[i].Longitude, 
                            this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                            this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                            this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                            this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                            this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                            this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                            this.vals[i].Unnamed_17);
                    } else if (this.vals[i].Bureau==='SCA') {
                        this.addParticlesWithNames(
                            'orange', this.vals[i].Latitude, this.vals[i].Longitude, 
                            this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                            this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                            this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                            this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                            this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                            this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                            this.vals[i].Unnamed_17);
                    } else if (this.vals[i].Bureau==='EAP') {
                        this.addParticlesWithNames(
                            'purple', this.vals[i].Latitude, this.vals[i].Longitude, 
                            this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                            this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                            this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                            this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                            this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                            this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                            this.vals[i].Unnamed_17);
                    } else if (this.vals[i].Bureau==='AF') {
                        this.addParticlesWithNames(
                            'brown', this.vals[i].Latitude, this.vals[i].Longitude, 
                            this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                            this.vals[i].Country, this.vals[i].Post, this.vals[i].Property_Name,
                            this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                            this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                            this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                            this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                            this.vals[i].Unnamed_17);
                    } else if (this.vals[i].Bureau==='WHA') {
                        this.addParticlesWithNames(
                            'blue', this.vals[i].Latitude, this.vals[i].Longitude, 
                            this.vals[i].Post, this.vals[i].Status, this.vals[i].Bureau,
                            this.vals[i].Country, this.vals[i].Property_Name,
                            this.vals[i].Property_Use, this.vals[i].Ownership_Type, this.vals[i].Property_ID,
                            this.vals[i].Real_Property_Unique_ID, this.vals[i].Street_Address_1,
                            this.vals[i].Street_Address_2, this.vals[i].Street_Address_3,
                            this.vals[i].City, this.vals[i].Date_First_Acq, this.vals[i].Funding_Agency,
                            this.vals[i].Unnamed_17);
                    }
                }
            } else if (this.state.labelsAdded === true) {
                let label = document.getElementById("labelRenderer");
                label.hidden = false;
            }
        }
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
        const earthMap = new THREE.TextureLoader().load( earthmap );
        const earthBumpMap = new THREE.TextureLoader().load( earthbump);
        const earthSpecMap = new THREE.TextureLoader().load( earthspec);

        const earthGeometry = new THREE.SphereGeometry( 10, 32, 32 );
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthMap,
            bumpMap: earthBumpMap,
            bumpScale: 0.10,
            specularMap: earthSpecMap,
            specular: new THREE.Color('grey')
        });

        this.earthSphere = new THREE.Mesh( earthGeometry, earthMaterial );
        this.earthSphere.name = "EarthSphere";
        this.scene.add( this.earthSphere );

        // const earthGeo = new THREE.SphereGeometry(10, 32, 32 );
        // const cloudsTexture = new THREE.TextureLoader().load( clouds );
        // const materialClouds = new THREE.MeshLambertMaterial({
        //     color: 0xffffff, 
        //     map: cloudsTexture, 
        //     transparent:true, 
        //     opacity:0.4
        // });
    };

    // CreateSkyBox allows the scene to have more attractiveness to it, in this case by having the blue starred images around globe
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

    addCoord = (color, latitude, longitude, Post,
        Status, Bureau, Country, Property_Name, Property_Use, Ownership_Type, Property_ID,
        Real_Property_Unique_ID, Street_Address_1, Street_Address_2, Street_Address_3,
        City, Date_First_Acq, Funding_Agency, Unnamed_17) => {
        let lat = latitude;
        let lon = longitude;
        const radius = 10;
        const phi   = (90-lat)*(Math.PI/180);
        const theta = (lon+180)*(Math.PI/180);
        const vertex = new THREE.Vector3();
        vertex.x = -((radius) * Math.sin(phi)*Math.cos(theta));
        vertex.y = ((radius) * Math.cos(phi));
        vertex.z = ((radius) * Math.sin(phi)*Math.sin(theta));
        let particleGeo = new THREE.SphereGeometry(.1, 32, 32);
        let particleMat = new THREE.MeshBasicMaterial({
            color: color
        });
        let particleMesh = new THREE.Mesh(
            particleGeo,
            particleMat 
        );
        particleMesh.position.set(
            vertex.x,
            vertex.y,
            vertex.z
        );

        particleMesh.rotation.set(0.0, -lon,lat-Math.PI*0.5);
        particleMesh.userData.Post = Post;
        particleMesh.userData.Latitude = latitude;
        particleMesh.userData.Longitude = longitude;
        particleMesh.userData.Status = Status;
        particleMesh.userData.Bureau = Bureau;
        particleMesh.userData.Country = Country;
        particleMesh.userData.Property_Name = Property_Name;
        particleMesh.userData.Property_Use = Property_Use;
        particleMesh.userData.Ownership_Type = Ownership_Type;
        particleMesh.userData.Property_ID = Property_ID;
        particleMesh.userData.Real_Property_Unique_ID = Real_Property_Unique_ID;
        particleMesh.userData.Street_Address_1 = Street_Address_1;
        particleMesh.userData.Street_Address_2 = Street_Address_2;
        particleMesh.userData.Street_Address_3 = Street_Address_3;
        particleMesh.userData.City = City;
        particleMesh.userData.Date_First_Acq = Date_First_Acq;
        particleMesh.userData.Funding_Agency = Funding_Agency;
        particleMesh.userData.Unnamed_17 = Unnamed_17;
        this.earthSphere.add(particleMesh);
    };

    addParticlesWithNames = (color, latitude, longitude, name ) => {
        let lat = latitude;
        let lon = longitude;
        this.particleMeshMat = new THREE.PointsMaterial({
            color: color,
            size: 0.25,
            map: new THREE.TextureLoader().load(particle),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const temp = [];
        const radius = 10;
        const phi   = (90-lat)*(Math.PI/180);
        const theta = (lon+180)*(Math.PI/180);
        this.particleMesh = new THREE.SphereGeometry(10, 32, 32);
        const positionAttribute = this.particleMesh.getAttribute( 'position' );
        const vertex = new THREE.Vector3();
        for ( let i = 0; i < positionAttribute.count; i ++ ) {
            // read vertex
            vertex.fromBufferAttribute( positionAttribute, i ); 
            // do something with vertex
            vertex.x = -((radius) * Math.sin(phi)*Math.cos(theta));
            vertex.y = ((radius) * Math.cos(phi));
            vertex.z = ((radius) * Math.sin(phi)*Math.sin(theta));
            temp.push(vertex.x)
            temp.push(vertex.y)
            temp.push(vertex.z)
            // write coordinates back
            positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z ); 
        }
        this.earthDiv = document.createElement( 'div' );
        this.earthDiv.className = 'labels';
        this.earthDiv.textContent = name;
        this.earthDiv.style.marginTop = '-1em';
        this.earthLabel = new CSS2DObject( this.earthDiv );
        this.earthLabel.position.set( temp[0], temp[1], temp[2]);

        // this.particleSystem = new THREE.Points(
        //     this.particleMesh,
        //     this.particleMeshMat
        // );
        // this.particleSystem.add( this.earthLabel );
        
        // this.particleSystem.name = name;
        // this.earthSphere.add(this.particleSystem);
        this.earthSphere.add(this.earthLabel);
    };

    addEmbassyPoints = (event) => {
        event.preventDefault();
        this.setState({
            titleActive: false,
            pointsActive: true,
            nameActive: false
        })
        // let labels = document.getElementsByClassName("labels");
        // for (let i = 0; i < labels.length; i++) {
        //     labels[i].remove();
        // }
        this.removeChildren();
        this.addSceneObjects("EmbassyNoNames")
    };

    addEmbassyPointsNames = (event) => {
        event.preventDefault();
        this.setState({
            titleActive: false,
            pointsActive: false,
            nameActive: true
        })
        this.removeChildren();
        this.addSceneObjects("EmbassyWithNames");
    };

    closeModal = (event) => {
        event.preventDefault();
        this.setState({
            countryModalActive: false,
            countryData: [
                {
                    Status: '',
                    Bureau: '',
                    Country: '',
                    Property_Name: '',
                    Property_Use: '',
                    Ownership_Type: '',
                    Property_ID: '',
                    Real_Property_Unique_ID: '',
                    Street_Address_1: '',
                    Street_Address_2: '',
                    Street_Address_3: '',
                    City: '',
                    Date_First_Acq: '',
                    Funding_Agency: '',
                    Unnamed_17: '',
                }
            ]
        })
    }

    removeChildren = () => {
        let destroy = this.earthSphere.children.length;
        while (destroy--) {
            this.earthSphere.remove(this.earthSphere.children[destroy]);
        }
    }

    removeNames = () => {
        let labels = document.getElementById("labelRenderer");
        labels.hidden = true;
    }

    startAnimation = () => {
        this.requestID = window.requestAnimationFrame(this.startAnimation);
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
        this.labelRenderer.render( this.scene, this.camera );
    };

    onMouseClick = (event) => {
        event.preventDefault();
        let mouse = new THREE.Vector2();
        mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
        mouse.y = (-(event.clientY / window.innerHeight) * 2 + 1);
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse,this.camera);

        let intersects = raycaster.intersectObjects(this.earthSphere.children);
        for (let i = 0; i < intersects.length; i++) {
            this.setState({
                countryModalActive: true,
            })
        };
    }

    onMouseMove = (event) => {
        event.preventDefault();
        let mouse = new THREE.Vector2();
        mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
        mouse.y = (-(event.clientY / window.innerHeight) * 2 + 1);
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse,this.camera);
        let intersects = raycaster.intersectObjects(this.earthSphere.children);
        if (intersects.length > 0) {
            for (let i = 0; i < intersects.length; i++) {
                this.setState({
                    pointHovered: true,
                    pointHoveredName: intersects[0].object.userData.Post,
                    countryData : intersects[0].object.userData,
                })
            };
        }
        else {
            this.setState({
                pointHovered: false,
                pointHoveredName: '',
                countryData: [],
            })
        }
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
        const pointsActive = this.state.pointsActive;
        const nameActive = this.state.nameActive;
        const pointHovered = this.state.pointHovered;
        const pointHoveredName = this.state.pointHoveredName;
        const countryModalActive = this.state.countryModalActive;
        const countryData = this.state.countryData;
        const titleName = "POINT GLOBE";
        const authorName = "DAVID GRICE"
        return (
            <>
                <div
                ref={ref => (this.mount = ref)} 
                data = {this.props.pointData}
                onMouseMove = {this.onMouseMove}
                onClick = {this.onMouseClick}
                >
                </div>
                {titleActive ? <Title titleName={titleName} authorName={authorName}/> : <></>}
                {pointsActive ? 
                    ( pointHovered ? <CountryNameBox name={pointHoveredName} /> : <></>
                    ) : <></>
                }
                {countryModalActive ? <CountryModal countryModal={countryModalActive} data={countryData} modalActive={(event) => this.closeModal(event)}/> : <></>}
                <ButtonBox
                titleStatus = {titleActive} 
                pointsActive = {pointsActive}
                nameActive = {nameActive}
                addEmbassyPoints = {(event) => this.addEmbassyPoints(event)}
                textOne = "Points"
                addEmbassyPointsNames = {(event) => this.addEmbassyPointsNames(event)}
                textTwo = "Names"
                />
            </>
        )
    }
}

export default Globe;