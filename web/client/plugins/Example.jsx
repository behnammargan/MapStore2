import React from 'react';
import { createPlugin } from '../utils/PluginsUtils';
import { connect } from 'react-redux';
import { projectionSelector,mapSelector } from '../selectors/map';
import { changeZoomLevel } from '../actions/map';
import example from '../reducers/example';
import {incrementCounter,askForVersion} from '../actions/example';
import {askVersion} from "../epics/example";
import {setLayers} from '../actions/mapimport';
import {addLayer} from '../actions/layers';
import{changeMapView} from '../actions/map'

import * as epics from "../epics/example"
// import React, { useEffect, useState } from "react";
import {newAnnotation} from '../actions/annotations';
import {drawingFeatures} from '../actions/draw'
import {changeDrawingStatus} from '../actions/draw';



const style = {
    position:"absolute",
    // background:"white",
    padding:10,
    top:50,
    left:50,
    zIndex:100
};

const style2 = {
  position:"absolute",
  // background:"white",
  padding:10,
  top:50,
  right:50,
  zIndex:100
};


const zoomSelector = state => {
    const mapState = mapSelector(state);
    return mapState?.zoom
}
const center = state => {
    const mapselector = mapSelector(state);
    return mapselector?.center.x
}




let bbx = {}
const Grass = (props) => {
    // const[count, setcount] = useState(0)
    // let castId = props.dispatch(newAnnotation());
//    props?.newAnnotation()
if(props.center == 11.22894105149402){
    let center = {
        x: 52.434995738994026,
        y: 35.603221993264,
        crs: 'EPSG:4326'
      }
    props?.changeMapView(center)
}
    let layers = 
        [{
            type: 'vector',
            visibility: true,
            group: 'Local shape',
            name: 'test',
            hideLoading: true,
            bbox: {
              bounds: {
                minx: 51.14,
                miny: 34.5,
                maxx: 53.62,
                maxy: 35.94
              },
              crs: 'EPSG:4326'
            },
            "features": props.version
          }];


          let ggg = [
            {
              type: 'Feature',
              geometry: {
                coordinates: [
                  props.version?.lng,
                  props.version?.lat
                ],
                type: 'Point'
              },
              properties: {
                id: '4be0d070-5feb-11eb-98f1-dbfb226d7aee',
                isValidFeature: false,
                canEdit: true
              }
            }
          ]

const error = [];

// props?.drawingFeatures(ggg[0])

const nameChangedHandler = ( event, id ) => {
//const [s1, setCount] = useState(event.target.value);
if(id == "s"){
    bbx.s = Number(event.target.value)
}
if(id == "n"){
    bbx.n = Number(event.target.value)
}
if(id == "w"){
    bbx.w = Number(event.target.value)
}
if(id == "e"){
    bbx.e = Number(event.target.value)
}
}
    return (
    <div style={style2}>
{/* <h1>projection and zooming</h1>
<div>the current projection is {props.projection}</div>
<button onClick={()=>{
    props.changeZoomLevell(props.currentZoom+1)
}}>zoom in</button>
<button onClick={()=>{
    props.changeZoomLevell(props.currentZoom-1)
}}>zoom out</button>

<div>
<hr />
<h1>Counter</h1>
<span>counterValue: {props.counter}</span>
    <button onClick={() => props.incrementCounter()}>Increment Counter</button>
</div> */}
<hr />
{/* <div>
    <h1>RUN GRASSS "{props.version?.lat}"</h1>
    <button onClick={() => {props?.askForVersion(bbx)}}>RUN</button>
    <br></br>
    <input type="text" placeholder="N" onChange={(event)=>nameChangedHandler(event,"n")}   />
    <br></br>
    <input type="text" placeholder="S" onChange={(event)=>nameChangedHandler(event,"s")}  />
    <br></br>
    <input type="text" placeholder="W"  onChange={(event)=>nameChangedHandler(event,"w")} />
    <br></br>
    <input type="text" placeholder="E"  onChange={(event)=>nameChangedHandler(event,"e")} />
    <br></br>
</div>
<hr />


<div>
    <h1>Upload GeoJSON</h1>
    <button onClick={() => props?.addLayer(layers[0])}>upload</button>
</div>
 */



}
{/* <div>
<h1>Upload GeoJSON</h1>
<button onClick={() => props?.changeDrawingStatus("start","BBOX",'queryform',[])}>upload</button>
</div> */}

</div>
)};

const mapstateToProps = state => {
    // state.annotations = "fu";

    return{
         version: state?.example?.version,
        // lat:state?.example?.version.lat,
        // lng:state?.example?.version.lng,
        counter: state?.example?.counter,
        projection: projectionSelector(state),
        currentZoom: zoomSelector(state),
        center:center(state)

    }
};

const ConnectedComponent = connect(mapstateToProps,{
    changeZoomLevell:changeZoomLevel,
    incrementCounter: incrementCounter,
    askForVersion:askForVersion,
    setLayers:setLayers,
    addLayer:addLayer,
    changeMapView:changeMapView,
    newAnnotation:newAnnotation,
    changeDrawingStatus:changeDrawingStatus
    
    // drawingFeatures:drawingFeatures
})(Grass);


export default createPlugin('Example',{
    component: ConnectedComponent,
    reducers: {
        example:example
    },
    epics: epics

})
//export default Component;
// module.export = Component;
// export default Component