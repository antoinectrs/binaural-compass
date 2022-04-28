let binauralFIRNode1, oscilator;
function audioContextCheck(AudioContext) {
    if (typeof AudioContext !== "undefined") {
        return new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        return new webkitAudioContext();
    } else if (typeof mozAudioContext !== "undefined") {
        return new mozAudioContext();
    } else {
        alert("can't create audio context");
    }
}
window.onload = function () {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = audioContextCheck(AudioContext);
    loading(audioContext);
    // document.querySelector("body").addEventListener("touchstart", event => {

    // });
    // Button elements
    // playButton = document.getElementById('play');
    // console.log(playButton);
    // playButton.addEventListener('click', playSample, false);

}
function loading(audioContext) {
    // for cross browser compatibility
    // const AudioContext = window.AudioContext || window.webkitAudioContext;
    // let audioCtx = null;

    // audioCtx = new AudioContext();

    // var audioContext = audioContextCheck(AudioContext);
    var targetNode = audioContext.destination;

    // HRTF files loading
    for (var i = 0; i < hrtfs.length; i++) {
        var buffer = audioContext.createBuffer(2, 512, audioContext.sampleRate);
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

    //Create Audio Nodes
    var mediaElement1 = document.getElementById('source1');
    var player1 = audioContext.createMediaElementSource(mediaElement1);
    console.log(player1);
    var gainNode = audioContext.createGain();
    binauralFIRNode1 = new BinauralFIR({
        audioContext: audioContext
    });
    //Set HRTF dataset
    binauralFIRNode1.HRTFDataset = hrtfs;

    // //Create Audio Nodes
    // var mediaElement2 = document.getElementById('source2');
    // var player2 = audioContext.createMediaElementSource(mediaElement2);
    // var binauralFIRNode2 = new BinauralFIR({
    //     audioContext: audioContext
    // });
    // //Create Audio Nodes
    // var mediaElement3 = document.getElementById('source3');
    // var player3 = audioContext.createMediaElementSource(mediaElement3);
    // var binauralFIRNode3 = new BinauralFIR({
    //     audioContext: audioContext
    // });

    // oscilator = audioContext.createOscillator();

    // oscilator.type = "sine";
    // oscilator.frequency.value = "400";
    //Connect Audio Nodes
    player1.connect(gainNode);
    gainNode.connect(binauralFIRNode1.input);
    binauralFIRNode1.connect(targetNode);
    binauralFIRNode1.setPosition(0, 0, 1);

    // oscilator.connect(binauralFIRNode1.input);
    // binauralFIRNode1.connect(audioContext.destination);
    // binauralFIRNode1.setPosition(0, 0, 1);

    // //Set HRTF dataset
    // binauralFIRNode2.HRTFDataset = hrtfs;
    // //Connect Audio Nodes
    // player2.connect(binauralFIRNode2.input);
    // binauralFIRNode2.connect(targetNode);
    // binauralFIRNode2.setPosition(0, 0, 1);

    // //Set HRTF dataset
    // binauralFIRNode3.HRTFDataset = hrtfs;
    // //Connect Audio Nodes
    // player3.connect(binauralFIRNode3.input);
    // binauralFIRNode3.connect(targetNode);
    // binauralFIRNode3.setPosition(0, 0, 1);


    $(".vs1").val(0);
    //Listeners of the knobs
    $(".vs1").knob({
        'change': function (v) {
            // data-angleOffset=180 class="vs1" data-width="180" data-cursor=true data-thickness=".5"  data-min="-180" data-max="180" data-rotation="clockwise"
            binauralFIRNode1.setPosition(v, 0, 1);
            // binauralFIRNode.setPosition(180,30, 2);
        }
    });



    // $(".vs2").val(0);
    // //Listeners of the knobs
    // $(".vs2").knob(
    //     {
    //         'change': function (v) {
    //             // data-angleOffset=180 class="vs1" data-width="180" data-cursor=true data-thickness=".5"  data-min="-180" data-max="180" data-rotation="clockwise"
    //             binauralFIRNode2.setPosition(v, 0,1);
    //             // binauralFIRNode.setPosition(180,30, 2);
    //         }
    //     });
    // $(".vs3").val(0);
    // //Listeners of the knobs
    // $(".vs3").knob(
    //     {
    //         'change': function (v) {
    //             // data-angleOffset=180 class="vs1" data-width="180" data-cursor=true data-thickness=".5"  data-min="-180" data-max="180" data-rotation="clockwise"
    //             binauralFIRNode3.setPosition(v, binauralFIRNode3.getPosition().elevation, binauralFIRNode3.getPosition().distance);
    //             // binauralFIRNode.setPosition(180,30, 2);
    //         }
    //     });

}


// async function loadFile(filePath, audioCtx) {
//     console.log(filePath);
//     const track = await getFile(filePath, audioCtx);
//     return track;
// }
// async function getFile(filepath, audioCtx) {
//     const response = await fetch(filepath);
//     const arrayBuffer = await response.arrayBuffer();
//     const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
//     console.log(audioBuffer);
//     return audioBuffer;
// }