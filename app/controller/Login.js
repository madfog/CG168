/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-19
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-9
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */

var loginButton = Ext.create("Ext.Button",{text:"login"});
var logoutButton = Ext.create("Ext.Button",{text:"logout"});
Ext.define('CG168.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginContainer:"loginContainer",
            loginFields:"loginContainer fieldset" ,
            loginButton:"loginContainer button"
        },
        control: {
            loginContainer:{
                initialize:"initLoginContainer"
            },
            loginFields: {

            }
        }
    },
    initLoginContainer:function()
    {

        var ss = this;
        //console.log(this.getLoginContainer().getItems());
        if(true){
            this.getLoginItems() ;
            //this.getLoginFields().add(this.getLogoutItems());
        }
        else
        {
            this.getLogoutItems();
        }


    },
    doLogInOut:function(type){
        var ss  = this;
        if(type=="login") {
            CG168.util.ProxyUser.doLogin({name:"ribota",gender:1},function(ret){
                ss.getLoginItems();
            });

        }
        else
        {
            CG168.util.ProxyUser.doLogout(function(ret){
                console.log(ret);
                ss.getLogoutItems();
            });
            //ss.getLogoutItems() ;
        }
    },
    getLoginItems:function()
    {
        console.log('getLoginItems');
        var ss = this;
        this.getLoginFields().removeAll();
        this.getLoginFields().setTitle("Current login User:");
        this.getLoginFields().add({
            xtype: 'textfield',
            label: 'Username',
            name: 'email',
            value:"ribota" ,
            disabled:true
        });

        this.getLoginFields().add({
            xtype: 'textfield',
            label: 'gender',
            name: 'password',
            value:"男" ,
            disabled:true
        });

        this.getLoginFields().add({
            xtype: 'textfield',
            label: 'loginTime',
            name: 'password',
            value:"2013-10-10"  ,
            disabled:true
        });
        this.getLoginFields().add({xtype:"button",text:"logout",ui:'decline',handler:function(){
            ss.doLogInOut("logout");
        }}) ;
    },
    getLogoutItems: function()
    {
        var ss = this;
        this.getLoginFields().removeAll();
        this.getLoginFields().setTitle("Login:");
        this.getLoginFields().add(
            {
                xtype: 'emailfield',
                label: 'Username',
                name: 'email'
            });
            this.getLoginFields().add({
                xtype: 'passwordfield',
                label: 'Password',
                name: 'password'
            }) ;
            this.getLoginFields().add({xtype:"button",text:"login",handler:function(){
                ss.doLogInOut("login");
            }}) ;
    }
});


