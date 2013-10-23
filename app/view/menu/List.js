Ext.define('CG168.view.menu.List', {

    extend: 'Ext.List',
    xtype: 'menus',

    config: {

        title: 'Menus',

        itemCls: 'speaker',
        itemTpl:[
            '<h3>{id} <small>{name}</small></h3>',
            '<h4>{price}</h4>',
            '<p>ewqewqewq</p>'
        ]
    },
    initialize:function(){
        // console.log('menus');
    }
});
