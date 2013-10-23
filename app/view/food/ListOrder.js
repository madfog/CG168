/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-14
 * Time: 上午9:04
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.view.food.ListOrder', {

    extend: 'Ext.List',
    xtype: 'foodsorder',

    config: {
        title: 'Menus',

        itemCls: 'speaker',
        itemTpl: [
            '<div class="food"><div class="item">{id}</div><div class="item">{name}</div><div class="item">{count} x {price}</div></div>'
        ]
    }
});
