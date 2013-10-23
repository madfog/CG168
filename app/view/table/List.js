Ext.define('CG168.view.table.List', {

	extend: 'Ext.List',
	requires: 'Ext.SegmentedButton',

	xtype: 'tables',

	config: {

		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				ui: 'gray',

				items: [
					{
						width: '100%',
						padding: '0 5',
						defaults: {
							flex: 1
						},
						xtype: 'segmentedbutton',
						allowDepress: false
					}
				]
			}
		],

		itemTpl:
            new Ext.XTemplate(
			'<div class="table"><div class="item">{id}</div>',
            '<tpl if="status &gt;= 2">',
                '<div class="item">已预订</div>',
                '<div class="item">---</div><div class="item">{[this.formatTime(values.time)]}</div><div class="item">---</div></div>',
            '<tpl elseif="status &gt;= 1">',
                '<div class="item">有人</div>',
                '<div class="item">{guests}</div><div class="item">{[this.formatTime(values.time)]}</div><div class="item">{cost}</div></div>',
            '<tpl elseif="status &gt;= 0">',
                '<div class="item">空闲</div>',
                '<div class="item">---</div><div class="item">---</div><div class="item">---</div></div>',
            '</tpl>',
                {
                    formatTime: function(time) {
                        return Ext.Date.format(new Date(time), 'g:ia')
                    }
                }
            )

	},

	initialize: function() {
        //console.log("initialize");
		this.config.title = CG168.app.title;
		this.callParent();

		var segmentedButton = this.down('segmentedbutton');
        var tableFields = Ext.create("CG168.model.Table");

		Ext.Array.each(tableFields.getFields().keys, function(day,ins,ss) {
            var tagName = "";
            if(day == "id")
            {
                tagName = "桌子ID"
            }
            if(day == "status")
            {
                tagName = "状态"
            }
            if(day == "guests")
            {
                tagName = "用餐人数"
            }
            if(day == "time")
            {
                tagName = "开桌时间"
            }
            if(day == "cost")
            {
                tagName = "消费金额"
            }
			segmentedButton.add({text:tagName,name:day}) ;
		});
	}
});
