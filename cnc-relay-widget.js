// widget/RelayControl.js
import PropTypes from 'prop-types';

const RELAY_PIN = 18; // GPIO pin number - adjust as needed

export const RelayControl = (props) => {
    const { controller } = props;

    const toggleRelay = (state) => {
        controller.command('relay:toggle', {
            pin: RELAY_PIN,
            state: state
        });
    };

    return (
        <div className="widget-content">
            <div className="widget-header">
                <h3 className="widget-title">Relay Control</h3>
            </div>
            <div className="widget-body">
                <div className="btn-group">
                    <button 
                        type="button" 
                        className="btn btn-default" 
                        onClick={() => toggleRelay(true)}
                    >
                        Turn On
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-default" 
                        onClick={() => toggleRelay(false)}
                    >
                        Turn Off
                    </button>
                </div>
            </div>
        </div>
    );
};

RelayControl.propTypes = {
    controller: PropTypes.object.isRequired
};

// Register widget
const register = (options) => {
    const { publicPath, controller } = options;

    controller.on('serialport:open', () => {
        // Widget is ready when serial port opens
        console.log('Relay control widget ready');
    });

    return {
        name: 'Relay Control',
        version: '1.0.0',
        Widget: RelayControl
    };
};

export default register;
