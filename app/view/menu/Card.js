Ext.define('CG168.view.menu.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'menusContainer',


    config: {
        title: 'Menus',
        iconCls: 'team1',

        autoDestroy: false,

        items: [
            {
                xtype: 'foods',
                store: 'Menus',
                grouped: true,
                pinHeaders: false
            }
        ]
    }  ,
    initialize:function()
    {
        //console.log("Menus card init");
    }
});

