window.IndexToCoordinates = function (index, rowLength) {    
    var x = index % rowLength;
    var y = Math.floor(index / rowLength);

    return new Coordinate(x, y);
};

window.CoordinatesToIndex = function (x, y, rowLength) {
    return (y * rowLength) + x;
};

function Coordinate(x, y) {
    var coord = {
        X: x,
        Y: y
    };

    coord.toString = function () {
        return "X: " + coord.X + ", Y: " + coord.Y;
    };

    return coord;
}

window.CoordinatesFromMouseEvent = function (event, tileDimensions) {
    var offset = $(event.target).offset();

    var coord = new Coordinate();
    coord.X = Math.floor((event.pageX - offset.left) / tileDimensions[0]);
    coord.Y = Math.floor((event.pageY - offset.top) / tileDimensions[1]);

    return coord;
};

window.CreatePalletMap = function (tiles) {
    var map = [];
    for (var i = 0; i < tiles; i++) {
        map.push(i);
    }
    return map;
};


function getMousePosition(element, e) {
    var rect = element.getBoundingClientRect();
    return new Coordinate(e.clientX - rect.left, e.clientY - rect.top);
}
