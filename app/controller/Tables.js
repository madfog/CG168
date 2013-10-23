/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-9
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */


Ext.define('CG168.controller.Tables', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            tables: 'tables',
            //session: 'session',
            tableInfo: 'tableContainer tableInfo',
            table: 'tableContainer table',
            tablein: 'table container',
            tableOrders: 'tableContainer list',
            tableContainer: 'tableContainer',
            tableFieldPicker: 'tables segmentedbutton',

            orders: 'tableContainer orders',
            menus:  'tableContainer foodsorder',
            foods:  'tableContainer foods',
            orderconfirm:  'ordernew button',

            menuInfo: 'tableContainer menuInfo'
        },
        control: {
            tables: {
                initialize: 'initTables',
                itemtap: 'onTableTap'
               // activate:"onTablesActivate"
            },
            table:{
                activate:"onTableActivate"
            },
            tableFieldPicker: {
                toggle: 'onTableFieldChange'
            },

            orders: {
                itemtap: 'onOrderTap'
            },
            orderconfirm:{
                tap:"onConfirmEdit"
            },
            menus: {
                itemtap: 'onMenuTap'
            },
            foods:{
                itemtap: 'onFoodTap'
            }
        }
    },
    onConfirmEdit:function(){
        var ss = this;
         CG168.util.ProxyOrders.doSaveChange(function(ret){
             ss.view.hide();
        });
    } ,
    initTables: function() {
        //console.log("initTables");
        currentTableID=0;
        currentOrderID=0;
        var firstButton = this.getTableFieldPicker().getItems().items[0];
        //console.log(firstButton);
        this.getTableFieldPicker().setPressedButtons(firstButton);

        this.filterByButton(firstButton);
    },

    onTableActivate:function(newActiveItem, oldActiveItem, eOpts)
    {
        tableToMenu = false;
        //console.log(newActiveItem,oldActiveItem, eOpts);
        //console.log("onTableActivate")
        if(!this.view)
        {
            this.view = Ext.create("CG168.view.order.OrderNew");
        }
        var view = this.view;
        //view.setLoan(loan);
        // 获得 当前餐桌的 改动的订单

        var eidtorders =  Ext.getStore("EditOrders");
        eidtorders.clearFilter();

        eidtorders.filterBy(function(record){
            if(record.getData().tableId == currentTableID)
            {
                return record;
            }
        });

        var editmenus =    Ext.getStore("EditMenus");
        editmenus.removeAll();
        eidtorders.each(function(record){

             var menuId =  record.getData().menuId;
             var count =  record.getData().count;
             var index =   Ext.getStore("Menus").find("id",menuId);
             var menuItem;
            //console.log(record.getData(),index);
             var addItem;
             if(index>=0)
             {
                 menuItem =   Ext.getStore("Menus").getAt(index);
             }
            if(menuItem)
            {
                //console.log({"count":count,"id":menuItem.getData().id,"name":menuItem.getData().name,"price":menuItem.getData().price,"type":menuItem.getData().type});
                menuItem.getData().count = count;
                //console.log(menuItem.getData());
                editmenus.add(menuItem);
            }

        });

        if(Ext.getStore("EditMenus").getCount()>0)
        {
            if (true) {
                view.setWidth("60%");
                view.setHeight('85%');
                view.setTop(null);
                view.setRight("2%");
            }

            if (!view.getParent()) {
                Ext.Viewport.add(view);
            }

            view.show();
        }

    },


    onTableFieldChange: function(seg, btn) {
        this.filterByButton(btn);
    },

    filterByButton: function(btn) {
        //if (this.getTableOrders()) {
        //    this.getTableOrders().deselectAll();
        //}
        //console.log( btn.config.name );
        Ext.getStore('Tables').sort({
            property : btn.config.name,
            direction: 'ASC'
        });

    },

    onTableTap: function(list, idx, el, record) {
        //var orders = record.get('orders');
        //console.log("onTableTap");
        Ext.getStore("Orders").clearFilter();

        // 获得本桌的订单
        var orders = Ext.getStore("Orders").filterBy(function(or){
            if(or.getData().tableId == record.getData().id) {return or;}
        });

        currentTableID =  record.getData().id;
        currentOrderID =  record.getData().id;

        Ext.getStore("OrderMenus").removeAll();
        Ext.getStore("EditMenus").removeAll();

        // 获得订单里边的餐品
            Ext.getStore("Orders").each(function(re){
            //currentOrderID =  re.getData().orderId;
            var menu = Ext.getStore("Menus").getAt(Ext.getStore("Menus").find("id",re.getData().menuId));
            if(menu)
            {
                menu.set("count",re.getData().count);

                Ext.getStore("OrderMenus").add(menu);
            }

        });


        if (!this.table) {
            this.table = Ext.widget('table');
        }

        this.table.config.title = record.get('title');
        this.getTableContainer().push(this.table);
        this.getTableInfo().removeAll(true,true);
        //this.getTableIn().setRecord(record);
        //console.log("this.getTablein");
        //console.log(this.getTablein());
        this.getTablein().setRecord(record);
        this.initTableInner(record);
        this.initTableInfor(record);

    },
    initTableInfor:function(record)
    {
        this.getTableInfo().removeAll(true,true);

        var  table = {
            xtype: "textfield",
            label:"桌号" ,
            name:"name",
            value:record.getData().id ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        };
        var  status = {
            xtype: "textfield",
            label:"状态" ,
            name:"price",
            value:record.getData().status==0?"空闲":record.getData().status==1?"有人":"预定" ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        };
        var  time = {
            xtype: "textfield",
            label:"开桌时间" ,
            name:"time",
            value:record.getData().time?Ext.Date.format(new Date(record.getData().time), 'g:ia'):"无" ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        };

        var cost = Ext.create("Ext.field.Text",{
            label:"消费" ,
            name:"cost",
            value:record.getData().cost ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        });
        var spinner = Ext.create("Ext.field.Spinner",{
            label:"用餐人数" ,
            name:"count",
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            minValue: 0,
            maxValue: 100,
            increment: 1,
            value:record.getData().count,
            cycle: true ,
            listeners:{
                "spin":function(value,dir)
                {
                    //cost.setValue(dir*record.getData().price);
                    // record.getData().count =  dir;
                }
            }
        } );

        var bfInfo = Ext.create("Ext.field.Text",{
            label:"备注" ,
            name:"cost",

            border: 1,
            style: 'border-color: gray; border-style: solid;',
        });

        if(record.getData().status==0)
        {
            this.getTableInfo().add(table);
            this.getTableInfo().add(status);
            this.getTableInfo().add(spinner);
            this.getTableInfo().add(bfInfo);
        }
        else if(record.getData().status==1)
        {
            this.getTableInfo().add(table);
            this.getTableInfo().add(status);
            this.getTableInfo().add(time);
            this.getTableInfo().add(cost);
            this.getTableInfo().add(bfInfo);
        }
        else if(record.getData().status==2)
        {
            this.getTableInfo().add(table);
            this.getTableInfo().add(status);
            this.getTableInfo().add(time);
            this.getTableInfo().add(bfInfo);
        }
    },
    initTableInner:function(record)
    {
        //console.log(this.getTablein());
        //console.log(this.getTable().getItems().items[1]);
        var ss = this;
        var tableIn =   this.getTable().getItems().items[1];
        tableIn.removeAll(true,true);
        var btnOpen = Ext.create("Ext.Button",{
            text:"Open"
        })
        var btnPrev = Ext.create("Ext.Button",{
            text:"Prev"
        });
        var btnCancel = Ext.create("Ext.Button",{
            text:"Cancel"
        });
        var btnOrder = Ext.create("Ext.Button",{
            text:"Order"
        });

        var convertOrder = Ext.create("Ext.Button",{
            text:"convert"
        });

        var btnClose = Ext.create("Ext.Button",{
            text:"close"
        });

        btnOrder.on("tap",function(){ss.onEditBtnTap()});
        btnClose.on("tap",function(){ss.onCloseBtnTap()});
        btnPrev.on("tap",function(){ss.onPrevBtnTap()});
        btnCancel.on("tap",function(){ss.onCancleBtnTap()});
        convertOrder.on("tap",function(){ss.onConvertBtnTap()});
        btnOpen.on("tap",function(){ss.onOpenBtnTap()});




        var tableId = record.getData().id;

        if(record.getData())
        {
            var status = record.getData().status;
            //console.log("status = "+status);
            if(status == 0)// 空闲
            {
                tableIn.add({xtype:"spacer"});
                tableIn.add(btnPrev);
                tableIn.add({xtype:"spacer"});
                tableIn.add(btnOpen);
                tableIn.add({xtype:"spacer"});
            }
            else if(status == 1)  //有人
            {
                tableIn.add({xtype:"spacer"});
                tableIn.add(btnClose);
                tableIn.add({xtype:"spacer"});
                tableIn.add(btnOrder);
                tableIn.add({xtype:"spacer"});
            }
            else if(status == 2)  // 预定
            {
                tableIn.add(btnCancel);
                tableIn.add({xtype:"spacer"});
                tableIn.add(btnOrder);
                tableIn.add({xtype:"spacer"});
                tableIn.add(convertOrder);
                tableIn.add({xtype:"spacer"});
            }
        }
    },

    onCloseBtnTap:function()
    {
        var ss = this;
        Ext.Msg.confirm("Table change","客人离开，餐桌关闭",function(bid,value,opt){
            if(bid == 'yes')
            {
                Ext.getStore("Tables").clearFilter();
                var table = Ext.getStore("Tables").findBy(function(or,id){
                    if(or.getData().id == currentTableID) {return id;}
                });
                Ext.getStore("Tables").clearFilter();
                if(table >= 0)
                {
                    Ext.getStore("Tables").getAt(table).getData().status = 0;
                    Ext.getStore("Tables").getAt(table).getData().time = 0;
                    Ext.getStore("Tables").getAt(table).getData().guests = 0;
                    Ext.getStore("Tables").getAt(table).getData().cost = 0;
                }
                ss.onChangeTableStatus(currentTableID);
            }

        });
    },
    onPrevBtnTap:function()
    {
        var ss = this;
        Ext.Msg.confirm("Table change","预约本桌",function(bid,value,opt){
            if(bid == 'yes')
            {
                Ext.getStore("Tables").clearFilter();
                var table = Ext.getStore("Tables").findBy(function(or,id){
                    if(or.getData().id == currentTableID) {return id;}
                });
                Ext.getStore("Tables").clearFilter();
                if(table >= 0)
                {
                    Ext.getStore("Tables").getAt(table).getData().status = 2;
                    Ext.getStore("Tables").getAt(table).getData().time = 1381884050604;
                    Ext.getStore("Tables").getAt(table).getData().guests = 0;
                    Ext.getStore("Tables").getAt(table).getData().cost = 0;
                }
                ss.onChangeTableStatus(currentTableID);
            }

        });
    },
    onCancleBtnTap:function()
    {
        var ss = this;
        Ext.Msg.confirm("Table change","预约取消",function(bid,value,opt){
            if(bid == 'yes')
            {
                Ext.getStore("Tables").clearFilter();
                var table = Ext.getStore("Tables").findBy(function(or,id){
                    if(or.getData().id == currentTableID) {return id;}
                });
                Ext.getStore("Tables").clearFilter();
                if(table >= 0)
                {
                    Ext.getStore("Tables").getAt(table).getData().status = 0;
                    Ext.getStore("Tables").getAt(table).getData().time = 0;
                    Ext.getStore("Tables").getAt(table).getData().guests = 0;
                    Ext.getStore("Tables").getAt(table).getData().cost = 0;
                }
                ss.onChangeTableStatus(currentTableID);
            }

        })
    },
    onOpenBtnTap:function()
    {
        var ss = this;
        Ext.Msg.confirm("Table change","来了客人桌子状态变为有人",function(bid,value,opt){
            if(bid == 'yes')
            {
                Ext.getStore("Tables").clearFilter();
                var table = Ext.getStore("Tables").findBy(function(or,id){
                    if(or.getData().id == currentTableID) {return id;}
                });
                Ext.getStore("Tables").clearFilter();
                if(table >= 0)
                {
                    Ext.getStore("Tables").getAt(table).getData().status = 1;
                    Ext.getStore("Tables").getAt(table).getData().time = 1381884050604;
                    Ext.getStore("Tables").getAt(table).getData().guests = 5;
                }
                ss.onChangeTableStatus(currentTableID);
            }

        });
    },
    onConvertBtnTap:function()
    {
        var ss = this;
        Ext.Msg.confirm("Table change","预约客人来了，桌子状态变为有人？",function(bid,value,opt){
            if(bid == 'yes')
            {
                Ext.getStore("Tables").clearFilter();
                var table = Ext.getStore("Tables").findBy(function(or,id){
                    if(or.getData().id == currentTableID) {return id;}
                });
                Ext.getStore("Tables").clearFilter();
                if(table >= 0)
                {
                    Ext.getStore("Tables").getAt(table).getData().status = 1;
                    Ext.getStore("Tables").getAt(table).getData().time = 1381884050604;
                    Ext.getStore("Tables").getAt(table).getData().guests = 5;
                }
                ss.onChangeTableStatus(currentTableID);
            }

        });
    },

    onChangeTableStatus:function(tableId)
    {
        Ext.getStore("Tables").clearFilter();
        var table = Ext.getStore("Tables").findBy(function(or,id){
            if(or.getData().id == tableId) {return id;}
        });
        Ext.getStore("Tables").clearFilter();
        if(table >= 0)
        {
            var record =  Ext.getStore("Tables").getAt(table);
            this.getTableInfo().removeAll(true,true);
            //this.getTableIn().setRecord(record);
            //console.log("this.getTablein");
            //console.log(this.getTablein());
            this.getTablein().setRecord(record);
            this.initTableInner(record);
            this.initTableInfor(record);
        }

        Ext.getStore("Tables").clearFilter();
        var curButton = this.getTableFieldPicker().getPressedButtons()[0];
        this.filterByButton(curButton);
    },

    onEditBtnTap:function()
    {
        //console.log('onCloseBtnTap');
        Ext.getStore('Menus').clearFilter();
        if(!tableToMenu)
        {
            tableToMenu = true;
            this.getTableContainer().push({
                xtype: 'foods',
                store: Ext.getStore('Menus'),
                grouped: true,
                pinHeaders: false,
                indexBar: true
            });
        }

    },
    onUnbookBtnTap:function()
    {

    },

    onOrderTap: function(list, idx, el, record) {
       /*
        if (!this.OrderInfo) {
            this.speakerInfo = Ext.widget('speakerInfo', {
                scrollable: 'vertical'
            });
        }

        this.speakerInfo.config.title = record.getFullName();
        this.speakerInfo.setRecord(record);
        this.getSessionContainer().push(this.speakerInfo);
        */
    },

    onTablessActivate: function() {
        if (this.table) {
            this.table.down('orders').deselectAll();
        }
    },

    onMenuTap:function(list, idx, el, record)
    {
        //console.log("onMenuTap");
        var re = record;
        //console.log(re.raw);
        if (!this.menu) {
            this.menu = Ext.widget('menu', {
                scrollable: 'vertical'
            });
        }

        //this.menu.config.title = record.getFullName();
        /////console.log(list, idx, el, record);
        //this.menu.updateMyData(record);
        /*
         var ss = {
         xtype: 'spinnerfield',

         label: "    ",
         minValue: 0,
         maxValue: 100,
         increment: 1,
         cycle: false
         }

         this.menu.add(ss);
         */


        this.getTableContainer().push(this.menu);
        //this.iniMenuHandler();
        this.menu.removeAll();
        this.initMenuContent(record);
    },

    initMenuContent: function(record)
    {
        //console.log(record.getData());
        var  order = {
            xtype: "textfield",
            label:"名称" ,
            name:"name",
            value:record.getData().name ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        };
        var  price = {
            xtype: "textfield",
            label:"价格" ,
            name:"price",
            value:record.getData().price ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        };
        var  type = {
            xtype: "textfield",
            label:"类别" ,
            name:"type",
            value:record.getData().type ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        };
        var cost = Ext.create("Ext.field.Text",{
            label:"总计" ,
            name:"cost",
            value:record.getData().price*record.getData().count ,
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:true
        });
        var spinner = Ext.create("Ext.field.Spinner",{
            label:"count" ,
            name:"count",
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            minValue: 0,
            maxValue: 100,
            increment: 1,
            value:record.getData().count,
            cycle: true ,
            listeners:{
                "spin":function(value,dir)
                {
                    cost.setValue(dir*record.getData().price);
                   // record.getData().count =  dir;
                }
            }
        } );


        var keep = {
            xtype: "textfield",
            label:"备注" ,
            name:"keep",
            border: 1,
            style: 'border-color: gray; border-style: solid;',
            disabled:false
        } ;
        var ss = this;
        var spaceer = {
            xtype:"spacer"
        }

        var ConfirmBtnName = "新加订单";
        var CancelBtnName = "取消修改";
        // 现有修改订单中的是否存在
        var  existOrderMenuIndex =    Ext.getStore("Orders").findBy(function(re,id){
            if(re.getData().tableId == currentTableID && re.getData().menuId == record.getData().id) {
                return id;
            }
        });
        var  editOrderMenuIndex =    Ext.getStore("EditOrders").findBy(function(re,id){
            if(re.getData().tableId == currentTableID && re.getData().menuId == record.getData().id) {
                return id;
            }
        });

        var existCount = 0;
        if(existOrderMenuIndex >= 0)
        {
            existCount =  Ext.getStore("Orders").getAt(existOrderMenuIndex).getData().count;
        }

        var editCount = 0;

        if(editOrderMenuIndex >= 0)
        {
            editCount =  Ext.getStore("EditOrders").getAt(editOrderMenuIndex).getData().count;
        }


        if(existCount > 0)
        {
            ConfirmBtnName = "修改订单";
            if(editCount == existCount || editCount == 0)
            {
                CancelBtnName = "取消订单";
            }
            else
            {
                CancelBtnName = "取消修改";
            }
        }
        else
        {
            ConfirmBtnName = "新加订单";
            if(editCount > 0)
            {
                ConfirmBtnName = "修改订单";
                CancelBtnName = "取消修改";
            }
        }



        var confirmBtn = {
            cls:"mybtn",
            xtype:"button",
            text:ConfirmBtnName,
            handler: function(){
                record.getData().count = spinner.getValue("count");
                ss.onAdd2OrderBtnTap(record);
            }
        }
        var cancelBtn = {
            cls:"mybtn",
            xtype:"button",
            ui:"decline",
            text:CancelBtnName,
            handler: function(){
                if(existCount > 0)
                {
                    if(editCount == existCount || editCount == 0)
                    {
                        ss.cancelExistOrder(currentTableID,record.getData().id);
                    }
                    else
                    {
                        ss.cancelEditOrder(currentTableID,record.getData().id);
                    }

                }
                else if(editCount > 0)
                {
                    ss.cancelEditOrder(currentTableID,record.getData().id);
                }
            }
        }

        this.menu.add(order);
        this.menu.add(price);
        this.menu.add(spinner);
        this.menu.add(cost);
        this.menu.add(keep);
        if(record.getData().count > 0)
        {

            this.menu.add(confirmBtn);
            this.menu.add(cancelBtn);
        }
        else
        {
            this.menu.add(confirmBtn);
        }

    },

    cancelEditOrder:function(tableId,menuId)
    {
         //function(){
         var index =  Ext.getStore("EditOrders").findBy(function(re,id){
             if(re.getData().tableId == tableId && re.getData().menuId == menuId){
                 return id;
             }
         });
        //console.log("cancelEditOrder index = "+index);
        if(index >= 0)
        {
            Ext.getStore("EditOrders").removeAt(index);
        }
        //Ext.getStore("Orders").clearFilter();
        Ext.getStore("EditOrders").clearFilter();

         //}();
    },
    cancelExistOrder:function(tableId,menuId)
    {
        //console.log(tableId,menuId);
        var index =  Ext.getStore("Orders").findBy(function(re,id){
            if(re.getData().tableId == tableId && re.getData().menuId == menuId){
                return id;
            }
        });
        //console.log("cancelExistOrder index = "+index);
        if(index >= 0)
        {
            var order = Ext.getStore("Orders").getAt(index);
            order.getData().count = 0;
            var editIndex =    Ext.getStore("EditOrders").findBy(function(re,id){
                if(re.getData().tableId == tableId && re.getData().menuId == menuId){
                    return id;
                }
            });
            if(editIndex >= 0)
            {
                Ext.getStore("EditOrders").getAt(editIndex).count = 0;
            }
            else
            {
                Ext.getStore("EditOrders").add(order);
            }

            //this.updateOrderMenus(tableId)  ;
        }
        Ext.getStore("Orders").clearFilter();
        Ext.getStore("EditOrders").clearFilter();
    },

    iniMenuHandler:function()
    {

    } ,

    onFoodTap:function(list, idx, el, record)
    {
        //console.log(record);
        var re = record;
        //console.log(re.raw);
        if (!this.menu) {
            this.menu = Ext.widget('menu', {
                scrollable: 'vertical'
            });
        }
        this.getTableContainer().push(this.menu);
        //this.iniMenuHandler();
        this.menu.removeAll();
        this.initMenuContent(record);
    }   ,
    onAdd2OrderBtnTap:function(record)
    {
        var menuId = record.getData().id;
        var count = record.getData().count;
        var tableId =currentTableID;
        var orderId =currentTableID;

        //在原有 菜单里找到 相应的 桌号已经点菜的 menus
        if(count>0)
        {
             // 修改原有订单
             var raw = {
                 'orderId':orderId,
                 'tableId':tableId,
                 'menuId':menuId,
                 'count':count
             };
        }
        else
        {
            // 新加菜单
            orderId = 0;
            var raw = {
                'orderId':0,
                'tableId':tableId,
                'menuId':menuId,
                'count':count
            };
        }

         // 如果修改菜单内已经存在相同菜品，直接替换
        Ext.getStore("EditOrders").clearFilter();
        var editMenusIndex = Ext.getStore("EditOrders").findBy(function(re,id){
            if(re.getData().tableId == tableId && re.getData().menuId == menuId ) {
                return id;
            }
        });
        var  existOrderMenuIndex =    Ext.getStore("Orders").findBy(function(re,id){
            if(re.getData().tableId == tableId && re.getData().menuId == menuId) {
                return id;
            }
        });
        var existOrderMenu;
        //console.log(existOrderMenuIndex,editMenusIndex);
        if( existOrderMenuIndex >= 0)
        {
            existOrderMenu = Ext.getStore("Orders").getAt(existOrderMenuIndex);
        }
        //console.log(editMenusIndex);

        //console.log(existOrderMenu,existOrderMenu&&existOrderMenu.getData().count,count)

        if(editMenusIndex >= 0)
        {
            //console.log(existOrderMenu.getData().count , count);
            if(existOrderMenu && existOrderMenu.getData().count == count)
            {
                Ext.getStore("EditOrders").removeAt(editMenusIndex) ;
            }
            else
            {
                Ext.getStore("EditOrders").getAt(editMenusIndex).getData().count = count;
            }
        }
        else
        {
            if(existOrderMenu && existOrderMenu.getData().count == count)
            {

            }
            else
            {
                var newOrder = Ext.create("CG168.model.Order",raw);
                Ext.getStore("EditOrders").add(newOrder);
            }
        }
        Ext.getStore("EditOrders").clearFilter();
    } ,

    /**
     * 更新一个桌的订单
     */
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

