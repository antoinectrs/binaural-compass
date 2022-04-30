// Create an audio context
let AUDIO = new (AudioContext || webkitAudioContext || mozAudioContext)();
if (!AUDIO) throw 'Web Audio API not supported';
// Storage let for our buffer data
let binauralFIRNode= null;


// Decode the raw sample data into a AudioBuffer
function createBufferFromData(rawData) {
    console.log('Got raw sample data from XHR');
    AUDIO.decodeAudioData(rawData, function (buffer) {
        // console.log(`Created newAudioBuffer ${sampleBuffer}`);
        PARAMS.sampleBuffer.push(buffer);
        console.log('Ready to play');
    });
}
// Create a new source node and play it
function playSample(id,e, sampleRate) {
    const sampleBuffer = PARAMS.sampleBuffer[id]
    if (sampleRate === undefined) sampleRate = 1;
    hrtf(sampleRate);
    binauralFIRNode = new BinauralFIR({
        audioContext: AUDIO
    });
    //Set HRTF dataset
    binauralFIRNode.HRTFDataset = hrtfs;

    let sourceNode = AUDIO.createBufferSource();
    sourceNode.buffer = sampleBuffer;
    sourceNode.playbackRate.value = sampleRate;
    sourceNode.connect(binauralFIRNode.input);
    binauralFIRNode.connect(AUDIO.destination);

    binauralFIRNode.setPosition(90, 10, 1);
    sourceNode.loop = true;
    sourceNode.start(0);
    console.log('Played sample via new AudioBufferSourceNode');
}
function requestTrack(){
    // load sample
let req = new XMLHttpRequest();
req.responseType = "arraybuffer";

req.addEventListener('load', function (event) {
    createBufferFromData(req.response);
});

req.open('GET', `../examples/snd/urban/${this.path}.mp3`, true);
req.send();
}
function hrtf(sampleRate){

for (var i = 0; i < hrtfs.length; i++) {
    console.log();
    var buffer = AUDIO.createBuffer(2, 512, AUDIO.sampleRate   );
    // buffer = audioContext.createBuffer(2, 512, 44100);
    // }

    var bufferChannelLeft = buffer.getChannelData(0);
    var bufferChannelRight = buffer.getChannelData(1);
    for (var e = 0; e < hrtfs[i].fir_coeffs_left.length; e++) {
        bufferChannelLeft[e] = hrtfs[i].fir_coeffs_left[e];
        bufferChannelRight[e] = hrtfs[i].fir_coeffs_right[e];
    }
    hrtfs[i].buffer = buffer;
}
}
