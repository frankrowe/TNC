Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


app.changeActiveSeason = function (slider, thumb, newValue, oldValue) {
    app.trailMap.activeSeasons[slider.name] = newValue;
    //if (newValue != oldValue) app.trailMap.drawTours();
};

app.changeActiveTheme = function (slider, thumb, newValue, oldValue) {
    app.trailMap.activeThemes[slider.name] = newValue;
    //if (newValue != oldValue) app.trailMap.drawTours();
};

app.applyActiveTabStyle = function (activeTab) {
    var tabsArray = app.trailBar.items.items
    for (var i = 0; i < tabsArray.length; i++)
        tabsArray[i].removeCls('x-tab-active');
    activeTab.addCls('x-tab-active');
};

app.calculateTopicTotals = function () {
    var tours = app.trailData[app.trailMap.activeTrail].tours;
    for (var i = 0; i < tours.length; i++) {
        var tour = tours[i];
        for (var topic in tour.topics) {
            //finish
        }
    }
};

app.getFlickrPhotos = function(){
    

    Ext.regModel('Photo', {
        root: 'items',
        fields: ['title']
    });

    var store = new Ext.data.Store({
        model: 'Photo',    
        proxy: {
            type: 'scripttag',
            url : 'http://api.flickr.com/services/feeds/photos_public.gne?tag=cat&mode=any&format=json',
            callbackParam : "jsoncallback"    
        }
    });

    store.load({
        scope   : this,
        callback: function(records, operation, success) {
            //the operation object contains all of the details of the load operation
            console.log(records);
        }
    });

};











