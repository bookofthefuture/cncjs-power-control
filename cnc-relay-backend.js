// server/controllers/RelayController.js
const Gpio = require('onoff').Gpio;

class RelayController {
    constructor() {
        this.pin = new Gpio(18, 'out'); // GPIO 18, output mode
    }

    toggle(state) {
        try {
            this.pin.writeSync(state ? 1 : 0);
            return { success: true, state: state };
        } catch (error) {
            console.error('Error controlling relay:', error);
            return { success: false, error: error.message };
        }
    }

    cleanup() {
        if (this.pin) {
            this.pin.unexport();
        }
    }
}

module.exports = RelayController;

// server/index.js additions
const RelayController = require('./controllers/RelayController');
const relayController = new RelayController();

// Add command handler
controller.on('relay:toggle', (command) => {
    const { pin, state } = command;
    const result = relayController.toggle(state);
    
    if (!result.success) {
        controller.emit('error', {
            type: 'relay',
            message: result.error
        });
    }
});

// Cleanup on exit
process.on('SIGINT', () => {
    relayController.cleanup();
    process.exit();
});
