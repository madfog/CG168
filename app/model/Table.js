/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-8
 * Time: 下午11:09
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.model.Table', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'status',
            'guests',
            'time',
            'cost'
        ]
    }
});
