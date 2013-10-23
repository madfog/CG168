/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-9
 * Time: 下午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('CG168.util.ProxyTable', {

    singleton: true,

    process: function(url, callback) {

        var tableStore = Ext.getStore('Tables'),

            menuStore = Ext.getStore('Menus'),
            orderStore = Ext.getStore('Orders'),
            orderMenusStore = Ext.getStore('OrderMenus'),

            tableTimes=[],menus=[], proposalModel, orderModel,menuModel,orderMenuModel;

        Ext.data.JsonP.request({
            url: url,
            callbackName: 'feedCb',

            success: function(data) {
                    var i = 0;

                Ext.Array.each(data.menu, function(menu) {
                    //console.log(menu);
                    menuModel = Ext.create('CG168.model.Menu', menu);

                    menuStore.add(menuModel);
                });

                Ext.Array.each(data.proposals, function(proposal) {
                    menus = [];


                    Ext.Array.each(proposal.orders, function(order) {
                        var orderId =   order.id;
                        var tableId =   proposal.id;


                        Ext.Array.each(order.menus, function(menu) {
                            //order.menus.push({'id':menu.id,'count':menu.count});
                            var menuId = menu.id;
                            var count = menu.count;

                            var raw = {"orderId":orderId,"tableId":tableId,"menuId":menuId,"count":count};

                           // console.log(raw);
                            orderModel = Ext.create('CG168.model.Order', raw);
                            orderStore.add(orderModel);
                           // orderMenuModel.set('count',menu.count);
                          //  proposal.menus.push({'id':menu.id,'count':menu.count,'orderId':order.id});
                        });

                    });
                    proposalModel = Ext.create('CG168.model.Table', proposal);
                    tableStore.add(proposalModel);
                });
                //console.log(tableStore);



                callback();
            }
        });

    },
    refreshTableList:function(callback){

    }
});

