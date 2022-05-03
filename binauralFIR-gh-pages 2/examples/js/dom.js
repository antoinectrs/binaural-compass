function clicClass(node, add) {
    const target = this.document.querySelectorAll(node);
    target.forEach(box => {
        box.addEventListener('click', () => box.classList.toggle(add));
    });
}
$(".vs1").val(0);
$(".vs2").val(0);
$(".vs3").val(0);
// //Listeners of the knobs
$(".vs1").knob({'change': function (v) {PARAMS.points[0].sample.binauralFIRNode.setPosition(v, 0, 1)}});
$(".vs2").knob({'change': function (v) {PARAMS.points[1].sample.binauralFIRNode.setPosition(v, 0, 1)}});
$(".vs3").knob({'change': function (v) {PARAMS.points[2].sample.binauralFIRNode.setPosition(v, 0, 1)}});

