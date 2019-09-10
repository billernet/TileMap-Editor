

        //Get an asset manager for the images
        var assetManager = new AssetManager();

        $(function () {

            var demos = [];

            demos.push({
                name: "Demo One",
                value: demo1
            });
            demos.push({
                name: "Demo Two",
                value: demo2
            });
            demos.push({
                name: "Super Mario Bros",
                value: mario
            });
            demos.push({
                name: "Chips Challenge",
                value: chipsChallenge
            })
            demos.push({
                name: "The Chaos Engine",
                value: chaosEngine
            });
            demos.push({
                name: "Dune 2",
                value: dune2
            });
            demos.push({
                name : "Pokemon FireRed",
                value : pokemonFireRed
            })

            var select = $("#predefined-maps");
            $(demos).each(function (index) {
                var option = $("<option>");
                option.text(this.name);
                option.attr("value", index);
                option.data("instance", this.value);
                select.append(option);
            })

            select.change(function () {
                var selectedPredefined = $(this).find("option:selected").data("instance");
                assetManager = new AssetManager();
                var tileSet = new ImageAsset(selectedPredefined.tileSet);
                assetManager.add(tileSet);

                assetManager.onReady = function () {
                    loadPredefined(selectedPredefined, this);
                }
                //clear the layers
                $(".select-layer").closest("li").remove();
                assetManager.activate();
            })  
            
            select.val(0);
            select.change();
            
            $("#layers").on("click", "#add-layer", function () {
                var map = $("#mainmap").data("map");
                var newIndex = map.settings.layers.length;
                map.addLayer("New Layer " + newIndex);
                map.selectedLayerIndex = newIndex;
                addLayer("New Layer " + newIndex, newIndex)
            });
            
            $("#layers").on("click", ".select-layer", function () {
                selectLayer($(this).data("index"));
            });

        });

        var loadPredefined = function (predefined) {

            predefined.mainMap.tileSetImageAsset = assetManager.assets[0];
            predefined.pallet.tileSetImageAsset = assetManager.assets[0];

            var mapOptions = {
                map: [],
                editable: true
            };
            mapOptions = $.extend(mapOptions, predefined.mainMap);

            var palletOptions = {
                gridlines: true,
                selectable: true
            };
            palletOptions = $.extend(palletOptions, predefined.pallet)

            //To create a map and a pallet, both objects must have the same tileSetImageAsset
            var mainMap = new Map($("#mainmap"), mapOptions);
            mainMap.draw();
            $(mainMap.settings.layers.reverse()).each(function (index) {
                addLayer(this.name, index)
            });
            
            var palletMap = new Map($("#pallet"), palletOptions);

            $("#pallet").on("map_selected", function (event, index) {
                mainMap.selectedPalletIndex = index;
                return index;
            });

            palletMap.draw();
        }
        
        var addLayer = function (name, index) {
            var newItem = $("<li><a href='Javascript:void(0);' class='select-layer'><span class=''></span></a>");

            newItem.find(".select-layer").data("index", index);
            newItem.find(".select-layer").text(name);
            
            $("#add-layer").closest("li").before(newItem);
            selectLayer(index);
        }
        
        var selectLayer = function (index) {
            var map = $("#mainmap").data("map");                
            map.selectedLayerIndex = index;
            $("#current-layer").text(map.settings.layers[index].name);
        }
