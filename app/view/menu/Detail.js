/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午9:15
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.view.menu.Detail', {

    extend: 'Ext.Container',
    xtype: 'menu',

    config: {

        layout: 'vbox',
        scrollable: true,

        title: '',

        items: [
            {
                xtype: 'menuInfo'
            },


            {
                xtype:'container',
                layout:"hbox",
                items:[
                    {
                        xtype: 'spacer'
                    },

                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype:"button",
                        text: 'Order'
                    }   ,
                    {
                        xtype: 'spacer'
                    }
                ]
            },
        ]

    }
});

