/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-9
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.controller.Menus', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            menusContainer: 'menusContainer',
            tableContainer: 'tableContainer',
            menus: 'menusContainer foods',

            menuInfo: 'menusContainer menuInfo',
            searchField: 'menusContainer searchfield',


            menustool:"menusContainer titlebar"
        },
        control: {
            menuContainer:{
                initialize:"initMenuContainer"
            },
           menus: {
                itemtap: 'onMenuTap'
            },
            selectfield: {
                change: 'onSelectChange'
            },
            searchfield:{
                clearicontap:"onUndoSearch",
                change:"onDoSearch"
            } ,
            menustool: {
                back: function (opt) {
                    //console.log(opt);
                }
            }
        }
    },
    onDoSearch:function(newValue, oldValue, eOpts)
    {
        //console.log(newValue,oldValue);
        Ext.getStore("Menus").clearFilter();
        //Ext.getStore("Menus").sort();
        if(newValue != "")
        {
            Ext.getStore("Menus").filterBy(function(menu){
                //console.log(menu.getData());
                //console.log(menu.getData().name)
                if(menu.getData().name.indexOf(oldValue) >= 0){
                    return  menu;
                }
            });
        }
    }   ,
    onUndoSearch:function(e, eOpts)
    {
        //Ext.getStore("Menus").sort();
        Ext.getStore("Menus").clearFilter();
    },
    initMenuContainer:function()
    {
          //console.log("initMenuContainer");
          //console.log(this.menustool);
    } ,
    onSelectChange: function(field) {
        this.getSearchField().reset();
       //console.log(field.getValue());
        if (!field.initialized) {
            return;
        }
        Ext.getStore("Menus").clearFilter();
        var value = field.getValue();
        if(value == 'all')
        {
             Ext.getStore("Menus").clearFilter();
        }
        else
        {
            Ext.getStore("Menus").filterBy(function(menu){
                //console.log(menu.getData());
                 if(menu.getData().type == value){
                     return  menu;
                 }
            });
        }

    },
    onMenuTap: function(list, idx, el, record) {

        //console.log("onFoodTap");
        var re = record;
        //console.log(re.raw);
        if (!this.foodmenu) {
            this.foodmenu = Ext.widget('menu', {
                scrollable: 'vertical'
            });
        }

        //this.getMenusContainer().push({xtype:"button",text:'dsads'});
        //this.iniMenuHandler();
      //  this.foodmenu.removeAll();
       // this.initMenuContent(record);
    },

    initMenuContent: function(record)
    {
       // console.log(record.getData());
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
        var spinner = {
            xtype: "spinnerfield",
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
                }
            }
        } ;



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

        var btnName = "新加订单";
        if(record.raw.count > 0)
        {
            btnName = "修改订单";
        }
        else
        {
            btnName = "新加订单";
        }

        var btn = {
            cls:"mybtn",
            xtype:"button",
            text:btnName,
            handler: function(){
                ss.onSendBtnTap(record);
            }
        }

        this.foodmenu.add(order);
        this.foodmenu.add(price);
        this.foodmenu.add(spinner);
        this.foodmenu.add(cost);
        this.foodmenu.add(keep);

        this.foodmenu.add(btn);
    },


    onSendBtnTap:function(record)
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
            var raw = {
                'orderId':0,
                'tableId':tableId,
                'menuId':menuId,
                'count':count
            };
        }

        var newOrder = Ext.create("CG168.model.Order",raw);
        Ext.getStore("EditOrders").add(newOrder);
    }

});

