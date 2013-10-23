/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-21
 * Time: 下午10:12
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-20
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.util.ProxyOrders', {

    singleton: true,

    doSaveChange: function(callback) {

        var point = this;
        var editOrderStore = Ext.getStore('EditOrders'),

            userModel, proposalModel, orderModel,menuModel,orderMenuModel;

        //userStore.removeAll();

        var editcontent = {};
        for(var i = 0; i < editOrderStore.getCount(); i++)
        {
            var contentstr = "";
            var item =   editOrderStore.getAt(i);
            var count = 0;
            if(item)
            {
                for(var h in editOrderStore.getAt(i).getData())
                {
                    contentstr +=  ((count++>=1?";":"") + h+"="+editOrderStore.getAt(i).getData()[h]);
                }
            }


            editcontent["order_"+i] =  contentstr;
        }
        editcontent['tableId'] = currentTableID;

        Ext.data.JsonP.request({
            url: __urlMaps['save_order_edit'],
            callbackName: 'feedCb',
            params: editcontent,
            success: function(data) {
                if(data.result == 0)
                {
                    editOrderStore.removeAll();
                    if(data.orders && data.orders)
                    {
                        Ext.Array.each(data.orders,function(order){
                             if(order)
                             {

                                 var orderIndex = Ext.getStore('Orders').findBy(function(re,id){
                                     if(re.getData().tableId == order.tableId && re.getData().menuId == order.menuId)
                                     {
                                         return id;
                                     }
                                 });

                                 if(orderIndex >= 0)
                                 {
                                     console.log("exist tableId = "+ order.tableId + "   menuId= "+order.menuId);
                                     console.log("exist counr ="+order.count );
                                     if(order.count == 0 )
                                     {
                                         Ext.getStore('Orders').removeAt(orderIndex);
                                     }
                                     else
                                     {

                                         Ext.getStore('Orders').getAt(orderIndex).getData().count = order.count;
                                     }

                                 }
                                 else
                                 {
                                     console.log("new tableId = "+ order.tableId + "   menuId= "+order.menuId);
                                      var orderInfo = {};
                                     orderInfo.count = order.count;
                                     orderInfo.tableId =  order.tableId;
                                     orderInfo.menuId =  order.menuId;
                                     var orderItem = Ext.create("CG168.model.Order",orderInfo);
                                     Ext.getStore('Orders').add(orderItem);
                                 }
                                 point.updateOrderMenus(currentTableID);
                             }
                        });

                    }
                    callback(0);
                }
                callback(-1);
            }
        });

    },
    updateOrderMenus:function(tableId) {
        Ext.getStore("Orders").clearFilter();

        // 获得本桌的订单
        var orders = Ext.getStore("Orders").filterBy(function(or){
            if(or.getData().tableId == tableId) {return or;}
        });



        Ext.getStore("OrderMenus").removeAll();


        Ext.getStore("Orders").each(function(re){
            //currentOrderID =  re.getData().orderId;
            var menu = Ext.getStore("Menus").getAt(Ext.getStore("Menus").find("id",re.getData().menuId));
            if(menu)
            {
                menu.set("count",re.getData().count);

                Ext.getStore("OrderMenus").add(menu);
            }

        });
    }

});



