import {Point} from './Point'
import {Line} from './Line'

export class Canvas {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas
        // this.canvas.setAttribute("width", "200")
        // this.canvas.setAttribute("height", "200")

        this.ctx = canvas.getContext("2d");
    }

    public width() : number { return this.canvas.width }
    public height() : number { return this.canvas.height }
    public resize(w: number, h: number): void {
        this.canvas.width = w
        this.canvas.height = h
    }

    public drawLine(pt1: Point, pt2: Point): void {
        this.ctx.lineWidth = 1;//设置线条宽度
        this.ctx.strokeStyle = "black";//设置线条颜色
        this.ctx.moveTo(pt1.x, pt1.y)
        this.ctx.lineTo(pt2.x, pt2.y)
        this.ctx.stroke()
    }

    public drawLines(Lines: Array<Line>): void {
        this.ctx.beginPath()
        Lines.forEach(element => {
            this.ctx.moveTo(element.pt1.x, element.pt1.y);
            this.ctx.lineTo(element.pt2.x, element.pt2.y);
        });
        this.ctx.stroke()
    }

    public drawSeries(Points: Array<Point>): void {
        this.ctx.beginPath()
        var pt1 = Points.at(0)
        this.ctx.moveTo(pt1.x, pt1.y)
        for (var id = 1; id < Points.length; ++id) {
            var pt = Points.at(id)
            this.ctx.lineTo(pt.x, pt.y)
        }
        this.ctx.stroke()
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

export function GetRandomNum(Min: number, Max: number): number {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

export function InitializeCanvas() :void {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var _canvas = new Canvas(canvas);
    _canvas.drawLine({x: 0, y: 0}, {x: 100, y: 100});

    var fps = 0
    var now = new Date()
    var lastUpdate = new Date()
    var fpsFilter = 50

    window.onresize = () => {
        _canvas.resize(window.innerWidth, window.innerHeight)
    }

    setInterval(() => {
        _canvas.clear()
        var series = new Array<Point>()
        for (var x = 0; x < _canvas.width(); x++)
        {
            var pt = new Point()
            pt.x = x
            pt.y = GetRandomNum(0, _canvas.height())
            series.push(pt)
        }
        _canvas.drawSeries(series);
        _canvas.ctx.fillText(fps.toString(), 10, 10)
        now = new Date()
        var delta = now.getMilliseconds() - lastUpdate.getMilliseconds();
        var thisFrameFPS = 1000 / delta;
        if (now != lastUpdate) {
            fps += (thisFrameFPS - fps) / fpsFilter;
            lastUpdate = now;
        }
    }, 1)
}



