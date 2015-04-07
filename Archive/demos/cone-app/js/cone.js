var diameter = 200,
    radius = diameter / 2,
	saveMouse,
	height = 200,
    slant = ((height / 2) / radius),
	currentPlaneZTranslate = 0,
	currentDeg = 0,
	cone, plane, movedCone, conicSection, g,
	planeSlop, planeHeight,
	planeWidth = 300;

var canvasHeight = 500,
    canvasWidth = 500;

function initializeCanvasElements(cvsID) {
    g = new Cango3D(cvsID);

    // g.clearCanvas();
    // g.setPropertyDefault("backgroundColor", "lightyellow");
    g.setWorldCoords3D(-canvasWidth / 2, -canvasHeight / 2, canvasWidth);
    // g.setLightSource(0, 100, 200);

    movedCone = g.createGroup3D();
    movedCone.transform.rotate(1, 0, 0, 270);
    initializeCube();
    initializeCone();
}

function initializeCone() {
    cone = getConeObj();
    movedCone.addObj(cone);

    createPlane();
    startDragging();
}

function initializeCube() {
    var cube = g.createGroup3D();

    var z1 = canvasHeight / 2,
        z2 = -canvasHeight / 2;

    var topCorners = [g.toWorldCoords3D(0, 0, z1),
                   g.toWorldCoords3D(canvasWidth, 0, z1),
                   g.toWorldCoords3D(canvasWidth, canvasHeight, z1),
                   g.toWorldCoords3D(0, canvasHeight, z1)];
    var bottomCorners = [g.toWorldCoords3D(0, 0, z2),
               g.toWorldCoords3D(canvasWidth, 0, z2),
               g.toWorldCoords3D(canvasWidth, canvasHeight, z2),
               g.toWorldCoords3D(0, canvasHeight, z2)];
    var faces = [topCorners, bottomCorners]

    for (var j = 0; j < 2; j++) {
        var corners = faces[j];
        var sq = ["M"];
        for (var i = 0; i < 4; i++) {
            sq[sq.length] = corners[i].x;
            sq[sq.length] = corners[i].y;
            sq[sq.length] = corners[i].z;
            if (i == 0) {
                sq[sq.length] = "L";
            }
        }
        sq[sq.length] = "Z";
        // var face = g.compilePath3D(sq, 'black');
        var face = g.compilePath3D(sq, 'rgba(255,255,255,0)');
        cube.addObj(face);
    }
    for (var j = 0; j < 4; j++) {
        var sq = ["M"];
        var index = j;

        sq[sq.length] = topCorners[index].x;
        sq[sq.length] = topCorners[index].y;
        sq[sq.length] = topCorners[index].z;

        sq[sq.length] = "L";
        sq[sq.length] = bottomCorners[index].x;
        sq[sq.length] = bottomCorners[index].y;
        sq[sq.length] = bottomCorners[index].z;

        index = (index + 1) % 4;
        sq[sq.length] = "L";
        sq[sq.length] = bottomCorners[index].x;
        sq[sq.length] = bottomCorners[index].y;
        sq[sq.length] = bottomCorners[index].z;

        sq[sq.length] = "L";
        sq[sq.length] = topCorners[index].x;
        sq[sq.length] = topCorners[index].y;
        sq[sq.length] = topCorners[index].z;

        sq[sq.length] = "Z";
        //var face = g.compilePath3D(sq,'black');
        var face = g.compilePath3D(sq, 'rgba(255,255,255,0)');
        cube.addObj(face);
    }
    movedCone.addObj(cube);
}

function startDragging() {
    movedCone.enableDrag(grabCone, dragCone, null);
}

function getConeObj() {
    // Create the cone 3D object.
    var coneShape = createCone(g, diameter, height);

    var coneObj = g.createGroup3D();
    coneObj.addObj(coneShape);

    return coneObj;
}

// Create the 3D object of cone
function createCone(g, diameter, height) {
    // Get the command for creating circle.
    var sq = shapes3D.circle(diameter);

    // Create the both top circle and bottom circle of cone.
    var circle1 = g.compilePath3D(sq, 'grey', 2);
    var circle2 = g.compilePath3D(sq, 'grey', 2);
    circle1.translate(0, 0, height / 2);
    circle2.translate(0, 0, -height / 2);

    var lines = g.createGroup3D();
    var circleRad = diameter / 2;

    // Create lines of top circles.
    for (var deg = 0; deg <= 360; deg += 30) {
        var lineCo = ['M', circleRad * Math.cos(deg * Math.PI / 180), circleRad * Math.sin(deg * Math.PI / 180), height / 2, 'L', 0, 0, 0];
        //var lineCo = ['M', circleRad * Math.cos(deg * Math.PI / 180), circleRad * Math.sin(deg * Math.PI / 180), height, 'L', 0, 0, height / 2];
        var line = g.compilePath3D(lineCo, 'grey', 1);
        lines.addObj(line);
    }

    // Create lines of bottom circles.
    for (var deg = 0; deg <= 360; deg += 30) {
        var lineCo = ['M', circleRad * Math.cos(deg * Math.PI / 180), circleRad * Math.sin(deg * Math.PI / 180), -height / 2, 'L', 0, 0, 0];
        //var lineCo = ['M', circleRad * Math.cos(deg * Math.PI / 180), circleRad * Math.sin(deg * Math.PI / 180), 0, 'L', 0, 0, height / 2];
        var line = g.compilePath3D(lineCo, 'grey', 1);
        lines.addObj(line);
    }

    // Create Group 3D object consist of all 3D object.
    var coneObj = g.createGroup3D();
    coneObj.addObj(circle1);
    coneObj.addObj(circle2);
    coneObj.addObj(lines);

    return coneObj;
}

