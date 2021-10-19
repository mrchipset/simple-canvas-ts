import { Canvas } from './Canvas'
import { Point } from './Point';

var canvas: Canvas = null;
var lastPoint:Point = null;
function onMouseDown(ev:MouseEvent) {
    lastPoint = new Point(ev.offsetX, ev.offsetY)
}

function onMouseMove(ev:MouseEvent) {
    if (lastPoint == null)
    {
        return
    }
    var point = new Point(ev.offsetX, ev.offsetY)
    canvas.drawLine(lastPoint, point)
    lastPoint = point
}

function onMouseUp(ev:MouseEvent) {
    var point = new Point(ev.offsetX, ev.offsetY)
    canvas.drawLine(lastPoint, point)
    lastPoint = null
}

function onColorChanged() {
    var _colorPicker = document.getElementById("color-picker") as HTMLInputElement;
    canvas.ctx.strokeStyle = _colorPicker.value;
}

function onLineWidthChanged() {
    var _rangeInput = document.getElementById("size-picker") as HTMLInputElement;
    canvas.ctx.lineWidth = _rangeInput.valueAsNumber;
}

window.addEventListener("load", () => {
    var _canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var _colorPicker = document.getElementById("color-picker") as HTMLInputElement;
    var _rangeInput = document.getElementById("size-picker") as HTMLInputElement;
    var _clearBtn = document.getElementById("clear") as HTMLInputElement;

    _rangeInput.min = "1";
    _rangeInput.max = "10";
    _rangeInput.step = "1";
    _rangeInput.value = "2";

    canvas = new Canvas(_canvas);
    canvas.resize(screen.availWidth, screen.availHeight)

    window.onresize = () => {
        canvas.resize(screen.availWidth, screen.availHeight)
    }

    _canvas.addEventListener("mousedown", onMouseDown)
    _canvas.addEventListener("mouseup", onMouseUp)
    _canvas.addEventListener("mousemove", onMouseMove)
    _colorPicker.addEventListener("blur", onColorChanged);
    _rangeInput.addEventListener("blur", onLineWidthChanged);
    _clearBtn.onclick = () => {
        canvas.clear()
    }
});