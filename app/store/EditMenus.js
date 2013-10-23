/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-14
 * Time: 下午10:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.store.EditMenus', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {
        model: 'CG168.model.Menu'
    }
})
