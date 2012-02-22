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
