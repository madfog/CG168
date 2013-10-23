Ext.define('CG168.view.table.Info', {

	extend: 'Ext.Container',
	xtype: 'tableInfo',

	config: {

		cls: 'sessionInfo'
        /*,



		tpl: Ext.create('Ext.XTemplate',
            '<tpl if="status &gt;= 1">',
            '<div class="tableInfo">桌号:<div class="content">{id}</div></div>',
            '<div class="tableon"><div class="status">状态:</div><div class="content">有人</div>',
            '<div class="status">开桌时间:</div><div class="content">{[this.formatTime(values.time)]}</div></div>',
            '<div class="tableon"><div class="status">客人:</div><div class="content">{guests}人</div>',
            '<div class="status">消费金额:</div><div class="content">${cost}</div>',
            '</div>',
            '<tpl elseif="status &gt;= 2">',
            '<div class="tableInfo">桌号:<div class="content">{id}</div></div>',
            '<div class="tableon"><div class="status">状态:</div><div class="content">已预订</div>',
            '<div class="status">预定时间:</div><div class="content">{[this.formatTime(values.time)]}</div>',
            '</div>',
            '<tpl elseif="status &gt;= 0">',
            '<div class="tableInfo">桌号:<div class="content">{id}</div></div>',
            '<div class="tableon"><div class="status">状态:</div><div class="content">空闲</div>',
            '</div>',
			'</tpl>',
			{
                formatTime: function(time) {
                    return Ext.Date.format(new Date(time), 'g:ia')
                }
			}
		)   */
	}
});
