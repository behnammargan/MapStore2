export const INCREMENT_COUNTER = "EXAMPLE:INCREMENT_COUNTER";
export const SET_VERSION = "EXAMPLE:SET_VERSION";
export const ASK_FOR_VERSION = "ASK_FOR_VERSION";
export const SET_ANNOT = "SET_ANNOT";


//import { version } from "less";
import axios from "../libs/ajax";
export const incrementCounter = () => ({
type: INCREMENT_COUNTER
});


export const setVersion = version => ({
    type : SET_VERSION,
    version
})


export const setannot = ann => ({
  type : SET_ANNOT,
  ann
})

// export const askForVersion = () => ({
//     type : ASK_FOR_VERSION
// });

export const askForVersion = (bbx) => {
    return (dispatch) => {

        // axios.get("version.txt").then(response => {
        //     dispatch(setVersion(response.data));
        // });
console.log(bbx)
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
            "value": `${bbx.n}`
          },
                  {
            "param": "s",
            "value": `${bbx.s}`
          },
          {
            "param": "e",
            "value": `${bbx.e}`
          },
          {
            "param": "w",
            "value": `${bbx.w}`
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
            
            .then(response => 
              setTimeout(() => {  axios.get(`http://127.0.0.1:9088/${time}.geojson`, {

              }).then(response => dispatch(setVersion(response.data.features))

                
              )
             }, 5000)

);

    };

};