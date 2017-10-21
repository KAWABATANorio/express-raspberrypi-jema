const express = require('express');
const router = express.Router();

config = {
  wpi: null,
  monitorPin: {
    pin: 24,
    inverted: true,
    duration: 0
  },
  controlPin: {
    pin: 23,
    inverted: false,
    duration: 1000
  }
};
router.config = null;

function getStatus() {
  return (config.monitorPin.inverted != true/*config.wpi.digitalRead(config.monitorPin.pin)*/);
}
function setStatus(on) {
  // config.wpi.digitalWrite(config.controlPin.pin, on);
}

/* GET users listing. */
router.get('/', (req, res) => {
  res.send({
    on: getStatus()
  });
});

router.put('/', (req, res) => {
  setStatus(req.on);
  setTimeout(function () {
    res.send({on: getStatus()});    
  }, config.controlPin.duration);
});

module.exports = router;
