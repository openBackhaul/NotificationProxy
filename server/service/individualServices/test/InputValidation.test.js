
const inputValidation = require('../InputValidation');

test('Controller: no input', () => {
    let valid = inputValidation.validateControllerRegisterInput(null, null, null, null, null);
    expect(valid).toBe(false);
});

test('Controller: normal case', () => {
    let address = {
        "ip-address" : {
            "ipv-4-address": "1.1.1.2"
        }
    };
    let valid = inputValidation.validateControllerRegisterInput("OpenDayLight2", "4.0.2", "HTTP", address, 1002);
    expect(valid).toBe(true);
});

test('Controller: normal with domain', () => {
    let address = {
        "domain-name" : "example.com"
    };
    let valid = inputValidation.validateControllerRegisterInput("OpenDayLight2", "4.0.2", "HTTP", address, 1002);
    expect(valid).toBe(true);
});

test('Subscriber: no input', () => {
    let valid = inputValidation.validateSubscriberInput(null, null, null, null, null, null);
    expect(valid).toBe(false);
});

test('Subscriber: normal case', () => {
    let address = {
        "ip-address" : {
            "ipv-4-address": "1.1.4.4"
        }
    };
    let valid = inputValidation.validateSubscriberInput("MicroWaveDeviceInventory", "1.0.0", "HTTP", address, 4004, "/v1/regard-device-object-creation");
    expect(valid).toBe(true);
});

test('Subscriber: normal with domain', () => {
    let address = {
        "domain-name" : "example.com"
    };
    let valid = inputValidation.validateSubscriberInput("MicroWaveDeviceInventory", "1.0.0", "HTTP", address, 4004, "/v1/regard-device-object-creation");
    expect(valid).toBe(true);
});