/*
function createPlane(g, planeWidth) {
    // Get the command for creating circle.
    //var sq = shapes3D.square(220+5);
    var sq = shapes3D.square(planeWidth);
    var planeOutline = g.compilePath3D(sq, 'black', 2);

    var sq2 = shapes3D.square(planeWidth - 2);
    var fillPlane = g.compileShape3D(sq2, 'rgba(230,230,255,0.5)', 'rgba(230,230,255,0.5)');

    var plane = g.createGroup3D();
    plane.addObj(planeOutline);
    plane.addObj(fillPlane);

    return plane;
}

function setInitialPositionOfPlane(plane) {
    if (plane) {
        var translate = planeHeight.value,
            deg = getAngleFromSlope(planeSlop.value);
        translatePlane(plane, translate);
        rotatePlane(plane, deg);
    }
}

function translatePlane(plane, value) {
    var translateValue = value - currentPlaneZTranslate;
    plane.transform.translate(0, 0, translateValue);

    currentPlaneZTranslate = value;
    if (movedCone) {
        g.render(movedCone);
    }
}

function rotatePlane(plane, deg) {
    plane.rotate(0, 1, 0, -currentDeg);
    plane.rotate(0, 1, 0, deg);

    currentDeg = deg;
    if (movedCone) {
        g.render(movedCone);
    }
}

function removeRotationOfPlane() {
    plane.rotate(0, 1, 0, -currentDeg);
}

function rotatePlaneToCurrDeg() {
    plane.rotate(0, 1, 0, currentDeg);
}
*/

// Mouse grab handler.
function grabCone(mousePos) {
    saveMouse = mousePos;
}

// Mouse Drag handler.
function dragCone(mousePos) {
    // This drag function rotates an object around its drawing origin
    // assume a lever from drawing origin to drag point z=diameter is moved by csr
    var dragPt = { x: saveMouse.x - this.grabOfs.x, y: saveMouse.y - this.grabOfs.y, z: 200 },
        csrPt = { x: mousePos.x - this.grabOfs.x, y: mousePos.y - this.grabOfs.y, z: 200 },
        u, theta;

    saveMouse = mousePos;    // save these as reference for next drag
    // axis to rotate lever is the normal to plane defined by the 3 points
    u = calcNormal(this.dwgOrg, dragPt, csrPt);
    // calc angle between dragPt and csrPt (amount of rotation needed about axis 'u')
    theta = calcIncAngle(this.dwgOrg, dragPt, csrPt);    // degrees
    // apply this drag rotation to 'cube' Group3D
    movedCone.transform.rotate(u.x, u.y, u.z, theta);

    // redraw with rotation applied
    g.renderFrame(movedCone);
}

// Spin Value change handler
function planeAngleChange(val) {
    createPlane();
}

function planeHeightChange(val) {
    createPlane();
}

function coneSlopChange(value) {
    slant = parseFloat(value);
    radius = (height / 2) / slant;
    diameter = 2 * radius;

    movedCone.deleteObj(cone);
    initializeCone();

    g.renderFrame(movedCone);
}

function coneHeightChange(value) {
    height = parseFloat(value);
    radius = (height / 2) / slant;
    diameter = 2 * radius;

    movedCone.deleteObj(cone);
    initializeCone();
}

/*
function getAngleFromSlope(slope) {
    return 360 - (Math.atan(slope) * 180 / Math.PI);
}
*/


