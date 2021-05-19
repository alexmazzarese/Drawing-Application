let canvas;
let ctx;
let savedImageData;
let dragging = false;
let usingBrush = false;
let strokeColor = 'black';
let fillColor = 'black';
let currentShape = 'line';
let background = "white";
let index = -1;
let line_Width = 2;
let triangleSides = 3;
let squareSides = 4;
let pentagonSides = 5;
let polygonSides = 6;
let heptagonSides = 7;
let octagonSides = 8;
let canvasWidth = 600;
let canvasHeight = 600;
let brushXPoints = new Array();
let brushYPoints = new Array();
let brushDownPos = new Array();
let undoArray = [];
let lastValue = null;
 
class DrawShape{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}

class MouseLoc{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

class PolygonPoint{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

let drawShape = new DrawShape(0,0,0,0);
let mousedown = new MouseLoc(0,0);
let loc = new Location(0,0); 
document.addEventListener('DOMContentLoaded', setupCanvas);
 
function setupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    canvas.addEventListener("mousedown", MouseDown);
    canvas.addEventListener("mousemove", MouseMove);
    canvas.addEventListener("mouseup", MouseUp);
}
 
function ChooseShape(shape){
    document.getElementById("new").className = "";
    document.getElementById("save").className = "";
    document.getElementById("brush").className = "";
    document.getElementById("line").className = "";
    document.getElementById("rectangle").className = "";
    document.getElementById("circle").className = "";
    document.getElementById("ellipse").className = "";
    document.getElementById("polygon").className = "";
    document.getElementById("polyline").className = "";
    document.getElementById("square").className = "";
    document.getElementById("triangle").className = "";
    document.getElementById("pentagon").className = "";
    document.getElementById("heptagon").className = "";
    document.getElementById("octagon").className = "";
    document.getElementById(shape).className = "selected";
    currentShape = shape;
}

function RadToDeg(rad){
    if(rad < 0){
        return (360.0 + (rad * (180 / Math.PI))).toFixed(2);
    } else {
        return (rad * (180 / Math.PI)).toFixed(2);
    }
}

function DegToRad(degrees){
    return degrees * (Math.PI / 180);
}
 
function getAngle(mouseX, mouseY){
    let a = mousedown.x - mouseX;
    let b = mousedown.y - mouseY;
    return RadToDeg(Math.atan2(a, b));
}

function getTrianglePoints(){
    let angle =  DegToRad(getAngle(loc.x, loc.y));
    let radiusX = drawShape.width;
    let radiusY = drawShape.height;
    let trianglePoints = [];
    for(let i = 0; i < triangleSides; i++){
        trianglePoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / triangleSides;
    }
    return trianglePoints;
}

function getTriangle() {
    let trianglePoints = getTrianglePoints();
    ctx.beginPath();
    ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
    for(let i = 1; i < triangleSides; i++) {
        ctx.lineTo(trianglePoints[i].x, trianglePoints[i].y);
    }
    ctx.closePath();
}

function getSquarePoints(){
    let angle =  DegToRad(getAngle(loc.x, loc.y));
    let radiusX = drawShape.width;
    let radiusY = drawShape.height;
    let squarePoints = [];
    for(let i = 0; i < squareSides; i++){
        squarePoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / squareSides;
    }
    return squarePoints;
}

function getSquare() {
    let squarePoints = getSquarePoints();
    ctx.beginPath();
    ctx.moveTo(squarePoints[0].x, squarePoints[0].y);
    for(let i = 1; i < squareSides; i++) {
        ctx.lineTo(squarePoints[i].x, squarePoints[i].y);
    }
    ctx.closePath();
}
 
function getPolygonPoints(){
    let angle =  DegToRad(getAngle(loc.x, loc.y));
    let radiusX = drawShape.width;
    let radiusY = drawShape.height;
    let polygonPoints = [];
    for(let i = 0; i < polygonSides; i++){
        polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / polygonSides;
    }
    return polygonPoints;
}

function getPolygon(){
    let polygonPoints = getPolygonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < polygonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function getPentagonPoints(){
    let angle =  DegToRad(getAngle(loc.x, loc.y));
    let radiusX = drawShape.width;
    let radiusY = drawShape.height;
    let polygonPoints = [];
    for(let i = 0; i < pentagonSides; i++){
        polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / pentagonSides;
    }
    return polygonPoints;
}

function getPentagon(){
    let polygonPoints = getPentagonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < pentagonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function getHeptagonPoints(){
    let angle =  DegToRad(getAngle(loc.x, loc.y));
    let radiusX = drawShape.width;
    let radiusY = drawShape.height;
    let polygonPoints = [];
    for(let i = 0; i < heptagonSides; i++){
        polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / heptagonSides;
    }
    return polygonPoints;
}

function getHeptagon(){
    let polygonPoints = getHeptagonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < heptagonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function getOctagonPoints(){
    let angle =  DegToRad(getAngle(loc.x, loc.y));
    let radiusX = drawShape.width;
    let radiusY = drawShape.height;
    let polygonPoints = [];
    for(let i = 0; i < octagonSides; i++){
        polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle),
        loc.y - radiusY * Math.cos(angle)));
        angle += 2 * Math.PI / octagonSides;
    }
    return polygonPoints;
}

function getOctagon(){
    let polygonPoints = getOctagonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < octagonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function updateRubberband(loc){
    drawShape.width = Math.abs(loc.x - mousedown.x);
    drawShape.height = Math.abs(loc.y - mousedown.y);
    if(loc.x > mousedown.x){
        drawShape.left = mousedown.x;
    } else {
        drawShape.left = loc.x;
    }
    if(loc.y > mousedown.y){
        drawShape.top = mousedown.y;
    } else {
        drawShape.top = loc.y;
    }
}

function drawRubberband(loc){
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    if(currentShape === "brush"){
        DrawBrush();
    } else if(currentShape === "line"){
        ctx.beginPath();
        ctx.moveTo(mousedown.x, mousedown.y);
        ctx.lineTo(loc.x, loc.y);
        ctx.stroke();
    } else if(currentShape === "polyline"){
        ctx.beginPath();
        ctx.moveTo(mousedown.x, mousedown.y);
        ctx.lineTo(loc.x, loc.y);
        ctx.stroke();
    } else if(currentShape === "circle"){
        let radius = drawShape.width;
        ctx.beginPath();
        ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if(currentShape === "ellipse"){
        let radiusX = drawShape.width / 2;
        let radiusY = drawShape.height / 2;
        ctx.beginPath();
        ctx.ellipse(mousedown.x, mousedown.y, radiusX, radiusY, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
    } else if(currentShape === "polygon"){
        getPolygon();
        ctx.stroke();
    } else if(currentShape === "rectangle"){
        ctx.strokeRect(drawShape.left, drawShape.top, drawShape.width, drawShape.height);

    } else if(currentShape === "square"){
        getSquare();
        ctx.stroke();
    } else if(currentShape === "triangle"){
        getTriangle();
        ctx.stroke();
    } else if(currentShape === "pentagon"){
        getPentagon();
        ctx.stroke();
    } else if(currentShape === "heptagon"){
        getHeptagon();
        ctx.stroke();
    } else if(currentShape === "octagon"){
        getOctagon();
        ctx.stroke();
    }
}
 
function moveRubberband(loc){
    updateRubberband(loc);
    drawRubberband(loc);
}
 
function AddBrushPoint(x, y, mouseDown){
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
}

function DrawBrush(){
    for(let i = 1; i < brushXPoints.length; i++){
        ctx.beginPath();
        if(brushDownPos[i]){
            ctx.moveTo(brushXPoints[i-1], brushYPoints[i-1]);
        } else {
            ctx.moveTo(brushXPoints[i]-1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

function mousePos(x,y){
    let cSize = canvas.getBoundingClientRect();
    return { x: (x - cSize.left) * (canvas.width  / cSize.width),
        y: (y - cSize.top)  * (canvas.height / cSize.height)
      };
}

function Save(){
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function Redraw(){
    ctx.putImageData(savedImageData,0,0);
}

function MouseDown(e){
    canvas.style.cursor = "crosshair";
    loc = mousePos(e.clientX, e.clientY);
    Save();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
    if(currentShape === 'brush'){
        usingBrush = true;
        AddBrushPoint(loc.x, loc.y);
    }
};
 
function MouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = mousePos(e.clientX, e.clientY);
    if(currentShape === 'brush' && dragging && usingBrush){
        if(loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight){
            AddBrushPoint(loc.x, loc.y, true);
        }
        Redraw();
        DrawBrush();
    } else {
        if(dragging){
            Redraw();
            moveRubberband(loc);
        }
    }
};
 
function MouseUp(e){
    canvas.style.cursor = "default";
    loc = mousePos(e.clientX, e.clientY);
    Redraw();
    moveRubberband(loc);
    dragging = false;
    usingBrush = false;
    undoArray.push(ctx.getImageData(0,0,canvas.width, canvas.height));
    lastValue = undoArray[undoArray.length - 1];
    index += 1;
};

function SaveImage(){
    var image = document.getElementById("jpeg-img");
    image.setAttribute('download', 'image.jpeg');
    image.setAttribute('href', canvas.toDataURL());
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(image));
    var dataE = document.getElementById("json-img");
    dataE.setAttribute('href', dataStr);
    dataE.setAttribute('download', 'image.json');
}
 
function NewImage(){
    let img = new Image();
    ctx.fillStyle = background;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img,0,0);
    img.src = 'image.jpeg';
    undoArray = [];
    index = -1;
}

function Undo(){
    if(index <= 0) {
        OpenImage();
    }
    else {
        index -= 1;
        undoArray.pop();
        ctx.putImageData(undoArray[index], 0, 0);
    }
}

function Redo(){
    index += 1;
    undoArray.push(lastValue);
    ctx.putImageData(undoArray[index], 0, 0);
}

function Translate(){
    ctx.translate(100, 0);
    Redraw();
    moveRubberband(loc);
}

function Rotate(){
    ctx.rotate(45 * Math.PI / 180);
    Redraw();
    moveRubberband(loc);
}

function Scale(){
    ctx.scale(1, 1);
    Redraw();
    moveRubberband(loc);
}