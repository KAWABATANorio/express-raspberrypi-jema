const express = require('express');
const router = express.Router();

config = {
  wpi: null,
  monitorPin: {
    pin: 23,
    inverted: true,
    mode: "in",
    pull: "down",
    enabled: true,
    duration: 0
  },
  controlPin: {
    pin: 24,
    inverted: false,
    mode: "out",
    pull: "down",
    enabled: true,
    duration: 1000
  }
};
router.config = config;

function getStatus() {
  return (config.monitorPin.inverted != config.wpi.digitalRead(config.monitorPin.pin));
}
function setStatus(on) {
  var monitorOn = (config.monitorPin.inverted != config.wpi.digitalRead(config.monitorPin.pin));
  if (monitorOn != on) {
    config.wpi.digitalWrite(config.controlPin.pin, !config.controlPin.inverted * 1);
    setTimeout(function () {
      config.wpi.digitalWrite(config.controlPin.pin, config.controlPin.inverted * 1);
    }, config.controlPin.duration);
  }
}

/* GET users listing. */
router.get('/', (req, res) => {
  res.send({
    on: getStatus()
  });
});

router.put('/', (req, res) => {
  setStatus(req.body.on == 'true' ? true : false);
  setTimeout(function () {
    res.send({on: getStatus()});    
  }, config.controlPin.duration * 1.1);
});

module.exports = router;
