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


    DrawGraph.prototype.drawLiteralsAndObjects= function (graphData,objectsData) {

        var that=this;
        if(graphData==null&&objectsData==null)
        {
            throw new Error(" data is null or undefined!");
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
                activeNode=NodeManager.add(graphData,objectsData);
            }

            var literals=activeNode.getLiterals();
            var literalNum=literals.size();
            var literalpageNum=Math.ceil(literalNum/NodeManager.getMaxLiteralPreAge());

            var literalArray = new Array();

            var literalSet=new Array();
            (function (){

                for(var i=0;i<literalpageNum;i++)
                {
                    literalArray.push(new Array());
                }
            }());


            (function (){

                for(var i in literals.items)
                {
                    literalSet.push(literals.items[i]);
                }
            }());

            (function (){

                for(var i=0;i<literalpageNum;i++)
                {
                   for(var j=0;j<NodeManager.getMaxLiteralPreAge();j++)
                   {
                       var literalObject=literalSet.pop();
                       if(literalObject!=undefined)
                       {
                           literalArray[i].push(literalObject);
                       }
                       else
                       {

                       }

                   }
                }
            }());

            var objects=activeNode.getObjects();
            var objectNum=objects.size();
            var objectPageNum=Math.ceil(objectNum/NodeManager.getMaxObjectPreAge());

            var objectArray = new Array();
            var objectSet=new Array();

            (function (){

                for(var i=0;i<objectPageNum;i++)
                {
                    objectArray.push(new Array());
                }
            }());

            (function (){

                for(var i in objects.items)
                {
                    objectSet.push(objects.items[i]);
                }
            }());

            (function (){

                for(var i=0;i<objectPageNum;i++)
                {
                    for(var j=0;j<NodeManager.getMaxObjectPreAge();j++)
                    {
                        var object=objectSet.pop();
                        if(object!=undefined)
                        {
                            objectArray[i].push(object);
                        }
                        else
                        {

                        }

                    }
                }
            }());

            NodeManager.setliteralsPage(literalArray);
            NodeManager.setObjectsPage(objectArray);

        }

    };

    return DrawGraph.getInstance();
});