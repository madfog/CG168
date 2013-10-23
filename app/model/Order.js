/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-8
 * Time: 下午11:11
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.model.Order', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'orderId',
            'tableId',
            'menuId',
            'count'
        ]
    }
});