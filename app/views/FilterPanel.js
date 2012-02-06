
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
            name: 'Spring',
            label: 'Spring',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }, {
            xtype: 'togglefield',
            name: 'Summer',
            label: 'Summer',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }, {
            xtype: 'togglefield',
            name: 'Fall',
            label: 'Fall',
            value: 1,
            listeners: {
                change: app.changeActiveSeason
            }
        }, {
            xtype: 'togglefield',
            name: 'Winter',
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

