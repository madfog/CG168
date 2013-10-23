/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午8:15
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.view.menu.Item', {

    extend: 'Ext.Component',
    xtype: 'menuitem',

    config: {

        cls: 'sessionInfo',



        tpl: Ext.create('Ext.XTemplate',

            {
                xtype: 'checkboxfield',
                name : '{name}',
                label: '{name}',
                /*
                 items:[
                 {
                 xtype:'spinnerfield',
                 label: 'num',
                 minValue: 0,
                 maxValue: 20,
                 increment: 1,
                 cycle: true
                 }
                 ],
                 */
                value: '{name}',
                checked: true
            }
        )
    }
});
