/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-20
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */

Ext.define('CG168.util.ProxyUser', {

    singleton: true,

    checkLogin: function(userInfo,callback) {

        var userStore = Ext.getStore('UserInfo'),

        userModel, proposalModel, orderModel,menuModel,orderMenuModel;

        userStore.removeAll();

        Ext.data.JsonP.request({
            url: __urlMaps['check_login'],
            callbackName: 'feedCb',
            params: {
                username:userInfo.name,
                key:userInfo.key

            },

            success: function(data) {
                if(data.isLogin == 0)
                {
                    callback(0);
                }
                else
                {
                    callback(-1);
                }


            }
        });

    },
    doLogin:function(userInfo,callback){
        var userStore = Ext.getStore('UserInfo'),

            userModel, proposalModel, orderModel,menuModel,orderMenuModel;


        Ext.data.JsonP.request({
            url: __urlMaps['do_login'],
            callbackName: 'feedCb',
            params: {
                username:userInfo.name,
                key:userInfo.key

            },
            success: function(data) {
                if(data.user)
                {
                    userModel = Ext.create('CG168.model.User', data.user);
                    loginUser = userModel;
                    callback(1);
                }
                else
                {
                    callback(-1);
                }
            }
        });
    },
    doLogout:function(callback){
        Ext.data.JsonP.request({
            url: __urlMaps['do_logout'],
            callbackName: 'feedCb',
            success: function(data) {
                console.log(data);
                if(data.result==0)
                {
                    loginUser = null;
                    callback(1);
                }
                else
                {
                    callback(-1);
                }
            }
        });
    }
});
