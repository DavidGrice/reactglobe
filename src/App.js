import React, {Component} from 'react';
import { Globe, GlobeWithPolygons, NavigationBar } from './components';
import styles from './App.module.css';
import { fetchPointData, fetchPolygonData, fetchAllData } from './assets/api';

class App extends Component {
    state = {
      pointData: {},
      polygonData: {},
      polygonActive: false,
      pointActive: true,
  }

  componentDidMount() {
      const fetchedPointData = fetchPointData();
      const fetchedPolygonData = fetchPolygonData();
      this.setState({ 
        pointData: fetchedPointData,
        polygonData: fetchedPolygonData
      });
  }

  changeToGlobe = (event, type) => {
    if (type==="Point") {
      console.log("Point")
      this.setState({pointActive: true, polygonActive: false})
    } else if (type==="Polygon") {
      console.log("Polygon")
      this.setState({polygonActive: true, pointActive: false})
    }
  }

  render() {
    const { pointData, polygonData, polygonActive, pointActive} = this.state;
    return (
      <div className={styles.container}>
        <NavigationBar 
        textOne={"PointGlobe"}
        textTwo={"PolygonGlobe"}
        functionOne={(event) => this.changeToGlobe(event, "Point")}
        functionTwo={(event) => this.changeToGlobe(event, "Polygon")}
        />
        {pointActive ? 
          <Globe 
            pointData={pointData}
            polygonData={polygonData}
          /> : 
          <GlobeWithPolygons
          polygonData={polygonData}
          />
        }
        
        {/*  */}
      </div>
    );
  }
}

export default App;