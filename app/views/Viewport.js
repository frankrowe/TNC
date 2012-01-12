/*
    Main Viewport panel array:
    -------------------
    0: Home Panel
    1: Trail List
    2: Main Trail Panel
    3: Safety & Rules
    4: Near Me
    5; Reach Out
*/


app.rulesPanel = new Ext.Panel({
    fullscreen: true,
    styleHtmlContent: true,
    fullscreen: true,
    style: 'background-color: #e6e5dc;',
    html: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Vestibulum auctor dapibus neque.</li></ul>',        
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Safety & Rules',
        items: [{
                ui: 'back',
                text: 'Home',
                handler: function () {
                app.views.viewport.setActiveItem(0, { type: 'slide', direction: 'right' });
            }
        }]
    }]
});

app.nearMePanel = new Ext.Panel({
    fullscreen: true,
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Near Me',
        items: [{
            ui: 'back',
            text: 'Home', 
            handler: function () {
                app.views.viewport.setActiveItem(0, { type: 'slide', direction: 'right' });
            }
        }]
    }]
});

app.reachOutPanel = new Ext.Panel({
    fullscreen: true,
    style: 'background-color: #e6e5dc;',
    styleHtmlContent: true,
    html: '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Vestibulum auctor dapibus neque.</li></ul>',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Reach Out',
        items: [{
            ui: 'back',
            text: 'Home', 
            handler: function () {
                app.views.viewport.setActiveItem(0, { type: 'slide', direction: 'right' });
            }
        }]
    }]
});

app.titlePanel = new Ext.Panel({
    style: 'background-color: #e6e5dc; border-bottom: 1px solid #ccc;',
    html: '<div style="text-align: center; padding-top: 80px;"><img src="app/img/nature.png" /></div>',
    height: 273
});

app.homePanel = new Ext.Panel({
    title: 'home',
    iconCls: 'home',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [app.titlePanel, app.mainMenu]
});

app.mapPanel = new Ext.Panel({
    title: 'Map',
    fullscreen: true,
    iconCls: 'info',
    scroll: false,
    dockedItems:[{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Trail',
        items: []
    }],
    items: [{
        xtype: "component",
        scroll: false,
        monitorResize: true,                                                           
        id: "map"
    }]
});

app.filterPanel = new Ext.Panel({
    title: 'Filter',
    fullscreen: true,
    scroll: true,
    iconCls: 'search',
    styleHtmlContent: true,
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Trail'
    }],
    items: [{
        xtype: 'fieldset',
        title: 'Seasons',
        cls: 'filterField',
        items: [{
            xtype: 'togglefield',
            name: 'spring',
            label: 'Spring',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }, {
            xtype: 'togglefield',
            name: 'summer',
            label: 'Summer',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }, {
            xtype: 'togglefield',
            name: 'fall',
            label: 'Fall',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }, {
            xtype: 'togglefield',
            name: 'winter',
            label: 'Winter',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }]
    }, {
        xtype: 'fieldset',
        title: 'Themes',
        cls: 'filterField',
        items: [{
            xtype: 'togglefield',
            name: 'Animals',
            label: 'Animals',
            value: 1,
            listeners: {
                change: app.changeActiveTheme
            }
        }, {
            xtype: 'togglefield',
            name: 'Plants',
            label: 'Plants',
            value: 1,
            listeners: {
                change: app.changeActiveTheme
            }
        }, {
            xtype: 'togglefield',
            name: 'Humans',
            label: 'Humans',
            value: 1,
            listeners: {
                change: app.changeActiveTheme
            }
        }, {
            xtype: 'togglefield',
            name: 'Science',
            label: 'Science',
            value: 1,
            listeners: {
                change: app.changeActiveTheme
            }
        }]
    }]
});

app.trailInfoPanel = new Ext.Panel({
    title: 'trailInfo',
    height: 1000,
    scroll: 'vertical',
    centered: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems:[{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Trail',
        items: []
        }],
    items: [
        {
            xtype: 'panel',
            styleHtmlContent: true,
            html: 'hi',
            height: 500,
            style: 'background-color: #e6e5dc; border-bottom: 1px solid #333;'
        }
    ]
});

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
            //app.trailMap.createMap();
            setTimeout(function () { app.trailMap.createMap(); }, 500);
        }
    }, {
        text: 'Filter',
        iconCls: 'search',
        handler: function () {
            app.trailPanel.setActiveItem(3, { type: 'slide', direction: 'left' });
            app.applyActiveTabStyle(this);
           // if (!app.trailMap.map) app.trailMap.createMap();
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

app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    items: [
      app.homePanel,
      app.trailListPanel,
      app.trailPanel,
      app.rulesPanel,
      app.nearMePanel,
      app.reachOutPanel
    ]
});