function createPlane() {
    cone.deleteObj(plane);

    var bound = radius,
        slop = parseFloat(planeSlop.value),
        offset = parseFloat(planeHeight.value);

    var point1 = [1, 1, 1],
        point2 = [1, -1, 1],
        point3 = [-1, -1, -1],
        point4 = [-1, 1, -1];
    var corners = [point1, point2, point3, point4];

    var index = 0, count = 4;

    while (index < count) {
        corners[index][0] = corners[index][0] * bound;
        corners[index][1] = corners[index][1] * bound;
        corners[index][2] = corners[index][2] * bound;
        index++;
    }

    index = 0;
    while (index < count) {
        var zOffset = (corners[index][0] * slop) + offset;
        if (Math.abs(zOffset * 2) > canvasHeight) {
            // if either bound goes out of the canvas then make it to the highest range,
            // and consequently change the value of x (z=mx+c).
            corners[index][2] = (canvasHeight / 2) * (zOffset / Math.abs(zOffset));
            corners[index][0] = (corners[index][2] - offset) / slop;
        }
        else {
            corners[index][2] = zOffset;
        }
        index++;
    }
    //console.log("corner1:" + corners[0][2] + " corner2:" + corners[1][2] + " corner3:" + corners[2][2] + " corner4:" + corners[3][2]);
    plane = null;
    plane = g.createGroup3D();

    var sq = ["M"];
    for (index = 0; index < count; index++) {
        sq[sq.length] = corners[index][0];
        sq[sq.length] = corners[index][1];
        sq[sq.length] = corners[index][2];

        if (index == 0) {
            sq[sq.length] = "L";
        }
        //console.log("corner " + (index + 1) + " x:" + corners[index][0] + " y:" + corners[index][1] + " z:" + corners[index][2]);
    }
    sq[sq.length] = "Z";

    var planeOutline = g.compilePath3D(sq, 'black');
    plane.addObj(planeOutline);

    var planeInner = g.compileShape3D(sq, 'rgba(227, 203, 203,0.4)', 'rgba(227, 203, 203,0.4)');
    plane.addObj(planeInner);

    cone.addObj(plane);

    intersection(slop, offset);
}

function intersection(slop, offset) {
    // Create intersection of plane and cone
    conicSection = g.createGroup3D();
    plane.addObj(conicSection);

    if (Math.abs(slop) < slant) {
        if (offset === 0) {
            drawPoint();
        }
        else {
            computeEllipse(slant, slop, offset);
        }
    }
    else if (Math.abs(slop) === slant) {
        if (offset === 0) {
            computeLine(slop);
        }
        else {
            computeParabola(slant, slop, offset, (height / 2));
        }
    }
    else if (Math.abs(slop) > slant) {
        computeHyperbola(slant, slop, offset, (height / 2));
    }

    g.renderFrame(movedCone);
}

function computeEllipse(slant, slop, offset) {
    var minorAxis = ((-Math.abs(offset)) / Math.sqrt(((slant * slant) - (slop * slop)))),
        count = 150,
        incrementFactor = (((-minorAxis) - minorAxis) / (count - 1)),
        a = ((slop * slop) - (slant * slant)),
        b = (2 * slop * offset),
        index = 0,
        y, c, disc, x1, x2, z1, z2;

    var coordinates1 = [], coordinates2 = [];

    while (index < count) {
        y = (minorAxis + (index * incrementFactor));
        c = ((offset * offset) - (((slant * slant) * y) * y));
        disc = ((b * b) - (4 * a * c));
        if (disc < 0) {
            disc = 0;
        }
        disc = Math.sqrt(disc);
        x1 = ((-b - disc) / (2 * a));
        x2 = ((-b + disc) / (2 * a));
        z1 = ((slop * x1) + offset);
        z2 = ((slop * x2) + offset);

        coordinates1[coordinates1.length] = x1;
        coordinates1[coordinates1.length] = y;
        coordinates1[coordinates1.length] = z1;

        coordinates2[coordinates2.length] = x2;
        coordinates2[coordinates2.length] = y;
        coordinates2[coordinates2.length] = z2;

        index++;
    }
    // Equation of ellipse: Ax2 + Bx + Cy2 + E=0
    // console.log("A:" + a + " B:" + a6 + " C:" + (-(slant*slant)) + " E:" + (offset * offset));

    var curves = makeRangeBound(coordinates1);
    for (var i = 0; i < curves.length; i++) {
        DrawConicSection(curves[i]);
    }
    curves = makeRangeBound(coordinates2);
    for (var i = 0; i < curves.length; i++) {
        DrawConicSection(curves[i]);
    }
}

function computeParabola(slant, slop, offset, coneHeight) {
    var y, x, z,
        count = 150,
        incrementFactor = (radius - (-radius)) / (count - 1),
        a = (slant * slant) / (2 * slop * offset),
        c = -(offset * offset) / (2 * slop * offset),
        index = 0;
    var coordinates = [];

    while (index < count) {
        y = (-radius) + (index * incrementFactor);
        x = (a * y * y) + c;
        z = (slop * x) + offset;

        if (z <= coneHeight && z >= -coneHeight) {
            coordinates[coordinates.length] = x;
            coordinates[coordinates.length] = y;
            coordinates[coordinates.length] = z;
            // console.log("Parabola x:" + a2 + " y:" + a1 + " z:" + a3);
        }
        index++;
    }
    // Equation of parabola: x=a(y2)+c
    // console.log("a:" + a6 + " c:" + a7);
    DrawConicSection(coordinates);
}

