Ext.define('CG168.view.table.Detail', {

	extend: 'Ext.Container',
	xtype: 'table',

	config: {

		layout: 'vbox',
		scrollable: true,

		title: '',

		items: [
			{
				xtype: 'tableInfo'
			},


            {
                xtype:'container',
                layout:"hbox",
                   items:getCurrentTableStatus() == 1?
                       [
                       {
                           xtype: 'spacer'
                       },
                       {
                           xtype:"button",
                           text: 'Close Table'
                       }   ,
                       {
                           xtype: 'spacer'
                       },
                       {
                           xtype:"button",
                           text: 'Edit Orders'
                       }   ,
                       {
                           xtype: 'spacer'
                       }
                   ]
                   :getCurrentTableStatus()==0?
                       [
                           {
                               xtype: 'spacer'
                           },
                           {
                               xtype:"button",
                               text: 'pre order'
                           }   ,
                           {
                               xtype: 'spacer'
                           },
                           {
                               xtype:"button",
                               text: 'openTable'
                           }   ,
                           {
                               xtype: 'spacer'
                           }
                       ] :
                       [
                           {
                               xtype: 'spacer'
                           },
                           {
                               xtype:"button",
                               text: 'cancel'
                           }   ,
                           {
                               xtype: 'spacer'
                           },
                           {
                               xtype:"button",
                               text: 'Edit Orders'
                           }   ,
                           {
                               xtype: 'spacer'
                           }
                       ]
            }   ,

			{
				xtype: 'foodsorder',
				store: 'OrderMenus',

				scrollable: false,

				items: [
					{
						xtype: 'listitemheader',
						cls: 'dark',
						html: '已经点餐'
					}
				]
			}
		]

	},
    initialize:function()
    {
        // console.log(this.getContainer());
    }
});

function getCurrentTableStatus()
{
    var tableId = currentTableID;

    var table;

    if(Ext.getStore("Tables"))
    {
        table  = Ext.getStore("Tables").find("id",tableId)    ;
    }

    if(table)
    {
        //console.log("table status = " + Ext.getStore("Tables").getAt(table).getData().status);
        return Ext.getStore("Tables").getAt(table).getData().status;
    }

    //console.log("currentTableID = " + currentTableID);
    return 0;
}

