import { Client } from '@stomp/stompjs';
import { useRef } from "react";

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import Widgets from "fusioncharts/fusioncharts.widgets";
// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

//const DataContext = createContext();

function RenderSensorData() {

    let client;
    const connected = useRef();
    const disconnected = useRef();

    function disableButton() {
        connected.current.disabled = true; // this disables the button
        disconnected.current.disabled = false;
    }

    function enableButton() {
        connected.current.disabled = false; // this disables the button 
        disconnected.current.disabled = true;
    }

    const connect = () => {
        console.log('Component did mount');
        client = new Client();

        client.configure({
            brokerURL: 'ws://localhost:61614/stomp',
            onConnect: () => {
                console.log("onConnect!");
                // disable connect button and enable disconnect button
                disableButton();

                client.subscribe('iot_publisher', message => {
                    function updateData() {
                        let currDate = new Date();
                        let label = addLeadingZero(currDate.getHours()) + ":" +
                            addLeadingZero(currDate.getMinutes()) + ":" +
                            addLeadingZero(currDate.getSeconds());
                        //Converting the fetched data in FusionCharts format
                        let strData = "&label=" + label +
                            "&value=" + JSON.parse(message.body).temperature + "|" + JSON.parse(message.body).humidity;
                        console.log("Temprature is: " + JSON.parse(message.body).temperature);
                        //feeding the data to the real time chart
                        FusionCharts.items.mychart.feedData(strData);
                    }
                    console.log(message);
                    //calling the update method
                    updateData();
                });
            },
        });
        client.activate();
    }

    const disconnect = () => {
        if (client) {
            console.log("Try to DisConnect ...");
            client.deactivate();
        }
        // Enable connect button and disable disconnect button
        enableButton();
        console.log("onDisConnect!");
    }

    function addLeadingZero(num) {
        return (num <= 9) ? ("0" + num) : num;
    }

    if (FusionCharts("mychart")) FusionCharts("mychart").dispose();

    const transactionChart = {
        id: "mychart",
        //type: 'realtimeline', // only one line
        type: 'realtimelinedy', // multiple lines
        width: '700',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Simulated Weather Information",
                "subCaption": "Temprature & Humidity",
                "pyaxisminvalue": "40",
                "pyaxismaxvalue": "10",
                "syaxisminvalue": "20",
                "syaxismaxvalue": "100",
                "pYAxisName": "Temprature (°C)",
                "sYAxisName": "Humidity",
                "labeldisplay": "rotate",
                "showLegend": "1",
                "showValues": "0",
                /*This parameter lets you set whether you want the latest value (received from server) to be displayed on the chart or not*/
                "showRealTimeValue": "0",
                /*For this parameter, you can specify the number of seconds after which the chart will look for new data. 
                This process will happen continuously - i.e., if you specify 5 seconds here, the chart will look for 
                new data every 5 seconds*/
                "refreshInterval": ".1",
                /*If you want the chart to keep polling for new data every x seconds and queue it, you can specify 
                that x seconds as updateInterval. This helps you poll at different intervals and then draw at another 
                interval (specified as refreshInterval)*/
                "updateInterval": ".1",
                "yAxisNamePadding": "10",
                //Cosmetics
                "paletteColors": "#0075c2,#1aaf5d,#f2c500",
                "baseFontColor": "#333333",
                "baseFont": "Helvetica Neue,Arial",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "showBorder": "0",
                "bgColor": "#ffffff",
                "showShadow": "0",
                "canvasBgColor": "#ffffff",
                "canvasBorderAlpha": "0",
                "divlineAlpha": "100",
                "divlineColor": "#999999",
                "divlineThickness": "1",
                "divLineIsDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "usePlotGradientColor": "0",
                "showplotborder": "0",
                "valueFontColor": "#ffffff",
                "placeValuesInside": "1",
                "rotateValues": "1",
                "showXAxisLine": "1",
                "xAxisLineThickness": "1",
                "xAxisLineColor": "#999999",
                "showAlternateHGridColor": "0",
                "legendBgAlpha": "0",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                "legendItemFontSize": "10",
                "legendItemFontColor": "#666666"
            },
            "categories": [
                {
                    "category": [
                        { "label": "Start" }
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "Temprature",
                    "showvalues": "0",
                    "data": [
                        { "value": "20.10" }
                    ]
                },
                {
                    "seriesname": "Humidity",
                    "showvalues": "0",
                    "parentyaxis": "S",
                    "data": [
                        { "value": "30.10" }
                    ]
                }
            ]
        }
    }
    return (
        <>
            <p>
                Connect to Server or disconnect from the server:
                <button onClick={connect} ref={connected}>Connect</button>
                <button onClick={disconnect} ref={disconnected}>Disconnect</button>
            </p>

            <ReactFC
                {...transactionChart} />
            
        </>
    );
}
export default RenderSensorData;
