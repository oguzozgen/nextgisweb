/* global define */
define([
    "dojo/_base/declare",
    "webmap/Adapter",
    "ngw/route",
    "ngw/openlayers/layer/Grid"
], function (declare, Adapter, route, Grid) {
    return declare(Adapter, {
        createLayer: function (item) {
            var layer = new Grid(item.id, {
                url: route("style.image", {id: item.styleId}),
                params: {},
                singleTile: true,
                ratio: 1.25,
                isBaseLayer: false,
                type: "png",
                visibility: item.visibility,
                minScale: item.minScaleDenom ? (1 / item.minScaleDenom) : undefined,
                maxScale: item.maxScaleDenom ? (1 / item.maxScaleDenom) : undefined,
                opacity: item.transparency ? (1 - item.transparency / 100) : 1.0
            });

            layer.olLayer.getURL = function (bounds) {
                var size = this.getImageSize();
                return this.url + "?extent=" + bounds.toArray().join(",") +
                    "&size=" + size.w + "," + size.h;
            };

            return layer;
        }
    });
});