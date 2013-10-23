/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-15
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.store.EditOrders', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {
        model: 'CG168.model.Order'
    }
})
