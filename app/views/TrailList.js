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


app.trailListPanel = new Ext.Panel({
    fullscreen: true,
    style: 'background: #f7f7f7',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Choose a Trail',
        items: [{
            ui: 'back',
            text: 'Home', 
            handler: function () {
                app.views.viewport.setActiveItem(0, { type: 'slide', direction: 'right' });
            }
        }]
    }],
    items: [app.trailList]
});
