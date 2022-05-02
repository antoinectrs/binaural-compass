
class Sample {
    constructor(path) {
        this.audio = new (AudioContext || webkitAudioContext || mozAudioContext)(),
            this.binauralFIRNode = null,
            this.path = path;
        this.hrtfs = hrtfs;
        this.path = path;
        this.decay= 0;
        this.sampleBuffer;
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
            this.sampleBuffer= buffer;
            console.log('Ready to play');
        });
    }
    // Create a new source node and play it
    // playSample(id, e, sampleRate) {
    playSample = (decay, e, sampleRate) => {
        // this.test()
        // const sampleBuffer =   this.sampleBuffer;
        if (sampleRate === undefined) sampleRate = 1;
        this.hrtf(sampleRate);

        this.binauralFIRNode = new BinauralFIR({
            audioContext: this.audio
        });
        //Set HRTF dataset
        this.binauralFIRNode.HRTFDataset = this.hrtfs;

        let sourceNode = this.audio.createBufferSource();
        sourceNode.buffer =   this.sampleBuffer;
        sourceNode.playbackRate.value = sampleRate;
        sourceNode.connect(this.binauralFIRNode.input);
        this.binauralFIRNode.connect(this.audio.destination);

        this.binauralFIRNode.setPosition(90, 10, 1);
        sourceNode.loop = true;
        // console.log(decay);
        // this.audio.currentTime = decay; 
        sourceNode.start(0);
        console.log();
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
        req.open('GET', `../examples/snd/parc/${this.path}.wav`, true);
        req.send();
    }

    hrtf(sampleRate) {
        // this.hrtf = function (sampleRate) {
        for (var i = 0; i < this.hrtfs.length; i++) {
            var buffer = this.audio.createBuffer(2, 512, this.audio.sampleRate);
            var bufferChannelLeft = buffer.getChannelData(0);
            var bufferChannelRight = buffer.getChannelData(1);
            for (var e = 0; e < this.hrtfs[i].fir_coeffs_left.length; e++) {
                bufferChannelLeft[e] = this.hrtfs[i].fir_coeffs_left[e];
                bufferChannelRight[e] = this.hrtfs[i].fir_coeffs_right[e];
            }
            this.hrtfs[i].buffer = buffer;
        }
    }
}