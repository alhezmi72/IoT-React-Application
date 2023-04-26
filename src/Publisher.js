import { Client } from '@stomp/stompjs';
import { useRef } from "react";
import { createPortal } from 'react-dom';

function Publisher() {
    var client = null;
    let command_on = useRef();
    let command_off = useRef();

    const command = (com) => {

        if(client != null) {
            client.deactivate();
        }
        client = new Client();
        const des = "Switch the sensor " + com;
        const payLoad = { command_name: 'sensor_controller', action: com, description: des };
        console.log("Try to connect ...!");

        client.configure({
            brokerURL: 'ws://localhost:61614/stomp',
            onConnect: () => {
                //console.log("onConnect to publish!");
                client.publish({ destination: 'iot_commands', body: JSON.stringify(payLoad) });
                //console.log("Send command: " + JSON.stringify(payLoad));
                // close the connection 
                client.deactivate(); 
                //console.log("Terminate connection .. ");

            },
        });

        client.activate();
        
        //client.deactivate();
        if (com === "ON") {
            command_on.current.disabled = true; // this disables the button
            command_off.current.disabled = false;
        } else {
            command_on.current.disabled = false; // this disables the button
            command_off.current.disabled = true;
        }
    }
    return (
        <p>
            Switch on or off the sensor:
            <button onClick={() => command("ON")} ref={command_on}>Swich ON</button>
            <button onClick={() => command("OFF")} ref={command_off}>Swich OFF</button>
        </p>
    );
}
export default Publisher; 