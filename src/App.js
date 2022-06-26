import React, {Component} from 'react';
import { Globe, GlobeWithPolygons } from './components';
import styles from './App.module.css';
import { fetchPointData, fetchPolygonData, fetchAllData } from './assets/api';

class App extends Component {
    state = {
      pointData: {},
      polygonData: {}
  }

  componentDidMount() {
      const fetchedPointData = fetchPointData();
      const fetchedPolygonData = fetchPolygonData();
      this.setState({ 
        pointData: fetchedPointData,
        polygonData: fetchedPolygonData
      });
  }

  render() {
    const { pointData, polygonData } = this.state;
    return (
      <div className={styles.container}>
        {/* <GlobeWithPolygons
        polygonData={polygonData}
        /> */}
        <Globe 
        pointData={pointData}
        polygonData={polygonData}
        />
      </div>
    );
  }
}

export default App;