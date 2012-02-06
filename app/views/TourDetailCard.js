app.getDetailCard = function (record, options) {
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
                width: 200,
                cls: 'center',
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
        styleHtmlContent: true,
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
            tpl: [
                '<h2 class="tourTitle">{name}</h2>'
            ]
        },button,
        {
            xtype: 'panel',
            tpl: [
                    
                    '<audio src="audio/{name}.mp3" controls preload="auto" autobuffer></audio>',
                    '<ul id="greenList">',
                        '<li class="title">Seasons</li>',
                        '<tpl for="Object.keys(seasons)">',
                            '<li>{[values]}</li>',
                        '</tpl>',
                        '<li class="title">Themes</li>',
                        '<tpl for="Object.keys(themes)">',
                            '<li>{[values]}</li>',
                        '</tpl>',
                        '<li class="title">Topics</li>',
                        '<tpl for="Object.keys(topics)">',
                            '<li>{[values]}</li>',
                        '</tpl>',
                    '</ul>'
                ]
        }
        ]
    });
    detailCard.items.items[0].update(itemData);
    detailCard.items.items[2].update(itemData);
    //this.backButton.setText("Topics");
    return detailCard;
};