function computeHyperbola(slant, slop, offset, coneHeight) {
    var count = 150,
        incrementFactor = (radius - (-radius)) / (count - 1),
        a = ((slop * slop) - (slant * slant)),
        b = 2 * slop * offset,
        index = 0,
        y, c, disc, x1, x2, z1, z2, temp;

    var coordinates1 = [], coordinates2 = [];

    while (index < count) {
        y = -radius + (index * incrementFactor);
        c = (offset * offset) - (slant * slant * y * y);
        disc = (b * b) - (4 * a * c);
        if (disc < 0) {
            disc = 0;
        }
        disc = Math.sqrt(disc);
        x1 = (-b - disc) / (2 * a);
        x2 = (-b + disc) / (2 * a);
        z1 = (slop * x1) + offset;
        z2 = (slop * x2) + offset;

        if (z2 < z1) {
            temp = x2;
            x2 = x1;
            x1 = temp;

            temp = z2;
            z2 = z1;
            z1 = temp;
        }
        if (z1 <= coneHeight && z1 >= -coneHeight) {
            coordinates1[coordinates1.length] = x1;
            coordinates1[coordinates1.length] = y;
            coordinates1[coordinates1.length] = z1;
            //console.log("Half1: x:" + x1 + " y:" + y + " z:" + z1);
        }
        if (z2 <= coneHeight && z2 >= -coneHeight) {
            coordinates2[coordinates2.length] = x2;
            coordinates2[coordinates2.length] = y;
            coordinates2[coordinates2.length] = z2;
            //console.log("Half2: x:" + x2 + " y:" + y + " z:" + z2);
        }
        index++;
    }
    // Equation of hyperbola: Ax2 + Bx + Cy2 + E=0
    // console.log("A:" + a + " B:" + b + " C:" + (-(slant*slant)) + " E:" + (offset * offset));

    DrawConicSection(coordinates1);
    DrawConicSection(coordinates2);
}

function computeLine(slop) {
    var coordinates = [],
        a1 = -radius,
        a2 = radius;
    coordinates[coordinates.length] = a1;
    coordinates[coordinates.length] = 0;
    coordinates[coordinates.length] = (slop * a1);

    coordinates[coordinates.length] = a2;
    coordinates[coordinates.length] = 0;
    coordinates[coordinates.length] = (slop * a2);

    DrawConicSection(coordinates);
}

function drawPoint() {
    var sq = shapes3D.circle(10);
    var circle = g.compileShape3D(sq, 'green', 'green');
    conicSection.addObj(circle);

    plane.addObj(conicSection);
    g.renderFrame(movedCone);
}

function DrawConicSection(coordinates) {
    var sq = ["M"];
    sq = sq.concat(coordinates.splice(0, 3));
    sq[sq.length] = "L";
    sq = sq.concat(coordinates);

    var section = g.compilePath3D(sq, "green", 3);
    conicSection.addObj(section);

    //plane.addObj(conicSection);
    //plane.addObj(conicSection);
    //renderConicOnCanvas(sq);
    //g.renderFrame(movedCone);
}

function renderConicOnCanvas(sq) {
    var section = g.compilePath3D(sq, "green", 3);
    conicSection.addObj(section);

    plane.addObj(conicSection);
}

function makeRangeBound(coordinates) {
    var index = 0,
        length = coordinates.length,
        curves = [],
        curve = [];

    while (index < length) {
        var z = coordinates[index + 2]
        coneHeight = (height / 2);
        if (z > coneHeight || z < -coneHeight) {
            if (curve.length / 3 > 1) {
                curves[curves.length] = curve;
            }
            curve = [];
        }
        else {
            curve[curve.length] = coordinates[index];
            curve[curve.length] = coordinates[index + 1];
            curve[curve.length] = coordinates[index + 2];
        }
        index += 3;
    }
    if (curve.length / 3 > 1) {
        curves[curves.length] = curve;
    }
    return curves;
}

function onDocload() {
    planeSlop = document.getElementById('plane-slope');
    planeHeight = document.getElementById('plane-height');

    //drawCube('cvs1');
    initializeCanvasElements('cvs2');
    /*
      var elem = document.createElement("span");
      var charStr = "1", str = "";
      for (var i = 0; i < 100; i++) {
          str = str + charStr;
      }
      elem.style.fontFamily = "Helvetica";
      elem.style.fontSize = "14px";
      elem.style.display = "inline-block";
  
      elem.innerHTML = str;
      document.body.appendChild(elem);
    */
}