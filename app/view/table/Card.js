Ext.define('CG168.view.table.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'tableContainer',

    config: {

        title: 'Tables',
        iconCls: 'time',

        autoDestroy: false,

        items: [
            {
                xtype: 'tables',
                store: 'Tables',
                grouped: true,
                pinHeaders: false
            }
        ]
    }
});
