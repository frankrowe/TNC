function trailMap(){

    this.wayPoints = null;
    this.pathsLayer = null;
    this.trailData = {};
    this.map = null;
    this.activeTrail = null; 
    this.activeSeasons = {
        "Spring": true,
        "Summer": true,
        "Fall": true,
        "Winter": true
    };
    this.activeThemes = {
        "Animals": true,
        "Plants": true,
        "Humans": true,
        "Science": true
    };
    this.createMap = function () {
        var self = this;
        var i = this.activeTrail;
        this.trailData = app.trailData[i];
        var lat = this.trailData.lat;
        var lng = this.trailData.lng;
        var trailLocation = new L.LatLng(lat, lng);
        this.map = new L.Map('map', { attributionControl: false, maxZoom: 16 });
        //var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/02a99a6699894046b271fda1269711ab/997/256/{z}/{x}/{y}.png',
        var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/26250/256/{z}/{x}/{y}.png',
        
            cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &',          
            cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution}); 

        var contours = new L.TileLayer('http://{s}.toposm.com/us/contours/{z}/{x}/{y}.png', { subdomains: ['tile1', 'tile2', 'tile3'] });
        var relief = new L.TileLayer('http://{s}.toposm.com/us/color-relief/{z}/{x}/{y}.jpg', { subdomains: ['tile1', 'tile2', 'tile3'] });
        var osm = new L.TileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png');        
        var arc = new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png');
        var topo = new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png');
        var trails = new L.GeoJSON();

        var imageBounds = new L.LatLngBounds(
			            new L.LatLng(39.52996, -79.48844),
			            new L.LatLng(39.53751, -79.48046));

        this.map.setView(trailLocation, 16).addLayer(arc);
        this.drawTours();
        this.drawPaths();
    };

    this.addMarker = function (tour, show) {
        if (tour.ID === 0) var markerName = 'dist/images/park.png';
        else var markerName = 'dist/images/marker' + tour.ID + '.png';        
        var MyIcon = L.Icon.extend({
            iconUrl: markerName,
            shadowUrl: false,
            iconSize: new L.Point(31, 30),
            shadowSize: new L.Point(41, 41),
            iconAnchor: new L.Point(22, 20),
            popupAnchor: new L.Point(-3, -20)
        });
        var greenicon = new MyIcon();
        var latlng = new L.LatLng(tour.lat, tour.lng);
        var marker = new L.Marker(latlng, { icon: greenicon, id: tour.ID });
        this.wayPoints.addLayer(marker);
    };

    //add paths as geojson
    this.drawPaths = function () {
        if (this.pathsLayer !== null) this.map.removeLayer(this.pathsLayer);
        this.pathsLayer = new L.GeoJSON();

        this.pathsLayer.on('featureparse', function (e) {
            if (e.layer instanceof L.Path) {
                e.layer.setStyle({
                    color: e.properties.color,
                    opacity: 0.5,
                    weight: 5
                });
            }
        });

        if (this.trailData.geojson.length > 0) {
            for (var i = 0; i < this.trailData.geojson.length; i++) {                
                this.pathsLayer.addGeoJSON(this.trailData.geojson[i]);
            }
            this.map.addLayer(this.pathsLayer);
        }
    };

    //add tours as markers
    this.drawTours = function () {
        var self = this;
        if (this.wayPoints !== null) this.map.removeLayer(this.wayPoints);
        this.wayPoints = new L.FeatureGroup();
        /*
        Each point has one or more seasons. Go through each season on a point and
        compare to the active seasons in the filter. If any season is active,
        draw the point.
        */
        var allTours = this.trailData.tours;
        for (var i = 0; i < allTours.length; i++) {
            var tour = allTours[i];
            if (tour.lat) {
                var themes = tour.themes;
                var size = Object.size(themes);
                var y = 0;
                outerLoop:
                //check if the tour has an active theme
                for (var theme in themes) {
                    if (themes.hasOwnProperty(theme)) {
                        if (self.activeThemes[theme]) {
                            var seasons = tour.seasons;
                            var size = Object.size(seasons);
                            var x = 0;
                            seasonalLoop:
                            //check if the tour has an active season
                            for (var season in seasons) {
                                if (seasons.hasOwnProperty(season)) {
                                    if (self.activeSeasons[season]) {
                                        self.addMarker(tour);
                                        break outerLoop;
                                    }                                    
                                    x++;
                                }
                            }
                        }
                    }
                }
            }
        }

        this.wayPoints.on('click', function (e) {
            var index = e.layer.options.id;
            var index = index - 1;
            var record = app.TourStore.getAt(index);
            var p = app.getDetailCard(record, { 'map': true });
            app.trailPanel.setActiveItem(p, { type: 'slide', direction: 'left' });
        });

        this.map.addLayer(this.wayPoints);
    };

    this.showTour = function (ID) {
        var tour = this.trailData.tours[ID-1];
        var latlng = new L.LatLng(tour.lat, tour.lng);
        var marker = new L.Marker(latlng, {id: tour.ID });
        this.map.addLayer(marker);
        this.map.setView(latlng, 16)
    };

    this.geoLocate = function(){
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var loc = new L.LatLng(lat, lng);
            self.map.setView(loc, 16);
        });

    };
}