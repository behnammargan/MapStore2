import PropTypes from 'prop-types';
/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import Dialog from '../../../../components/misc/Dialog';
import { Message } from '../../../../components/I18N/I18N';
import aboutImg from '../../../assets/img/Blank.gif';
import assign from 'object-assign';
// const { Glyphicon } = require('react-bootstrap');
import {Row,Col,Alert, Tabs, Tab, Button, Glyphicon, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

import './fonts/style.css';
import axios from "../../../../libs/ajax";


// import Grass from '../../../../plugins/Example'
// import {newAnnotation} from '../../../../actions/annotations';
// import { connect } from 'react-redux';
// import { changeZoomLevel } from '../../../../actions/map';
// import {incrementCounter,askForVersion} from '../../../../actions/example';
// import {setLayers} from '../../../../actions/mapimport';
// import {addLayer} from '../../../../actions/layers';
// import{changeMapView} from '../../../../actions/map'

// import { askForVersion } from '../../../../actions/example';
// const { connect } = require('react-redux');
// const { askForVersion } = require('../../../../actions/example')
// const { projectionSelector, mapSelector } = require('../../../../selectors/map');
// const { addLayer } = require('../../../../actions/layers')
// const { example } = require('../../../../reducers/example').default
// //import example from '../../../../reducers/example';
// //const {toggleMapInfoState} = require('../../../../actions/mapInfo')
// //import ReactDOM from "react-dom";
// const { ReactDOM } = require('react-redux');


class Darbareh extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    modalConfig: PropTypes.object,
    withButton: PropTypes.bool,
    enabled: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    style: {
      position: "absolute",
      zIndex: 1000,
      bottom: "-8px",
      right: "0px",
      margin: "8px"
    },
    modalConfig: {
      closeGlyph: "1-close"
    },
    latlng:{lat:'',lng:''},
    withButton: true,
    enabled: false,
    infoclick: false,
    latlng: '',
    extent:'',
    onClose: () => { },
    addLayers: () => { },
    toggleMapInfoState: () => { },
    changeDrawingStatus: () => { },
    layerLoading:() => {},
    layerLoad:() => {}
  };

  bbx = {};
  version = {};

  //  state = {
  //     version: ''
  //   }
  constructor(props) {
    super(props)
    this.state = { version: '',selected:'' }
    this.state.value = {n:'',s:''} 
    this.state.value.n = {lat:'',lng:''}
  }


