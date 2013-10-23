//<debug>
Ext.Loader.setPath({
    'Ext': '../../src',
    'Oreilly': 'app'
});
//</debug>
var currentTableID=0,currentOrderID,tableToMenu=false,loginUser=null;


/**
 * 所有的餐桌状态修改
 * @type {{check_login: string, do_login: string, do_logout: string, save_order_edit: string, save_table_edit: string}}
 * @private
 */
var __urlMaps = {
    "check_login":"data/check_login.js",
    "do_login":"data/login.js",
    "do_logout":"data/logout.js",
    "save_order_edit":"data/saveorders.js",
    "save_table_edit":"data/tables.js"
};
Ext.application({
    // Change the values below to re-configure the app for a different conference.

    title:   '餐馆168',

    // App namespace

    name: 'CG168',

    phoneStartupScreen:  'resources/img/startup.png',
    tabletStartupScreen: 'resources/img/startup_640.png',

    glossOnIcon: false,
    icon: {
        57: 'resources/img/icon.png',
        72: 'resources/img/icon-72.png',
        114: 'resources/img/icon-114.png'
    },

    // Dependencies

    requires: [
        'CG168.util.ProxyTable',
        'CG168.util.ProxyUser',
        'CG168.util.ProxyOrders'
    ],

    models: [
        'Menu' ,
        'Order' ,
       'Table' ,
       'User'
    ],

    views: [
        'Main',

        'menu.List',
        'menu.Detail',
        'menu.Info',
        'menu.Card',

        'about.Card',
        'about.List',
        'about.HtmlPage',
        'order.OrderNew',

        'food.List' ,
        'food.ListOrder' ,
        'food.EditList' ,

        'login.Card' ,

        'table.Info',
        'table.Detail',
        'table.Card',
        'table.List'
       // 'Menu.Info'
    ],

    controllers: [
        'Tables',
       'Login',
        'Menus',
        'About'
    ],

    stores: [
        'Menus',
        'Orders',
        'Tables',
        "OrderMenus",
        "EditOrders",
        "EditMenus"
    ],

    viewport: {
        autoMaximize: true
    },

    launch: function() {

        Ext.Viewport.setMasked({ xtype: 'loadmask' });


            CG168.util.ProxyTable.process('data/tables.js', function(){
                Ext.Viewport.add({ xtype: 'main' });
                Ext.Viewport.setMasked(false);
            })


        // setInterval(function(){
        //     Ext.DomQuery.select('link')[0].href = "resources/css/oreilly.css?" + Math.ceil(Math.random() * 100000000)
        // }, 1000);
    }

});
