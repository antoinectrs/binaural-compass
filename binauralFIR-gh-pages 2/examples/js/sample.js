
class Sample {
    constructor(path) {
        this.audio = new (AudioContext || webkitAudioContext || mozAudioContext)(),
            this.binauralFIRNode = null,
            this.path = path;
        hrtfs;
        this.path = path;
        this.decay= 0;
        // Create an audio context
        // let audio = new (AudioContext || webkitAudioContext || mozAudioContext)();
        // if (!audio) throw 'Web audio API not supported';
        // Storage let for our buffer data
        // let binauralFIRNode= null;
    }

    // Decode the raw sample data into a AudioBuffer
    createBufferFromData(rawData) {
        console.log('Got raw sample data from XHR');
        this.audio.decodeAudioData(rawData, function (buffer) {
            // console.log(`Created newAudioBuffer ${sampleBuffer}`);
            PARAMS.sampleBuffer.push(buffer);
            console.log('Ready to play');
        });
    }
    // Create a new source node and play it
    // playSample(id, e, sampleRate) {
    playSample = (id, e, sampleRate) => {
        // this.test()


        const sampleBuffer = PARAMS.sampleBuffer[id]
        if (sampleRate === undefined) sampleRate = 1;
        this.hrtf(sampleRate);

        this.binauralFIRNode = new BinauralFIR({
            audioContext: this.audio
        });
        //Set HRTF dataset
        this.binauralFIRNode.HRTFDataset = hrtfs;

        let sourceNode = this.audio.createBufferSource();
        sourceNode.buffer = sampleBuffer;
        sourceNode.playbackRate.value = sampleRate;
        sourceNode.connect(this.binauralFIRNode.input);
        this.binauralFIRNode.connect(this.audio.destination);

        this.binauralFIRNode.setPosition(90, 10, 1);
        sourceNode.loop = true;
        sourceNode.start(0);
        console.log('Played sample via new AudioBufferSourceNode');
    }
    requestTrack(that = this) {
        // load sample
        let req = new XMLHttpRequest();
        req.responseType = "arraybuffer";
        console.log(that);
        req.addEventListener('load', function (event) {
            console.log(that);
            that.createBufferFromData(req.response);
        });
        req.open('GET', `../examples/snd/urban/${this.path}.mp3`, true);
        req.send();
    }

    hrtf(sampleRate) {
        // this.hrtf = function (sampleRate) {
        for (var i = 0; i < hrtfs.length; i++) {
            var buffer = this.audio.createBuffer(2, 512, this.audio.sampleRate);
            var bufferChannelLeft = buffer.getChannelData(0);
            var bufferChannelRight = buffer.getChannelData(1);
            for (var e = 0; e < hrtfs[i].fir_coeffs_left.length; e++) {
                bufferChannelLeft[e] = hrtfs[i].fir_coeffs_left[e];
                bufferChannelRight[e] = hrtfs[i].fir_coeffs_right[e];
            }
            hrtfs[i].buffer = buffer;
        }
    }
}