Ext.define('CG168.view.Main', {

	extend: 'Ext.tab.Panel',
	xtype: 'main',

	config: {

		tabBarPosition: 'bottom',
		tabBar: {
			ui: 'gray'
		},

		items: [
			{ xclass: 'CG168.view.table.Card' },
			//{ xclass: 'CG168.view.order.Card' },
			{ xclass: 'CG168.view.menu.Card' },
			{ xclass: 'CG168.view.login.Card' },
			{ xclass: 'CG168.view.about.Card'    }
		]
	}
});
