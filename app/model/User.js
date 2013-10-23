/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-15
 * Time: 下午10:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'name',
            'loginTime',
            'key',
            'gender'
        ]
    }
});
