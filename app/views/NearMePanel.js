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

