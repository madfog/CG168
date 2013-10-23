/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-9
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.controller.Orders', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            orderContainer: 'orderContainer',
            orders: 'orderContainer orders',
            order: 'orderContainer speaker',
            orderInfo: 'menuContainer orderInfo'

        },
        control: {
            orders: {
                itemtap: 'onOrderTap',
                activate: 'onOrdersActivate'
            }
        }
    },

    onOrderTap: function(list, idx, el, record) {

        if (!this.order) {
            this.order = Ext.widget('order');
        }

        this.order.config.title = record.getFullName();
        this.getOrderContainer().push(this.order);
        this.getOrderInfo().setRecord(record);
    },



    onOrdersActivate: function() {
        if (this.order) {
            this.order.down('list').deselectAll();
        }
    }

});