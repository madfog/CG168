Ext.define('CG168.controller.About', {

	extend: 'Ext.app.Controller',

	config: {

		refs: {
			aboutContainer: 'aboutContainer',
            btn:"aboutContainer carousel button"
		},

		control: {
            aboutContainer:{
                initialize:"onAboutContainer" ,
                activate:"onAboutListActivate"
            },
            btn:{
                itemtap:"onButtonTap"
            },
			videoList: {
				itemtap: 'onVideoTap'
			}
		}
	},
    onAboutContainer:function()
    {
        //console.log('onAboutContainer');
    },
    onButtonTap:function()
    {
          // console.log('onButtonTap');
    } ,
	onAboutListActivate: function() {
        //console.log('onAboutListActivate');
	},

	onAboutItemTap: function(list, idx) {
		this.getAboutContainer().push(CG168.app.config.aboutPages[idx]);
	},

	onVideoTap: function(list, idx, el, record) {
		Ext.Msg.confirm('External Link', 'Open in YouTube?', function(result){
            if (result == 'yes') {
                window.location = 'http://www.youtube.com/watch?v=' + record.get('id') + '&feature=player_embedded';
            }
        });
	} ,

    addToView:function()
    {
        //console.log('addToView');
        this.getAboutContainer.push({xtype:"button",text:"123"});
    }

});
