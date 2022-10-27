import embassyData from '../data/Embassies_Consulates_Missions_Data.json';
import polygonData from '../data/country_to_merge.json';

export const fetchPointData = () => {
    try {
        const response = embassyData;
        //console.log(response)
        return response;
    } catch (error) {
        console.log("Unable to fetch point data");
    }
}

export const fetchPolygonData = () => {
    try {
        const response = polygonData;
        //console.log(response)
        return response;
    } catch (error) {
        console.log("Unable to fetch polygon data");
    }
}

export const fetchAllData = async () => {

    return embassyData;
    
}