/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午3:12
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.view.menu.Info', {
    requires:["Ext.field.Checkbox",'Ext.field.Spinner'],
    extend: 'Ext.Container',
    xtype: 'menuInfo',
    obj:null,

    config: {
        cls: 'sessionInfo'
    } ,
    initialize: function() {
        var point =  this;
        //console.log("Menu initialize");
        //console.log(this.getData());
        //var Object = getObj();
        var data = Ext.getStore("Menu");
       //console.log(point);


        /**
         * {
            xtype: 'checkboxfield',
            name : point.name,
            label: point.name,
            value: point.name,
            checked: true
        }
         */



    }


});
