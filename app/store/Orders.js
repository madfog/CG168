/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-8
 * Time: 下午11:13
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.store.Orders', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {
        model: 'CG168.model.Order',

        grouper: {
            sortProperty: 'price',
            groupFn: function(record) {
                //return Ext.Date.format(record.get('time'), 'g:ia');
            }
        }
    }
})