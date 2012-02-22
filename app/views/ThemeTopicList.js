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
                text: 'All',
                model: 'Topic',
                leaf: true
            },{
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
                text: 'All',
                model: 'Topic',
                leaf: true
            },{
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
                text: 'All',
                model: 'Topic',
                leaf: true
            },{
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
                text: 'All',
                model: 'Topic',
                leaf: true
            },{
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
        var theme = item.parentNode.attributes.record.data.text;
        console.log(theme);
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
                    var p = app.getDetailCard(record, { 'list': true });
                    app.trailPanel.setActiveItem(p, { type: 'slide', direction: 'left' });
                    setTimeout(function () { dataView.deselect(index); }, 500);
                }
            },
            collectData: function (records, startIndex) {
                // map over the records and collect just the ones we want
                var r = [];
                //If we want all topics, get records by Theme
                if(topic === "All"){
                    for (var i = 0; i < records.length; i++)
                        if (records[i].data.themes[theme])
                            r.push(this.prepareData(records[i].data, 0, records[i]));

                }
                //get records by topic
                else{
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].data.topics[topic]) {
                            r.push(this.prepareData(records[i].data, 0, records[i]));
                        }
                    }
                }
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


