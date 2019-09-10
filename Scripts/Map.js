function Map(element, options) {
    if (element == undefined || element[0] == undefined || element[0].tagName !== "CANVAS") {
        throw "Invalid element. Element must be a jQuery object loaded with a canvas";
    }

    var plugin = this;

    plugin.tileSet = null;
    plugin.contextWrapper = null;
    plugin.selectedIndex = -1;
    plugin.selectedPalletIndex = -1;
    plugin.selectedLayerIndex = 0;
    plugin.brushActive = false;

    var defaults = {
        width: 768,
        height: 384,
        tileDimensions: [32, 32],
        cellSpace: 0,
        gridlines: false,
        highLight: true,
        layers: [],
        tileSetImageAsset: null,
        mapRowLength: 24,
        palletRowLength: 7,
        editable: false,
        selectable: false,
        highLightHover: false,
    };

    plugin.events = {
        onSelect: function (index) { element.trigger("map_selected", [ index ]); }
    }

    plugin.addLayer = function (name) {
        plugin.settings.layers.push({ name: name, isVisible: true, map: [] })
    }

    plugin.hideLayer = function (index) {
        if (index >= plugin.settings.layers.length) {
            throw "Out of range";
        }
        else {
            plugin.settings.layers[index].isVisible = false;
        }
    }

    plugin.showLayer = function (index) {
        if (index >= plugin.settings.layers.length) {
            throw "Out of range";
        }
        else {
            plugin.settings.layers[index].isVisible = true;
        }
    }

    plugin.draw = function () {

        plugin.contextWrapper.context.fillBackground("#EEEEDD");

        $.each(plugin.settings.layers, function () {
            $.each(this.map, function (index) {
                var coord = IndexToCoordinates(index, plugin.settings.mapRowLength);
                plugin.tileSet.draw(plugin.contextWrapper.context, this
                    , coord.X * plugin.settings.tileDimensions[0]
                    , coord.Y * plugin.settings.tileDimensions[1]
                    , plugin.settings.tileDimensions[0]
                    , plugin.settings.tileDimensions[1]);
            });
        });

        if (plugin.settings.gridlines === true) {
            drawGridLines();
        }

        if (plugin.settings.selectable === true && plugin.selectedIndex != -1) {
            drawSelectionBox();
        }

        if (plugin.settings.highLightHover === true) {

        }
    }

    var drawGridLines = function () {
        plugin.contextWrapper.context.strokeStyle = "grey";

        for (var x = plugin.settings.tileDimensions[0]; x <= element.attr("width"); x = x + plugin.settings.tileDimensions[0]) {
            plugin.contextWrapper.context.beginPath();
            plugin.contextWrapper.context.moveTo(x, 0);
            plugin.contextWrapper.context.lineTo(x, element.attr("height"))
            plugin.contextWrapper.context.stroke();
        }

        for (var y = plugin.settings.tileDimensions[1]; y <= element.attr("height"); y = y + plugin.settings.tileDimensions[1]) {
            plugin.contextWrapper.context.beginPath();
            plugin.contextWrapper.context.moveTo(0, y);
            plugin.contextWrapper.context.lineTo(element.attr("width"), y)
            plugin.contextWrapper.context.stroke();
        }
    }

    var drawSelectionBox = function () {
        if (plugin.selectedIndex != -1) {
            var coord = IndexToCoordinates(plugin.selectedIndex, plugin.settings.mapRowLength)

            plugin.contextWrapper.context.strokeStyle = "yellow";
            plugin.contextWrapper.context.strokeRect(coord.X * plugin.settings.tileDimensions[0]
                , coord.Y * plugin.settings.tileDimensions[1]
                , plugin.settings.tileDimensions[0]
                , plugin.settings.tileDimensions[1]);
        }
    }

    var drawHover = function () {

    }


    plugin.paint = function (brush) {

    }


    plugin.setOptions = function (options) {

        plugin.settings = $.extend({}, defaults, options);

        //If no layer has been given then default to one layer.
        if (plugin.settings.layers.length == 0) {
            plugin.addLayer("background");
        }

        plugin.contextWrapper = new ContextWrapper(element[0].id, plugin.settings);

        var tileOptions = {
            width: plugin.settings.tileDimensions[0]
            , height: plugin.settings.tileDimensions[1]
            , cellSpace: plugin.settings.cellSpace
            , edgeSpace: plugin.settings.edgeSpace
            , isPattern: false
            , rowLength: plugin.settings.palletRowLength //RowLength of the pallet

        }

        plugin.tileSet = new TileSet(plugin.settings.tileSetImageAsset, tileOptions);



        if (plugin.settings.editable == true || plugin.settings.selectable == true) {
            element.mousemove(function (e) {

                var coord = CoordinatesFromMouseEvent(e, plugin.settings.tileDimensions);
                plugin.contextWrapper.context.clearAll();
                plugin.draw();
                plugin.contextWrapper.context.strokeStyle = "white";
                plugin.contextWrapper.context.strokeRect(coord.X * plugin.settings.tileDimensions[0]
                    , coord.Y * plugin.settings.tileDimensions[1], plugin.settings.tileDimensions[0]
                    , plugin.settings.tileDimensions[1]);

                if (plugin.brushActive === true && plugin.selectedPalletIndex != -1) {
                    var index = CoordinatesToIndex(coord.X, coord.Y, plugin.settings.mapRowLength);
                    plugin.settings.layers[plugin.selectedLayerIndex].map[index] = plugin.selectedPalletIndex;
                }
            });
        }

        if (plugin.settings.editable === true) {

            element.mousedown(function (e) {
                if (e.which === 1) {
                    plugin.brushActive = true;
                }
            });

            element.mouseup(function (e) {
                if (e.which === 1) {
                    plugin.brushActive = false;
                }
            });

            element.blur(function () {
                plugin.brushActive = false;
            });


            element.click(function (e) {
                if (plugin.settings.editable === true && e.which === 1) {
                    if (plugin.selectedPalletIndex != -1) {
                        var coord = CoordinatesFromMouseEvent(e, plugin.settings.tileDimensions);
                        var index = CoordinatesToIndex(coord.X, coord.Y, plugin.settings.mapRowLength);
                        plugin.settings.layers[plugin.selectedLayerIndex].map[index] = plugin.selectedPalletIndex;
                    }
                }
            });
        }

        if (plugin.settings.selectable === true) {

            element.click(function (e) {
                var offset = $(this).offset();

                var coord = new Coordinate();
                coord.X = Math.floor((e.pageX - offset.left) / plugin.settings.tileDimensions[0]);
                coord.Y = Math.floor((e.pageY - offset.top) / plugin.settings.tileDimensions[1]);

                var index = CoordinatesToIndex(coord.X, coord.Y, plugin.settings.mapRowLength);

                plugin.selectedIndex = index;
                plugin.events.onSelect(index);
                drawSelectionBox();
            });

            element.mousemove(function (e) {
                var coord = CoordinatesFromMouseEvent(e, plugin.settings.tileDimensions);

                plugin.contextWrapper.context.clearAll();

                plugin.draw();

                plugin.contextWrapper.context.strokeStyle = "white";
                plugin.contextWrapper.context.strokeRect(coord.X * plugin.settings.tileDimensions[0]
                    , coord.Y * plugin.settings.tileDimensions[1], plugin.settings.tileDimensions[0]
                    , plugin.settings.tileDimensions[1]);
                drawSelectionBox();
            });
        }

        plugin.draw();
    }

    var init = function () {

        element.unbind();


        plugin.setOptions(options);

        element.data("map", plugin);
    }



    init();
}