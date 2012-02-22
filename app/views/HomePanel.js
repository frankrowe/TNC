Ext.regModel('MainMenu', {
    fields: ['text']
});

var store = new Ext.data.JsonStore({
    model  : 'MainMenu',
    data: [
        {text: 'Choose a Trail'},
        {text: 'Safety & Rules'},
        {text: 'Near Me'},
        {text: 'Reach Out'}
    ]
});


app.mainMenu = new Ext.List({
    flex: 1,
    cls: 'mainMenu',
    itemTpl: '{text}',
    store: store,
    singleSelect: false,
    listeners:{
        itemtap: function(record, ix){ 
            switch (ix){
                case 0: app.views.viewport.setActiveItem(1, 'slide'); break;            
                case 1: app.views.viewport.setActiveItem(3, 'slide'); break;
                case 2: app.views.viewport.setActiveItem(4, 'slide'); break;
                case 3: app.views.viewport.setActiveItem(5, 'slide'); break;
            }
            setTimeout(function(){record.deselect(ix);},500);
        }
    }
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