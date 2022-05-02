function clicClass(node, add) {
    const target = this.document.querySelectorAll(node);
    target.forEach(box => {
        box.addEventListener('click', () => box.classList.toggle(add));
    });
}
$(".vs1").val(0);
// //Listeners of the knobs
$(".vs1").knob({
    'change': function (v) {
        // console.log(  PARAMS.points[0].sample.binauralFIRNode);
        PARAMS.points[0].sample.binauralFIRNode.setPosition(v, 0, 1)
        // binauralFIRNode.setPosition(v, 0, 1);
    }
});

