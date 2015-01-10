/**
 * Created by Administrator on 14-12-29.
 */
define(function (require) {

    var Node=require("app/node"),
        Literal=require("app/literal"),
        NodeManager=require("app/nodeManager"),
        GraphManager=require("app/graphManager");

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

        //this.maxLiteralPreAge=6;
    };


    DrawGraph.prototype.drawLiterals= function (graphData) {

        var that=this;
        if(graphData==null||graphData=="undefined")
        {
            throw new Error("literal data is null or undefined!");
        }
        else
        {
            var activeNode;
            var statement=graphData[0];
            if(NodeManager.contains(statement.subject))
            {
                activeNode=NodeManager.get(statement.subject);
            }
            else
            {
                activeNode=NodeManager.add(graphData);
            }

            var literals=activeNode.getLiterals();
            var literalNum=literals.size();
            var pageNum=Math.ceil(literalNum/NodeManager.getMaxLiteralPreAge());
            alert(pageNum);

            var myArray = new Array();

            var set=new Array();
            (function (){

                for(var i=0;i<pageNum;i++)
                {
                    myArray.push(new Array());
                }
            }());


            (function (){

                for(var i in literals.items)
                {
                    set.push(literals.items[i]);
                }
            }());

            (function (){

                for(var i=0;i<pageNum;i++)
                {
                   for(var j=0;j<NodeManager.getMaxLiteralPreAge();j++)
                   {
                       var literalObject=set.pop();
                       if(literalObject!=undefined)
                       {
                           myArray[i].push(literalObject);
                       }
                       else
                       {

                       }

                   }
                }
            }());

            NodeManager.setliteralsPage(myArray);
        }

    };

    return DrawGraph.getInstance();
});