/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午3:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.store.Menus', {
    extend: 'Ext.data.Store',

    requires: 'Ext.DateExtras',

    config: {
        model: 'CG168.model.Menu',

        grouper: {
            sortProperty: 'price',
            groupFn: function(record) {
               // return Ext.Date.format(record.get('time'), 'g:ia');
                if(record.get('type') == 1)
                {
                    return "菜品";
                }
                if(record.get('type') == 2)
                {
                    return "主食";
                }
                if(record.get('type') == 3)
                {
                    return "酒水";
                }
                if(record.get('type') == 4)
                {
                    return "点心";
                }
            } ,
            grouper: {
                groupFn: function(record) {
                    return record.get('type');
                }
            }
        }
    }
})
