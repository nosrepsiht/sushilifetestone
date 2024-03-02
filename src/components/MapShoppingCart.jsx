import React, { useEffect, useRef, useState } from 'react'
import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {fromLonLat, transform} from 'ol/proj.js';
import {Circle as CircleStyle, Icon, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Layer, Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import axios from 'axios';
import GlobalVars from '../globalVariables/GlobalVars'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const MapShoppingCart = () => {
  
  const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }

  // let userLocationX;
  // let userLocationY;

  const navigate = useNavigate()

  let map;
  // const mapRef = useRef(null)

  let view;
  // const viewRef = useRef(null)

  let geolocation;
  // const geolocationRef = useRef(null)

  let coordinates2;
  useEffect(()=>{

    // const proj = new Proj({})

    // localStorage.removeItem("selectedLocationX")
    // localStorage.removeItem("selectedLocationY")

    // localStorage.removeItem("lastLocationX")
    // localStorage.removeItem("lastLocationY")

    if (localStorage.getItem("selectedLocationX") == null) {
      if (localStorage.getItem("lastLocationX") != null) {
        localStorage.setItem("selectedLocationX", localStorage.getItem("lastLocationX"))
        localStorage.setItem("selectedLocationY", localStorage.getItem("lastLocationY"))

        localStorage.setItem("locationIsSelected", true)
      }
    }

    // console.log(localStorage.getItem("selectedLocationX"))

    view = new View({
      center: fromLonLat([69.275128, 41.311220]),
      zoom: 18,
    })

    if (localStorage.getItem("selectedLocationX") != null) {
      view.centerOn(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")]), [0,0], [0,0])
    }

    // viewRef.current = view

    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: view,
    })

    // mapRef.current = map

    geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    })

    // geolocationRef.current = geolocation

    geolocation.setTracking(true)
    // console.log(fromLonLat([69.275128, 41.311220]))
    // console.log(geolocation.getPosition())
    // view.centerOn(fromLonLat([69.275128, 41.311220]), map.getSize(), [570, 500])

    function el(id) {
      return document.getElementById(id)
    }

    if (el('track') != null) {
      el('track').addEventListener('change', function () {
        geolocation.setTracking(this.checked)
      })
    }

    // update the HTML page when the position changes.
    geolocation.on('change', function () {
      
      // console.log("pos: " + geolocation.getPosition())
      // view.centerOn(fromLonLat([69.275128, 41.311220]), [0,0], [0,0])
      // view.centerOn(geolocation.getPosition(), [0,0], [0,0])


      // el('accuracy').innerText = geolocation.getAccuracy() + ' [m]'
      // el('altitude').innerText = geolocation.getAltitude() + ' [m]'
      // el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]'
      // el('heading').innerText = geolocation.getHeading() + ' [rad]'
      // el('speed').innerText = geolocation.getSpeed() + ' [m/s]'
    })

    // handle geolocation error.
    geolocation.on('error', function (error) {
      // const info = document.getElementById('info')
      // info.innerHTML = error.message;
      // info.style.display = ''

      console.log(error.message)
    })

    const accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      // accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
    })

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    )

    positionFeature3.setGeometry(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")]) ? new Point(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")])) : null)
    positionFeature.setGeometry(fromLonLat([localStorage.getItem("lastLocationX"), localStorage.getItem("lastLocationY")]) ? new Point(fromLonLat([localStorage.getItem("lastLocationX"), localStorage.getItem("lastLocationY")])) : null)
    

    // console.log(geolocation.getPosition())
    geolocation.on('change:position', function () {
      const coordinates = geolocation.getPosition();
      // console.log(geolocation.getPosition())
      let location = transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326')

      if (localStorage.getItem("lastLocationX") == null) {
        // console.log("nice")
        view.centerOn(geolocation.getPosition(), [0,0], [0,0])
        localStorage.setItem("selectedLocationX", location[0])
        localStorage.setItem("selectedLocationY", location[1])
        positionFeature3.setGeometry(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")]) ? new Point(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")])) : null)
      }

      localStorage.setItem("lastLocationX", location[0])
      localStorage.setItem("lastLocationY", location[1])
      // console.log(transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326'))
      // console.log(location)
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null)
      // console.log("mda324")
      localStorage.setItem("locationIsSelected", true)
      // console.log("ha")

      

      // view.centerOn(geolocation.getPosition(), [0,0], [0,0])
      // view.setZoom("18")

    })

    // console.log(geolocation.getPosition())
    // view.centerOn(geolocation.getPosition(), [0,0], [0,0])
    // view.setZoom("18")

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [positionFeature3]
      })
    })

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    })
  }, [])

  const positionFeature2 = new Feature();
  positionFeature2.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#FF0000',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    })
  )

  

  const positionFeature3 = new Feature();
  positionFeature3.setStyle(
    new Style({
      image: new Icon({
        src: require('../images/mark.png'),
        scale: 0.1
      }),
    })
  )

  // const positionFeature3 = new Feature();
  // positionFeature3.setStyle(
  //   new Style({
  //     image: new CircleStyle({
  //       radius: 6,
  //       fill: new Fill({
  //         color: 'purple',
  //       }),
  //       stroke: new Stroke({
  //         color: '#fff',
  //         width: 2,
  //       }),
  //     }),
  //   })
  // )

  


  // positionFeature3.setGeometry(fromLonLat([69.275128, 41.311220]) ? new Point(fromLonLat([69.275128, 41.311220])) : null)
  // positionFeature3.setGeometry(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")]) ? new Point(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")])) : new Point(fromLonLat([localStorage.getItem("lastLocationX"), localStorage.getItem("lastLocationY")])))
  // console.log("purple")

  function getPosition(event) {
    
    // console.log(mapRef.current)
    // console.log(transform(mapRef.current.getEventCoordinate(event), 'EPSG:3857', 'EPSG:4326'))
    // map.getEventCoordinate(event)
    // console.log(map.getEventCoordinate(event))
    // console.log(fromLonLat([69.275128, 41.311220]))
    
    // setUserLocation(map.getEventCoordinate(event)[0], map.getEventCoordinate(event)[1])

    // userLocationX = map.getEventCoordinate(event)[0]
    // userLocationY = map.getEventCoordinate(event)[1]
    
    // setUserLocation(map.getEventCoordinate(event))
    
    // console.log(userLocationX, userLocationY)
    // coordinates2 = mapRef.current.getEventCoordinate(event)
    coordinates2 = map.getEventCoordinate(event)
    positionFeature2.setGeometry(coordinates2 ? new Point(coordinates2) : null)
    localStorage.setItem("locationIsSelected", true)
    let userLocation;
    userLocation = transform(coordinates2, 'EPSG:3857', 'EPSG:4326')
    localStorage.setItem("selectedLocationX", userLocation[0])
    localStorage.setItem("selectedLocationY", userLocation[1])
    positionFeature3.setGeometry(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")]) ? new Point(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")])) : null)
    // console.log("Red: " + mapRef.current.getEventCoordinate(event))
    // console.log("Blue: " + geolocation.getPosition())

    // const marker = new VectorLayer({
    //   source: new VectorSource({
    //     features: [
    //       new Feature({
    //         geometry: new Point(
    //           map.getEventCoordinate(event)
    //           // fromLonLat([69.275128, 41.311220])
    //         )
    //       })
    //     ],
    //   }),
      // style: new Style({
      //   image: new Icon({
      //     src: "marker_icon.png"
      //   })
      // })
      // style: new Style({
      //   image: new CircleStyle({
      //     radius: 6,
      //     fill: new Fill({
      //       color: '#3399CC',
      //     }),
      //     stroke: new Stroke({
      //       color: '#fff',
      //       width: 2,
      //     }),
      //   }),
      // })
    // })

    // console.log("test1")
    // map.removeLayer(marker)
    // map.addLayer(marker)
    // console.log("test2")

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [positionFeature2]
      })
    })
  }

  

  function showMyPosition() {
    if (localStorage.getItem("locationIsSelected")) {
      // viewRef.current.centerOn(geolocationRef.current.getPosition(), [0,0], [0,0])
      // viewRef.current.setZoom("18")
      // console.log(viewRef.current)

      // console.log(geolocation.getPosition())
      // console.log(fromLonLat([localStorage.getItem("lastLocationX"), localStorage.getItem("lastLocationY")]))
      view.centerOn(fromLonLat([localStorage.getItem("lastLocationX"), localStorage.getItem("lastLocationY")]), [0,0], [0,0])
      view.setZoom("18")
    }

    else {
      toast(t('please_allow_access_to_geodata'))
    }
    
    // console.log(localStorage.getItem("locationIsSelected"))
  }

  function showPoytaxt() {
    view.centerOn(fromLonLat([69.275128, 41.311220]), [0,0], [0,0])
    view.setZoom("18")
  }

  // function sendBlueLocation() {
  //   console.log("")
  // }

  const sendMyLocation = async (_color) => {
    try {

      if (localStorage.getItem("locationIsSelected") == true) {
        toast(t('please_click_on_the_map_to_place_a_mark'))
        return
      }

      let userLocation;

      if (_color == "red") {
        // console.log(userLocationX, userLocationY)
        // console.log(transform(coordinates2, 'EPSG:3857', 'EPSG:4326'))
        if (coordinates2 != null) {
          userLocation = transform(coordinates2, 'EPSG:3857', 'EPSG:4326')
        }

        else {
          toast(t('please_click_on_the_map_to_add_a_red_mark'))
        }
      }

      else if (_color == "blue") {
        // console.log(transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326'))
        userLocation = transform(fromLonLat([localStorage.getItem("lastLocationX"), localStorage.getItem("lastLocationY")]), 'EPSG:3857', 'EPSG:4326')
      }

      localStorage.setItem("selectedLocationX", userLocation[0])
      localStorage.setItem("selectedLocationY", userLocation[1])

      positionFeature3.setGeometry(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")]) ? new Point(fromLonLat([localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY")])) : null)
      // console.log(userLocation)

      // const testdata = (await axios.post(GlobalVars.backend_server + "/setLocation", [localStorage.getItem('username'), userLocation])).data
      // console.log(testdata)

      // if (testdata === "success") {
      //   navigate("/")
      // }

      // else {
      //   if (testdata.sqlMessage.includes('Duplicate entry')) {
      //     console.log("Try another username")
      //   }
      // }
      
    }

    catch (err) {
      console.log(err)
    }
  }

  // const sendBlueLocation = async e => {
  //   try {

  //     // console.log(geolocation.getPosition()[0], geolocation.getPosition()[1])
  //     // console.log(transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326'))
      
  //     // const testdata = (await axios.post(GlobalVars.backend_server + "/setLocation", userLocation)).data

  //     // console.log(testdata)

  //     // if (testdata === "success") {
  //     //     navigate("/")
  //     // }

  //     // else {
  //     //     if (testdata.sqlMessage.includes('Duplicate entry')) {
  //     //         console.log("Try another username")
  //     //     }
  //     // }
  //   }

  //   catch (err) {
  //       console.log(err)
  //   }
  // }
    return (
        <div>
            <h1>{t('map')}</h1>
            <div id="map" className="map" style={{width: "100%", height: "400px"}} onClick={getPosition}></div>
            {/* <div id="info"></div> */}
            {/* <label htmlFor="track">
              track position hehe2
              <input id="track" type="checkbox"/>
            </label> */}
            {/* <p>
              position accuracy : <code id="accuracy"></code>&nbsp;&nbsp;
              altitude : <code id="altitude"></code>&nbsp;&nbsp;
              altitude accuracy : <code id="altitudeAccuracy"></code>&nbsp;&nbsp;
              heading : <code id="heading"></code>&nbsp;&nbsp;
              speed : <code id="speed"></code>
            </p> */}
            
            <div>
              <button className="bMapLeft" onClick={()=> {sendMyLocation("blue")}}>{t('send_blue_location')}</button>
              <button className="bMapRight" onClick={()=> {sendMyLocation("red")}}>{t('send_red_location')}</button>
            </div>
            <div style={{textAlign: "center"}}>
              <button className="createMap2" onClick={showMyPosition}>{t('show_my_location')}</button>
            </div>
            <div style={{textAlign: "center"}}>
              <button className="createMap2" onClick={showPoytaxt}>{t('show_poytaxt')}</button>
            </div>
            {/* <ToastContainer/> */}
        </div>
    )
}

export default MapShoppingCart