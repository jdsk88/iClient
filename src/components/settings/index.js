import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Slider } from '@material-ui/core';
import axios from 'axios';
import {Server_Clock} from '../small_components/server_clock'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '38%',
        height: '38%',
        position: 'fixed',
        top: '31%',
        left: '31%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
    }
}));

export const Brightness = () => {

    // const API_URL = "http://localhost:8888/api"
    const API_URL = "http://192.168.0.16:8888/api"
    const classes = useStyles();
    
    const [getBrightness, getSetBrightness] = useState()
    const [brightness, setBrightness] = useState({getBrightness})
    // console.log("brightness from hook " + getBrightness)
    useEffect(() => {
        axios.get(API_URL + '/settings/5fe1be5ca18b082c28bee676')  
        .then(res => {
            const settings = res.data;
            const brightness = settings;
            const setBrightness = brightness.brightness;
            getSetBrightness(setBrightness);
            console.log("set lcd backlight level :  " + setBrightness)
          },[setBrightness]);
    })
    const parseValue = parseInt(getBrightness)
    console.log("parseValue " + parseValue)
    
    
    
    
    useEffect(() => {
        console.log(brightness)
        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'PUT', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
          
          postData(API_URL + '/settings/5fe1be5ca18b082c28bee676', {brightness: brightness,})
            .then(data => {
              console.log(data); // JSON data parsed by `data.json()` call
            });

    },[brightness])
   

    return (
        <div className={classes.root}>
            <Typography>Screen Brigtness Controller</Typography>
            <Slider
                key={`slider-${getBrightness}`}
                defaultValue={getBrightness}
                // getAriaValueText={valuetext}
                brightness={brightness}
                setBrightness={setBrightness}
                onChange={(event, v) => {
                    setBrightness(v);
                  }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={255}
            />
            <Server_Clock/>
        </div>
    );
}