addid = () => {
  // let d = this.state.selected;
  if(this.state.selected == "n")
  {this.state.value.n = this.props.latlng }
  else if(this.state.selected == "s"){
    this.state.value.s = this.props.latlng
  }
}


  nameChangedHandler = (event, id) => {
    //const [s1, setCount] = useState(event.target.value);
    console.log('State updated to ', event.target.value);

    this.bbx.n = event.target.value.split(',')[0]
    this.bbx.w = event.target.value.split(',')[1]

    
    if (id == "s") {
      // this.setState({value: `event.target.value.${id}`})
      this.bbx.s = Number(event.target.value.split(',')[0])
      this.bbx.w = Number(event.target.value.split(',')[1]) 
    }
    if (id == "n") {
      this.bbx.n = Number(event.target.value.split(',')[0])
      this.bbx.e = Number(event.target.value.split(',')[1])

    }

    if (id == "w") {
      this.bbx.w = Number(event.target.value)
    }
    if (id == "e") {
      this.bbx.e = Number(event.target.value)
    }
  }



  selectinput = (event, id) => {
    //const [s1, setCount] = useState(event.target.value);
    if (id == "s") {
      this.setState({ selected: id });

      this.bbx.s = Number(event.target.value)
    }
    if (id == "n") {
      this.setState({ selected: id });

      this.bbx.n = Number(event.target.value)
    }
    if (id == "w") {
      this.bbx.w = Number(event.target.value)
    }
    if (id == "e") {
      this.bbx.e = Number(event.target.value)
    }
  }

  handleSubmit = (bbx) => {
    //event.preventDefault();
    console.log(this.bbx)
    let time = Date.now();
    const chain = {
      "list": [
        {
          "module": "g.region",
          "id": "g_region_1",
          "inputs": [
            {
              "param": "raster",
              "value": "dem@PERMANENT"
            },
            {
              "param": "n",
              "value": `${this.bbx.n}`
            },
            {
              "param": "s",
              "value": `${this.bbx.s}`
            },
            {
              "param": "e",
              "value": `${this.bbx.e}`
            },
            {
              "param": "w",
              "value": `${this.bbx.w}`
            }
          ],
          "flags": "p"
        },
        {
          "module": "r.slope.aspect",
          "id": "r_slope_aspect_1",
          "inputs": [
            {
              "param": "elevation",
              "value": "dem@PERMANENT"
            }
          ],
          "outputs": [
            {
              "export": {
                "format": "GTiff",
                "type": "raster"
              },
              "param": "slope",
              "value": "test"
            }
          ],
          "flags": "a"
        },


        {
          "module": "r.reclass",
          "id": "r_reclass_1",
          "inputs": [
            {
              "param": "input",
              "value": "test"
            },
            {
              "param": "rules",
              "value": "/home/grassdata/rules.txt"
            }

          ],
          "outputs": [
            {
              "export": {
                "format": "GTiff",
                "type": "raster"
              },
              "param": "output",
              "value": "reclassSlope"
            }
          ]
        },


        {
          "module": "r.to.vect",
          "id": "r_to_vect",
          "inputs": [
            {
              "param": "input",
              "value": "reclassSlope"
            },
            {
              "param": "type",
              "value": "area"
            }
          ],
          "outputs": [
            {
              "param": "output",
              "value": "reclassSlope"
            }
          ],
          "flags": "s"
        },



        {
          "module": "v.out.ogr",
          "id": "v_out_ogr ",
          "inputs": [
            {
              "param": "input",
              "value": "reclassSlope"
            },
            {
              "param": "type",
              "value": "area"
            },
            {
              "param": "format",
              "value": "GeoJSON"
            }
          ],
          "outputs": [
            {
              "param": "output",
              "value": `/src/actinia_core/docker/actinia-core-data/grassdb/${time}.geojson`
            }
          ],
          "flags": "c"
        }

      ],
      "version": "1"
    }

    axios.post("http://127.0.0.1:8088/api/v1/locations/irandem/processing_async_export", chain, {
      auth: {
        username: "actinia-gdi",
        password: "actinia-gdi"
      }
    }).then(response =>
      axios.get(`${response.data.urls.status}`, {
        auth: {
          username: "actinia-gdi",
          password: "actinia-gdi"
        }
      })
    )

      .then(response =>{
        this.props.layerLoading("mapnik__0")
        setTimeout(() => {
          axios.get(`http://127.0.0.1:9088/${time}.geojson`, {

          }).then(response => {
            console.log(response.data.features),
            this.setState({ version: response.data.features })
          }
          )
        }, 5000)

      })
        // this.forceUpdate()
        // this.props.addLayers(layers[0],true)




  }


  //  zoomSelector = state => {
  //     const mapState = mapSelector(state);
  //     return mapState?.zoom
  // }
  //  center = state => {
  //     const mapselector = mapSelector(state);
  //     return mapselector?.center.x
  // }


  ss = []
  render() {
    console.log(this.props.extent)
    this.bbx.n = this.props.extent.y2
    this.bbx.w = this.props.extent.x1
    this.bbx.s = this.props.extent.y1
    this.bbx.e = this.props.extent.x2


    if(this.bbx.n){
      this.state.value.north = this.bbx.n
      this.state.value.south = this.bbx.s
      this.state.value.west = this.bbx.w
      this.state.value.east = this.bbx.e
    }


if(this.sss != this.props.latlng.lat)
{




    this.sss = this.props.latlng.lat;
    if(this.state.selected == "n" && this.props.latlng)
    {this.state.value.n = this.props.latlng ;
      
      this.bbx.n = Number(this.props.latlng.lat)
      this.bbx.e = Number(this.props.latlng.lng)
    
    }
    else if(this.state.selected == "s"){
      this.state.value.s = this.props.latlng
      this.bbx.s = Number(this.props.latlng.lat)
      this.bbx.w = Number(this.props.latlng.lng) 
    }
  }   
    // if (this.props.infoclick) {
    //   this.props.toggleMapInfoState()
    //   //this.props.enabled = false
    // }
    const style = {
      position: "absolute",
      background: "white",
      padding: 10,
      top: 50,
      left: 50,
      zIndex: 100
    };

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
        "features": this.state.version
      }];
      if (this.state.version.length>0){
        this.props.addLayers(layers[0],true)
        this.props.layerLoad("mapnik__0")

      }


    return (
        <Dialog
          id="mapstore-about"
          style={assign({}, { zIndex: 1992, display: this.props.enabled ? "block" : "none" ,direction:'rtl',width:'25%'})}
          // modal
          draggable
        >
          <span role="header">
            <span className="about-panel-title">
              <Message msgId="darbareh" />
            </span>

            <Button style= {{position: 'absolute',left: '20px'}} onClick={this.props.onClose} className="about-panel-close close">
              {this.props.modalConfig.closeGlyph ? <Glyphicon glyph={this.props.modalConfig.closeGlyph} /> : <span>×</span>}
            </Button>
          </span>
          <div role="body">

            {/* <DarbarehContent/> */}





            {/* <hr /> */}
            <div style={{direction:'rtl'}}>
              {/* <h1>اجرای تحلیل</h1> */}
              {/* {props?.version ? `version is : ${props.version}` : `No version`} */}

              <Button className="home-button" bsStyle="primary" onClick={() => this.props?.changeDrawingStatus("start","BBOX",'queryform',[])}>محدوده دید</Button>

              <br></br>
              <Row>
              <Col xs={6}>
              <ControlLabel>جنوب</ControlLabel>
              <input className="form-control input-sm" value={this.state.value.south ? Math.round(Number(this.state.value.south) * 1000) / 1000 : ''} type="text" placeholder="" onChange={(event) => this.nameChangedHandler(event, "s")} />
              </Col>
              <Col xs={6}>
              <ControlLabel>شمال</ControlLabel>
              <input className="form-control input-sm" value={this.state.value.north ? Math.round(Number(this.state.value.north) * 1000) / 1000 : ''} type="text" placeholder="" onChange={(event) => this.nameChangedHandler(event, "s")} />
              </Col>
              </Row>                      
              <Row>
              <Col xs={6}>
              <ControlLabel>غرب</ControlLabel>
              <input className="form-control input-sm" value={this.state.value.west ? Math.round(Number(this.state.value.west) * 1000) / 1000: ''} type="text" placeholder="" onChange={(event) => this.nameChangedHandler(event, "s")} />
              </Col>
              <Col xs={6}>
              <ControlLabel>شرق</ControlLabel>
              <input className="form-control input-sm" value={this.state.value.east ? Math.round(Number(this.state.value.east) * 1000 ) / 1000 : ''} type="text" placeholder="" onChange={(event) => this.nameChangedHandler(event, "s")} />
              </Col>
              </Row>
              <br></br>
              <Button className="home-button" onClick={(bbx) => this.handleSubmit(bbx)}>
                اجرا
                {/* <Glyphicon glyph="1-close" /> */}
              </Button>

              {/* <br></br>
              <input onClick={(event) => this.selectinput(event, "s")} value={this.state.value.s.lat ? Math.round(Number(this.state.value.s.lat) * 1000) / 1000+","+Math.round(Number(this.state.value.s.lng) * 1000) / 1000 : ''} type="text" placeholder="min x,min y" onChange={(event) => this.nameChangedHandler(event, "s")} />
              <br></br>
              <input onClick={(event) => this.selectinput(event, "n")} value={this.state.value.n.lat ? Math.round(Number(this.state.value.n.lat) * 1000) / 1000+","+Math.round(Number(this.state.value.n.lng) * 1000) / 1000 : ''} type="text" placeholder="max x,max y" onChange={(event) => this.nameChangedHandler(event, "n")} /> */}

              <br></br>
              {/* <button onClick={(bbx) => this.handleSubmit(bbx)}>اجرا</button> */}

              {/* <input onClick={(event) => this.selectinput(event, "w")} value={this.state.value.w} type="text" placeholder="W" onChange={(event) => this.nameChangedHandler(event, "w")} />
              <br></br>
              <input onClick={(event) => this.selectinput(event, "e")} value={this.state.value.e} type="text" placeholder="E" onChange={(event) => this.nameChangedHandler(event, "e")} />
              <br></br> */}
            </div>
            {/* <hr /> */}


            {/* <div style={{direction:'rtl'}}> */}
              {/* <h1>اضافه کردن لایه </h1> */}
              {/* <button onClick={() => props?.setLayers(layers,error)}>upld gjson</button> */}
              {/* <button onClick={() => {console.log(layers), this.props.addLayers(layers[0],true) }}>اجرا</button> */}
            {/* </div> */}


          </div>

          {/* <div role="body"><Component/></div> */}

        </Dialog>);
  }
}


// const mapstateToProps = (state, ownProps) => {

//     return{
//         version: state?.example?.version,
//         counter: state?.example?.counter,
//         projection: projectionSelector(state),
//         infoclick: state?.controls?.darbareh?.enabled,
//         // currentZoom: zoomSelector(state),
//         // center:center(state)
//     }
// };


// const ConnectedComponent = connect(mapstateToProps,{
//     // askForVersion:askForVersion,
//     // addLayer2:addLayer
// })(dddd);


export default Darbareh;
