/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */


Ext.define('CG168.model.Menu', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'name',
            'type',
            'price',
            "count",
            'status'
        ]
    }
});