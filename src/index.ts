import {Canvas, InitializeCanvas} from './Canvas'
import { Point } from './Point';

var canvas: Canvas = null;
var trace: Array<Point> = null;

function onMouseDown(ev:MouseEvent) {
    trace = new Array<Point>()
    trace.push(new Point(ev.offsetX, ev.offsetY))
}

function onMouseMove(ev:MouseEvent) {
    trace.push(new Point(ev.offsetX, ev.offsetY))
}

function onMouseUp(ev:MouseEvent) {
    trace.push(new Point(ev.offsetX, ev.offsetY))
    canvas.drawSeries(trace);
}

window.addEventListener("load", () => {
    var _canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas = new Canvas(_canvas);
    canvas.resize(screen.availWidth, screen.availHeight)

    window.onresize = () => {
        canvas.resize(screen.availWidth, screen.availHeight)
    }

    _canvas.addEventListener("mousedown", onMouseDown)
    _canvas.addEventListener("mouseup", onMouseUp)
    _canvas.addEventListener("mousemove", onMouseMove)
});