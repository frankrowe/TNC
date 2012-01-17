
var getDetailCard = function (record, options) {
    var itemData = record.data;
    var backText = 'Back';
    var backIndex = 1;
    var button = {};
    if (options.map) {
        backText = 'Map';
        backIndex = 2;
    }
    else if (options.list) {
        backText = 'Tours';
        backIndex = 1;
        if(record.data.lat){
            button = new Ext.Button({
                ui: 'normal',
                text: 'Show On Map',
                handler: function (b, e) {                
                    app.trailPanel.setActiveItem(2, { type: 'slide', direction: 'left' });
                    app.applyActiveTabStyle(app.trailBar.items.items[3]);
                    app.trailMap.createMap();
                    app.trailMap.showTour(record.data.ID);
                }
            });
        }
    }
    var detailCard = new Ext.Panel({
        scroll: 'vertical',   
        height: 410,
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: 'Audio Tour',
            items: [{
                ui: 'back',
                text: backText,
                handler: function () {
                    app.trailPanel.setActiveItem(backIndex, { type: 'slide', direction: 'right' });
                }
            }]
        }],
        items: [{
            xtype: 'panel',
            styleHtmlContent: true,
                    
            tpl: [
                    "<h2>{name}</h2>",
                    "{info}",
                    '<audio src="{text}.mp3" controls preload="auto" autobuffer></audio>',
                    '<ul>',
                        '<tpl for="Object.keys(seasons)">',                        
                            '<li>{[values]}</li>',
                        '</tpl>',
                    '</ul>',
                    '<ul>',
                        '<tpl for="Object.keys(themes)">',                        
                            '<li>{[values]}</li>',
                        '</tpl>',
                    '</ul>',
                    '<ul>',
                        '<tpl for="Object.keys(topics)">',                        
                            '<li>{[values]}</li>',
                        '</tpl>',
                    '</ul>'
                ]
        },
        button
        ]
    });
    detailCard.items.items[0].update(itemData);
    //this.backButton.setText("Topics");
    return detailCard;
};


/******TRAIL LIST************/
Ext.regModel("TrailItem", {
    fields: [
        { name: "text", type: "string" },
        { name: "model", type: "string" },
        { name: "lat", type: "auto" },
        { name: "lng", type: "auto" },
        { name: "tours", type: "auto" }        
    ]
});

app.TrailStore = new Ext.data.Store({
    model: 'TrailItem',
    data: app.trailData
});

app.trailList = new Ext.List({
    height:410,
    itemTpl: '{text}',
    store: app.TrailStore,
    listeners: {
        itemtap: function (record, index) {
            app.trailMap.activeTrail = index;
            app.TourStore = new Ext.data.Store({
                model: 'Tour',
                id: 'ID',
                data: app.trailData[app.trailMap.activeTrail].tours
            });
            var trailname = app.trailData[index].text;
            app.trailInfoPanel.dockedItems.items[0].setTitle(trailname);
            app.mapPanel.dockedItems.items[0].setTitle(trailname);
            app.filterPanel.dockedItems.items[0].setTitle(trailname);            
            app.trailInfoPanel.items.items[0].update(app.trailData[index].desc);
            app.views.viewport.setActiveItem(2, 'slide');
            app.trailPanel.setActiveItem(0);
            app.applyActiveTabStyle(app.trailBar.items.items[1]);
            setTimeout(function () { record.deselect(index); }, 500);
        }
    }
});


/*******THEME/TOPIC LIST***********/
Ext.regModel("Theme", {
    fields: [
        { name: 'text', type: 'string' },
        { name: 'model', type: 'string' },
        { name: 'items', type: 'auto' }
    ]
});


app.themeTopics = {
        text: 'Audio Tours',
        items: [{
            text: 'Humans',
            model: 'Theme',
            items: [{
                text: 'Human History',
                model: 'Topic',
                leaf: true
            }, {
                text: 'Degradation & Restoration',
                model: 'Topic',
                leaf: true
            }, {
                text: 'Volunteerism',
                model: 'Topic',
                leaf: true
            }]
        },
        {
            text: 'Animals',
            model: 'Theme',
            leaf: false,
            items:[{
                model: 'Topic',
                text: 'Birds',
                leaf: true
            },{
                model: 'Topic',
                text: 'Mammals',
                leaf: true
            }, {
                model: 'Topic',
                text: 'Invertebrates',
                leaf: true
            }, {
                model: 'Topic',
                text: 'Reptiles & Amphibians',
                leaf: true
            }]
        },
        {
            text: 'Plants',
            model: 'Theme',
            items: [{
                text: 'Trees & Shrubs',
                model: 'Topic',
                leaf: true
            }, {
                text: 'Mosses, Ferns, Grasses, Fungi',
                model: 'Topic',
                leaf: true
            }, {
                text: 'Flowers',
                model: 'Topic',
                leaf: true
            }, {
                text: 'Ethnobotany & Edible Plants',
                model: 'Topic',
                leaf: true
            }, {
                text: 'Invasive plants',
                model: 'Topic',
                leaf: true
            }]
        },
        {
            text: 'Science',
            model: 'Theme',
            items: [{
                text: 'Ecology',
                model: 'Topic',
                leaf: true

            }, {
                text: 'Hydrology',
                model: 'Topic',
                leaf: true

            }, {
                text: 'Geology & Soils',
                model: 'Topic',
                leaf: true
            }]
        }]
};

app.ThemeStore = new Ext.data.TreeStore({
    model: 'Theme',
    proxy: {
        type: 'memory',
        data: app.themeTopics,
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});

/********List of Tours***********/

Ext.regModel("Tour", {
    fields: [
        { name: "ID", type: "int" },
        { name: "name", type: "string" },
        { name: "audio", type: "string" },
        { name: "seasons", type: "auto" },
        { name: "themes", type: "auto" },
        { name: "topics", type: "auto" },
        { name: "images", type: "auto" }
    ]
});

app.themeTopicList = new Ext.NestedList({
    fullscreen: true,
    title: 'Themes',
    store: app.ThemeStore,
    useTitleAsBackText: false,
    onItemDisclosure: true, 
    getItemTextTpl: function () {        
        var lol = [2, 5, 4, 2];
        var tplConstructor = '{text}' +
            '<tpl if="model === \'Theme\'">' +
                '<div class="metadata">' +
                    ' {[values.items.length]} topics' +
                '</div>' +
            '</tpl>'
            ;
        return tplConstructor;
    },
    getDetailCard: function (item, parent) {
        var topic = item.attributes.record.data.text;
        var parentData = parent.attributes.record.data;

        //create a list from the chosen topic
        var list = new Ext.List({
            itemTpl: '{name}',
            height: 410,
            store: app.TourStore,
            onItemDisclosure: true, 
            listeners: {
                itemtap: function (dataView, index, item, e) {
                    //get detail card
                    var id = app.currentTours[index].ID;
                    var record = dataView.store.getAt(id - 1);
                    var p = getDetailCard(record, { 'list': true });
                    app.trailPanel.setActiveItem(p, { type: 'slide', direction: 'left' });
                    setTimeout(function () { dataView.deselect(index); }, 500);
                }
            },
            collectData: function (records, startIndex) {
                // map over the records and collect just the ones we want
                var r = [];
                for (var i = 0; i < records.length; i++)
                    if (records[i].data.topics[topic])
                        r.push(this.prepareData(records[i].data, 0, records[i]));
                app.currentTours = r;
                return r;
            }
        });
        var listPanel = new Ext.Panel({
            title: 'gfgf',
            items: [list]
        });
        this.backButton.setText(parentData.text);
        this.title = topic;
        return listPanel;

    }
});


