Ext.define('CG168.view.food.List', {

    extend: 'Ext.List',
    xtype: 'foods',

    config: {
        title: 'Menus',

        itemCls: 'speaker',
        itemTpl: [
            '<div class="food"><div class="item">{id}</div><div class="item">{name}</div><div class="item">{price}</div></div>'
        ] ,
        items:[
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'gray',
                items:  [
                    {
                        xtype: 'selectfield',
                        flex:1 ,
                        name: 'gender',
                        options: [
                            {text: '全部', value: 'all'},
                            {text: '菜类', value: '1'},
                            {text: '主食', value: '2'},
                            {text: '酒水', value: '3'},
                            {text: '点心', value: '4'}
                        ]
                    },
                    {
                        xtype: 'searchfield',
                        flex:1
                    }
                ]
            }
        ]
    }
});
