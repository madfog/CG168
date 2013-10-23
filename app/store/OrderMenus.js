/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-10
 * Time: 上午8:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.store.OrderMenus', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {
        model: 'CG168.model.Menu'
    }
})
