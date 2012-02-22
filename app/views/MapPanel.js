app.mapPanel = new Ext.Panel({
    title: 'Map',
    fullscreen: true,
    iconCls: 'info',
    scroll: false,
    dockedItems:[{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Trail',
        layout: { pack: 'right' },
        items: [{
                iconCls: 'locate', 
                iconMask: true, 
                ui: 'plain',
                handler: function () {
                    app.trailMap.geoLocate();
                }
            }]
    }],
    items: [{
        xtype: "component",
        scroll: false,
        monitorResize: true,                                                           
        id: "map"
    }]
});