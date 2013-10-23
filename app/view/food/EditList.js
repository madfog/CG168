/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-15
 * Time: 下午10:13
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.view.food.EditList', {

    extend: 'Ext.List',
    xtype: 'editfoods',

    config: {
        title: 'Menus',

        itemCls: 'speaker',
        itemTpl: [
            '<div class="food"><div class="item">{id}</div><div class="item">{name}</div><div class="item">{count} x {price}</div></div>'
        ]
    }
});
