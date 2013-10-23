/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-10
 * Time: 下午11:39
 * To change this template use File | Settings | File Templates.
 */
var loginType = Math.random()*2>=1;
Ext.define('CG168.view.login.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'loginContainer',

    config: {

        title: 'Login',
        iconCls: 'favorites',

        autoDestroy: false,

        items: [
            {
                xtype: 'fieldset',
                title: loginType?'Current login User:':'Login',
                items: loginType?
                    [
                        {
                            xtype: 'textfield',
                            label: 'Username',
                            name: 'email',
                            value:"ribota" ,
                            disabled:true
                        },
                        {
                            xtype: 'textfield',
                            label: 'gender',
                            name: 'password',
                            value:"男" ,
                            disabled:true
                        } ,
                        {
                            xtype: 'textfield',
                            label: 'loginTime',
                            name: 'password',
                            value:"2013-10-10"  ,
                            disabled:true
                        } ,

                        {
                            xtype:"button",
                            text:"logout",
                            handler:function(){

                            }
                        }
                    ]
                    :
                    [
                        {
                            xtype: 'emailfield',
                            label: 'Username',
                            name: 'email'
                        },
                        {
                            xtype: 'passwordfield',
                            label: 'Password',
                            name: 'password'
                        } ,
                        {
                            xtype:"button",
                            text:"login",
                            handler:function(){
                                Ext.Msg.alert('Title', 'DO login');
                            }
                        }
                    ]
            }
        ]

    }
});

