Ext.define('CG168.view.about.Card', {

	extend: 'Ext.NavigationView',
	xtype: 'aboutContainer',

	config: {

		title: 'about',
        iconCls: 'info',

        autoDestroy: false,

        items: [
            {
                title:"关于我们",
                xtype: 'carousel',
                flex: 1,
                items: [
                    {
                        xtype:"htmlPage",
                        url:"data/about.html"
                    },
                    {
                        title: 'Videos',
                        xtype    : 'video',
                        layout:"fullscreen",
                        url      : "http://www.w3school.com.cn/i/movie.mp4"
                    }
                ]
            }
        ]
	}
});
