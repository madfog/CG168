Ext.define('CG168.view.menu.EditMenus', {

    extend: 'Ext.List',
    xtype: 'editmenus',

    config: {

        title: 'Menus',

        itemCls: 'speaker',
        itemTpl:[
            '<h3>{id} <small>{name}</small></h3>',
            '<h4>{count} x {price}</h4>'
        ]
    },
    initialize:function(){
       // console.log('menus');
    }
});