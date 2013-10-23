/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-15
 * Time: 下午10:03
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-15
 * Time: 下午9:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.view.order.OrderNew', {
    extend: 'Ext.Panel',
    xtype: 'ordernew',

    requires: [
        'Ext.carousel.Carousel'
    ],

    config: {
        baseCls: Ext.baseCSSPrefix + 'sheet',
        modal: true,
        centered : false,
        hideOnMaskTap : true,

        ui: 'detail',

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        width: 400,
        top: 0,
        bottom: 0,
        right: 0,

        loan: null,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [
            {
                xtype: 'carousel',
                flex: 1,
                items: [
                    { xtype: 'editfoods',store:"EditMenus" }
                ]
            },
            {
                xtype: 'button',
                text: 'ConfirmEdit'
            }
        ]
    },

    hide: function(animation) {
        var me = this;

        //we fire this event so the controller can deselect all items immediately.
        me.fireEvent('hideanimationstart', me);

        //show the mask again
        me.callParent();
    },

    updateLendButton: function() {

        var url    = "http://www.kiva.org/lend/" + this.getLoan().getId(),
            button = this.down('button'),
            link = Ext.getDom('linker'),
            clickEvent = document.createEvent('Event');

        //http://www.sencha.com/forum/showthread.php?130358-window.open()-from-toolbar-button-opens-window-from-list-item-a-new-tab&p=639938#post639938
        clickEvent.initEvent('click', true, false);

        button.setHandler(function() {
            link.href = url;
            link.dispatchEvent(clickEvent);
        });
    }
});

