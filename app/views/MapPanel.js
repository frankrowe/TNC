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