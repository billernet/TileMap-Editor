"use strict";

window.ContextWrapper = function (elementId, tileConfiguration) {
    var base = this;
    var canvas = document.getElementById(elementId);
    var $canvas = $(canvas);

    var defaultTileConfiguration = {
        height: 384,
        width: 768,
        rowLength: 20,
        cellSpace: 0,
        gridEdit: false
    };

    this.tileConfiguration = $.extend({}, defaultTileConfiguration, tileConfiguration);

    $canvas.attr("height", this.tileConfiguration.height).attr("width", this.tileConfiguration.width);
    this.context = canvas.getContext("2d");

    this.context.fillBackground = function (color) {
        base.context.fillStyle = color;
        base.context.fillRect(0, 0, $canvas.attr("width"), $canvas.attr("height"));
    };

    this.context.clearAll = function () {
        base.context.clearRect(0, 0, $canvas.attr("width"), $canvas.attr("height"));
    };

    this.context.circle = function (centerX, centerY, radius, options) {
        base.context.beginPath();
        $.extend(base.context, options);
        base.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        base.context.stroke();
    };

    return this;    
};

window.TileSet = function (imageAsset, tileConfiguration) {
    var tileSet = this;
    var defaultTileConfiguration = {
        height: 16,
        width: 16,
        rowLength: 1,
        cellSpace: 0,
        edgeSpace: 0,
        isPattern: true
    };


    this.radians = Math.PI / 180;

    tileSet.imageLoaded = false;
    tileSet.onReady = function () {
        return true;
    };
    tileSet.imageAsset = imageAsset;

    this.spliceX = 0;
    this.spliceY = 0;

    tileSet.tileConfiguration = $.extend({}, defaultTileConfiguration, tileConfiguration);

    tileSet.draw = function (context, id, x, y, w, h) {
        //Convert the cell ID to the x-y coordinates.

        var coords = window.IndexToCoordinates(id, this.tileConfiguration.rowLength);

        this.spliceX = coords.X;
        this.spliceY = coords.Y;

        if (!w) {
            w = this.tileConfiguration.width;
        }
        if (!h) {
            h = this.tileConfiguration.height;
        }
        if (this.tileConfiguration.isPattern === true) {
            var patternCanvas = document.createElement("canvas");
            patternCanvas.width = this.tileConfiguration.width;
            patternCanvas.height = this.tileConfiguration.height;

            var patternContext = patternCanvas.getContext("2d");


            patternContext.drawImage(this.imageAsset.image,
                (this.spliceX * this.tileConfiguration.width)
                + (this.spliceX * this.tileConfiguration.cellSpace)
                + this.tileConfiguration.edgeSpace,
                (this.spliceY * this.tileConfiguration.height)
                + (this.spliceY * this.tileConfiguration.cellSpace)
                + this.tileConfiguration.edgeSpace,
                this.tileConfiguration.width,
                this.tileConfiguration.height,
                0,
                0,
                this.tileConfiguration.width,
                this.tileConfiguration.height);


            this.pattern = context.createPattern(patternCanvas, "repeat");
            context.fillStyle = this.pattern;
            context.fillRect(x, y, w, h);

            patternContext = null;
            patternCanvas = null;
        } else {
            context.drawImage(this.imageAsset.image,
                (this.spliceX * this.tileConfiguration.width) 
                    + (this.spliceX * this.tileConfiguration.cellSpace) 
                    + this.tileConfiguration.edgeSpace,
                (this.spliceY * this.tileConfiguration.height) 
                    + (this.spliceY * this.tileConfiguration.cellSpace) 
                    + this.tileConfiguration.edgeSpace,
                this.tileConfiguration.width,
                this.tileConfiguration.height,
                x,
                y,
                w,
                h);
        }
    };

    return tileSet;
};

// Class for managing assets on a canvas. All assets must implement an "onReady" function.
window.AssetManager = function () {
    var loadedItems = 0;
    var isActive = false; //So the ready signal isn't sent until prep is finished.

    var assetManager = this;
    assetManager.assets = [];

    assetManager.onReady = function () {
        return true;
    };

    assetManager.add = function (item) {
        if (item.onReady === "undefined") {
            throw new Error("Item will not raise ready event.");
        }

        assetManager.assets.push(item);
        item.onReady = function () {
            loadedItems++;
            isAllLoaded();
        };
    };

    assetManager.activate = function () {
        isActive = true;
        if (loadedItems === assetManager.assets.length) {
            assetManager.onReady();
        }
    };


    var isAllLoaded = function () {
        if (isActive && loadedItems === assetManager.assets.length) {
            assetManager.onReady();
        }
    };

    return assetManager;
};

window.ImageAsset = function (fileName) {
    var imageAsset = this;

    imageAsset.image = new Image();

    imageAsset.image.onload = function () {
        console.log(fileName + " has loaded.");
        imageAsset.imageLoaded = true;
        imageAsset.onReady();
    };
    imageAsset.image.src = "Resources/" + fileName;


    imageAsset.onReady = function () {
        return true;
    };
};
