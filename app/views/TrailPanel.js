app.trailBar = new Ext.TabBar({
    dock: 'bottom',
    ui: 'dark',
    layout: {
        pack: 'center'
    },
    items: [{
        text: 'Home',
        iconCls: 'home',
        handler: function () {
            app.views.viewport.setActiveItem(0, { type: 'slide', direction: 'right' });
        }
    }, {
        text: 'info',
        iconCls: 'info',
        handler: function () {
            app.trailPanel.setActiveItem(0, { type: 'slide', direction: 'left' });
            app.applyActiveTabStyle(this);
        }
    }, {
        text: 'Audio',
        iconCls: 'music1',
        handler: function () {
            app.trailPanel.setActiveItem(1, { type: 'slide', direction: 'left' });
            app.applyActiveTabStyle(this);            
        }
    }, {
        text: 'Map',
        iconCls: 'maps',
        handler: function () {
            app.trailPanel.setActiveItem(2, { type: 'slide', direction: 'left' });
            app.applyActiveTabStyle(this);            
            setTimeout(function () { app.trailMap.createMap(); }, 500);
        }
    }, {
        text: 'Filter',
        iconCls: 'search',
        handler: function () {
            app.trailPanel.setActiveItem(3, { type: 'slide', direction: 'left' });
            app.applyActiveTabStyle(this);           
        }
    }]
});


app.trailPanel = new Ext.Panel({
    id: 'trailPanel',
    fullscreen: true,
    layout: 'card',
    dockedItems: [
        app.trailBar
    ],
    items: [
        app.trailInfoPanel,
        app.themeTopicList,
        app.mapPanel,
        app.filterPanel
    ]
  });
