Ext.define('CG168.view.about.List', {

	extend: 'Ext.List',
	xtype: 'aboutList',

	config: {
		title: 'About',
		ui: 'round',
		itemTpl: [ '{title}' ]
	},

	initialize: function() {
		this.callParent();
		this.setData(CG168.app.aboutPages);
	}
});
