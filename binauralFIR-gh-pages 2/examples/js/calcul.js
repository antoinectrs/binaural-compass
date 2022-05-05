function myLerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}
// linearly maps value from the range (a..b) to (c..d)
function mapRange(value, a, b, c, d) {
  // first map value from (a..b) to (0..1)
  value = (value - a) / (b - a);
  // then map it from (0..1) to (c..d) and return it
  return c + value * (d - c);
}
function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
function minIs(array) {
  return Math.min(...array);
}
function maxIs(array) {
  return Math.max(...array);
}
function mapArray(arr) {
  return arr.map(function (el) {
    return el.sample.audio.currentTime;
  });
};

function transition(index) {
  console.log(index);
  // index+=0.001
  if (index < 1) {
    return new Promise(resolve => { "none" })
    //   requestAnimationFrame(transition);
  } else {

    // return new Promise(resolve => {isLerping('resolved')})
  }
}

async function isLerping(value) {
  // console.log(value);
  let index = 0;
  const result = await transition(index);

  // console.log(result);
  // expected output: "resolved"
}

function scaryClown(newValue, oldValue, index = 0) {
  return new Promise(resolve => {
    // let lerpResult = 0;

    const draw = () => {
     
      if (index >= 0.99) {
        console.log(index);
        PARAMS.mouseTest = newValue;
        resolve(newValue)
      } else {
        index += 0.01;
        const softValue =  myLerp(oldValue, newValue, index);
        console.log(softValue);
        requestAnimationFrame(() => draw());
      }
    }
    draw()
  });
}

async function msg(newValue, oldValue) {
  oldValue = PARAMS.mouseTest;
  const msg = await scaryClown(oldValue, newValue);
  console.log('Message:', msg);
}

