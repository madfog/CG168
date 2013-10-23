/**
 * 输入：
 *   order_0	orderId=1301;tableId=1301;menuId=101;count=5;id=ext-record-34
     order_1	orderId=1301;tableId=1301;menuId=104;count=2;id=ext-record-40
     tableId	1301
     total   2
     callback	Ext.data.JsonP.feedCb
     _dc	1382445924901
 输出：

 */
Ext.data.JsonP.feedCb(
    {
        result:0,
        orders:[
            {
                'menuId':101,
                "tableId":currentTableID,
                'count':3
            },
            {
                'menuId':103,
                "tableId":currentTableID,
                'count':3
            },
            {
                'menuId':102,
                "tableId":currentTableID,
                'count':3
            },
        ]
    });

