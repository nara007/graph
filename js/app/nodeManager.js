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

        this.maxObjectPreAge=6;
        this.objectsPageUpManager=GraphManager.arrow("up",{x:1200,y:100}).hide();
        this.objectsPageDownManager=GraphManager.arrow("down",{x:1200,y:600}).hide();
        this.objectArrayData=null;
        this.currentObjectPage=0;

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
            }
            that.refreshLiteralData();
        });

        this.objectsPageUpManager.click(function () {
            if(that.currentObjectPage<=0)
            {

            }
            else
            {
                that.currentObjectPage--;
            }

            that.refreshObjectData();
        });

        this.objectsPageDownManager.click(function () {

            if(that.currentObjectPage>=that.objectArrayData.length-1)
            {

            }
            else
            {
                that.currentObjectPage++;
            }
            that.refreshObjectData();
        });

    };

    NodeManager.prototype.setMaxLiteralPreAge= function (Max) {
        this.maxLiteralPreAge=Max;
        return this;
    };

    NodeManager.prototype.getMaxLiteralPreAge= function () {
        return this.maxLiteralPreAge;
    };

    NodeManager.prototype.getMaxObjectPreAge= function () {
        return this.maxObjectPreAge;
    };

    NodeManager.prototype.contains= function (nodeID) {
        return this.nodeHashMap.containsKey(nodeID);
    };

    NodeManager.prototype.get= function (key) {
        this.nodeHashMap.get(key);
    };
    NodeManager.prototype.add= function (literalData,objectsData) {

        var subject=literalData[0].subject;
        var node=new Node({location:{x:$(window).width()/2-100,y:150},type:"active"}).setText(subject);
        this.nodeHashMap.add(subject,node);

        var literalsArray=new Array();
        for(var index=0;index< literalData.length;index++)
        {
            var result = index % this.maxLiteralPreAge;

            literalsArray[index]=new Literal({location:{x:$(window).width()/1.6,y:(300+result*50)},type:"literal"});

            node.addLiteral(literalsArray[index].setText(literalData[index].object)
                                .setLine(GraphManager.line(node,literalsArray[index]))
                                .setPredicateText(GraphManager.text({x:$(window).width()/1.6-190,y:(280+result*50)},literalData[index].predicate))
                                .hide(),{predicate:literalData[index].predicate});

        }

        var objectsArray=new Array();
        var blankNode=new Node({location:{x:930,y:150},type:"blank"});
        GraphManager.line(node,blankNode);
        for(var j=0;j< objectsData.length;j++)
        {
            var remainder = j % this.maxObjectPreAge;
            objectsArray[j]=new Node({location:{x:1200,y:150+remainder*80},type:"object"});
            node.addNode(objectsArray[j].setText(objectsData[j].object)
                                        .setLine(GraphManager.line(blankNode,objectsArray[j]))
                                        .setPredicateText(GraphManager.text({x:1000,y:130+remainder*80},objectsData[j].predicate))
                                        .hide(),{predicate:objectsData[j].predicate});
        }

        this.literalsPageUpManager.show();
        this.literalsPageDownManager.show();
        this.objectsPageUpManager.show();
        this.objectsPageDownManager.show();

        this.activeNode=node;
        return node;

    };

    var showNodeOrLiteralOfCurrentPage= function (maxNumPreAge) {
        for(var i=0;i<maxNumPreAge;i++)
        {
            var nodeOrLiteral=this[i];
            if(nodeOrLiteral!=null)
            {
                nodeOrLiteral.show();
            }
            else
            {
                console.log("nodeOrLiteral is null");
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

    var hideAllObjectData= function () {

        for(var i in this.objectArrayData)
        {
            for(var j in this.objectArrayData[i])
            {
                this.objectArrayData[i][j].hide();
            }

        }
    };
    NodeManager.prototype.setliteralsPage= function (literalsArray) {
        this.literalArrayData=literalsArray;
        showNodeOrLiteralOfCurrentPage.call(this.literalArrayData[0],this.maxLiteralPreAge);
        return this;
    };

    NodeManager.prototype.setObjectsPage= function (objectsArray) {
        this.objectArrayData=objectsArray;
        showNodeOrLiteralOfCurrentPage.call(this.objectArrayData[0],this.maxObjectPreAge);
        return this;
    };

    NodeManager.prototype.refreshLiteralData= function () {
        hideAllLiteralData.call(this);
        showNodeOrLiteralOfCurrentPage.call(this.literalArrayData[this.currentLiteralPage],this.maxLiteralPreAge);
        return this;
    };

    NodeManager.prototype.refreshObjectData= function () {
        hideAllObjectData.call(this);
        showNodeOrLiteralOfCurrentPage.call(this.objectArrayData[this.currentObjectPage],this.maxObjectPreAge);
        return this;
    };

    NodeManager.prototype.setActiveNode= function () {

    };

    NodeManager.prototype.getActiveNode= function () {

        return this.activeNode;
    };
    return NodeManager.getInstance();
});
