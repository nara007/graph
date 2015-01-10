/**
 * Created by Administrator on 15-1-7.
 */
define(function (require) {

    var $=require("jquery"),
        HashtablePlugin=require("Hashtabel"),
        Node=require("app/node"),
        Literal=require("app/literal"),
        GraphManager=require("app/graphManager");

    var instance=null;

    var NodeManager=function()
    {
        if(instance!=null)
        {
            throw new Error("Cannot instantiate more than one Singleton of NodeManager");
        }
        else
        {
            this.intialize();
        }
    };

    NodeManager.getInstance=function()
    {
        if(instance==null)
        {
            instance=new NodeManager();
            return instance;
        }
        else
        {
            return instance;
        }
    };


    NodeManager.prototype.intialize= function () {
        this.nodeHashMap=new $.Hashtable();
        this.activeNode=null;
        this.maxLiteralPreAge=7;
        this.literalsPageUpManager=GraphManager.arrow("up",{x:$(window).width()/1.6,y:250}).hide();
        this.literalsPageDownManager=GraphManager.arrow("down",{x:$(window).width()/1.6,y:650}).hide();
        this.literalArrayData=null;
        this.currentLiteralPage=0;
        var that=this;
        this.literalsPageUpManager.click(function () {
            if(that.currentLiteralPage<=0)
            {

            }
            else
            {
                that.currentLiteralPage--;
            }

            that.refreshLiteralData();
        });

        this.literalsPageDownManager.click(function () {

            if(that.currentLiteralPage>=that.literalArrayData.length-1)
            {

            }
            else
            {
                that.currentLiteralPage++;
                //console.log(that.literalArrayData.length);
            }
            that.refreshLiteralData();
        });

    };

    NodeManager.prototype.setMaxLiteralPreAge= function (Max) {
        this.maxLiteralPreAge=Max;
        return this;
    };

    NodeManager.prototype.getMaxLiteralPreAge= function () {
        return this.maxLiteralPreAge;
    };

    NodeManager.prototype.contains= function (nodeID) {
        return this.nodeHashMap.containsKey(nodeID);
    };

    NodeManager.prototype.get= function (key) {
        this.nodeHashMap.get(key);
    };
    NodeManager.prototype.add= function (graphData) {

        var subject=graphData[0].subject;
        var node=new Node({location:{x:$(window).width()/2-100,y:150},type:"active"}).setText(subject);
        this.nodeHashMap.add(subject,node);

        var literalsArray=new Array();
        for(var index=0;index< graphData.length;index++)
        {
            var result = index % this.maxLiteralPreAge;

            literalsArray[index]=new Literal({location:{x:$(window).width()/1.6,y:(300+result*50)},type:"literal"});

            node.addLiteral(literalsArray[index].setText(graphData[index].object)
                                .setLine(GraphManager.line(node,literalsArray[index]))
                                .setPredicateText(GraphManager.text({x:$(window).width()/1.6-200,y:(280+result*50)},graphData[index].predicate))
                                .hide(),{predicate:graphData[index].predicate});

        }


        this.literalsPageUpManager.show();
        this.literalsPageDownManager.show();
        this.activeNode=node;
        return node;

    };

    var showCurrentLiteralData= function (maxLiteralNumPreAge) {
        for(var i=0;i<maxLiteralNumPreAge;i++)
        {
            var literalObject=this[i];
            if(literalObject!=null)
            {
                literalObject.show();
            }
            else
            {
                console.log("literalObject is null");
            }

        }
    };

    var hideAllLiteralData= function () {

        for(var i in this.literalArrayData)
        {
            for(var j in this.literalArrayData[i])
            {
                this.literalArrayData[i][j].hide();
            }

        }
    };

    NodeManager.prototype.setliteralsPage= function (literalsArray) {
        this.literalArrayData=literalsArray;
        showCurrentLiteralData.call(this.literalArrayData[0],this.maxLiteralPreAge);
    };

    NodeManager.prototype.refreshLiteralData= function () {
        hideAllLiteralData.call(this);
        showCurrentLiteralData.call(this.literalArrayData[this.currentLiteralPage],this.maxLiteralPreAge);
    };

    NodeManager.prototype.setActiveNode= function () {

    };

    NodeManager.prototype.getActiveNode= function () {

        return this.activeNode;
    };
    return NodeManager.getInstance();
});
