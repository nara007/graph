/**
 * Created by Administrator on 14-12-29.
 */
define(["app/node","app/literal"], function (Node,Literal) {


    var instance=null;
    var DrawGraph=function()
    {
        if(instance!=null)
        {
            throw new Error("Cannot instantiate more than one Singleton of GraphManager");
        }
        else
        {
            this.intialize();
        }
    };
    DrawGraph.getInstance=function()
    {
        if(instance==null)
        {
            instance=new DrawGraph();
            return instance;
        }
        else
        {
            return instance;
        }
    };
    DrawGraph.prototype.intialize= function () {

    };

    /**
     * todu
     * @param graphData
     */
    DrawGraph.prototype.draw= function (graphData) {

        var width=$("#active").width()/3;
        //alert(width);
        var positionOfActiveNode={x:width,y:100};
        var demo1=new Node({location:positionOfActiveNode,type:"active"});

        var demo2=new Literal({location:{x:width*2,y:100},type:"literal"});
        var demo3=new Literal({location:{x:width*2,y:200},type:"literal"});
        var demo4=new Literal({location:{x:width*2,y:300},type:"literal"});
        var demo5=new Literal({location:{x:width*2,y:400},type:"literal"});


    };

    return DrawGraph.getInstance();
});