/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-8
 * Time: 下午11:13
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.store.Tables', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {
        autoLoad:true,
        model: 'CG168.model.Table',

        grouper: {
            sortProperty: 'time',
            groupFn: function(record) {
                //return Ext.Date.format(record.get('time'), 'g:ia');
            }
        }
    }
})
