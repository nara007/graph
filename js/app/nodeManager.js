/**
 * Created by Administrator on 15-1-7.
 */
define(function (require) {

    var $=require("jquery"),
        HashtablePlugin=require("Hashtabel"),
        Node=require("app/node"),
        Literal=require("app/literal"),
        GraphManager=require("app/graphManager"),
        Communication=require("app/communication"),
        DoubleList=require("DoubleList");

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

        this.historyDoubleList=new DoubleList();
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

        this.maxHistoryPreAge=4;
        this.historyPageUpManager=GraphManager.arrow("up",{x:200,y:100}).hide();
        this.historyPageDownManager=GraphManager.arrow("down",{x:200,y:440}).hide();
        this.historyArrayData=null;
        this.currentHistoryPage=0;

        this.literalsPageUpManager.click(function () {
            if(that.literalArrayData==null)
            {

            }
            else
            {
                if(that.currentLiteralPage<=0)
                {

                }
                else
                {
                    that.currentLiteralPage--;
                }

                that.refreshLiteralData();
            }

        });

        this.literalsPageDownManager.click(function () {

            if(that.literalArrayData==null)
            {

            }
            else
            {
                if(that.currentLiteralPage>=that.literalArrayData.length-1)
                {

                }
                else
                {
                    that.currentLiteralPage++;
                }
                that.refreshLiteralData();
            }

        });

        this.objectsPageUpManager.click(function () {
            if(that.objectArrayData==null)
            {

            }
            else
            {
                if(that.currentObjectPage<=0)
                {

                }
                else
                {
                    that.currentObjectPage--;
                }

                that.refreshObjectData();
            }

        });

        this.objectsPageDownManager.click(function () {
            if(that.objectArrayData==null)
            {

            }
            else
            {
                if(that.currentObjectPage>=that.objectArrayData.length-1)
                {

                }
                else
                {
                    that.currentObjectPage++;
                }
                that.refreshObjectData();
            }

        });

        this.historyPageUpManager.click(function () {
            if(that.historyArrayData==null)
            {
                console.log("historyPageUpManager 1");
            }
            else
            {
                if(that.currentHistoryPage<=0)
                {
                    console.log("historyPageUpManager 2");
                }
                else
                {console.log("historyPageUpManager 3");
                    that.currentHistoryPage--;
                }

                that.refreshHistoryData();
            }
        });

        this.historyPageDownManager.click(function () {
            if(that.historyArrayData==null)
            {
                console.log("historyPageDownManager 1");
            }
            else
            {
                if(that.currentHistoryPage>=that.historyArrayData.length-1)
                {
                    console.log("historyPageDownManager 2");
                }
                else
                {console.log("historyPageDownManager 3");
                    that.currentHistoryPage++;
                }

                that.refreshHistoryData();
            }
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


    /**
     * set dblclick event for every node
     * @param nodeManager
     * @constructor
     */
    var SetdblclickForNode= function (nodeManager) {
        var that=this;
        this.getRaphaelObject().dblclick(function () {

            var literals=Communication.getLiterals(that.getID());
            var objects=Communication.getObjects(that.getID());
            if(literals==null&&objects==null)
            {
                //console.log(that.getID()+" has no literals and objects");
                alert(that.getID()+" has no literals and objects");
            }
            else {
                nodeManager.activeNode.remove();
                nodeManager.addOneHistoryNode(nodeManager.activeNode);

                nodeManager.setliteralsPage(null);
                nodeManager.setObjectsPage(null);
                nodeManager.literalsPageUpManager.hide();
                nodeManager.literalsPageDownManager.hide();
                nodeManager.objectsPageUpManager.hide();
                nodeManager.objectsPageDownManager.hide();
                nodeManager.setActiveNode(that);
                nodeManager.drawLiteralsAndObjects(literals, objects);

            }
        });
    };

    NodeManager.prototype.add= function (literalData,objectsData) {

        var subject=literalData[0].subject;
        if(this.activeNode==null)
        {
            this.activeNode=new Node({location:{x:$(window).width()/2-100,y:150},type:"active"}).setText(subject);
        }
        this.nodeHashMap.add(subject,this.activeNode);
        var that=this;
        if(literalData!=null)
        {
            var literalsArray=new Array();
            for(var index=0;index< literalData.length;index++)
            {
                var result = index % this.maxLiteralPreAge;

                literalsArray[index]=new Literal({location:{x:$(window).width()/1.6,y:(300+result*50)},type:"literal"});

                this.activeNode.addLiteral(literalsArray[index].setText(literalData[index].object)
                    .setLine(GraphManager.line(this.activeNode,literalsArray[index]))
                    .setPredicateText(GraphManager.text({x:$(window).width()/1.6-190,y:(280+result*50)},literalData[index].predicate))
                    .hide(),{predicate:literalData[index].predicate});

            }
            this.literalsPageUpManager.show();
            this.literalsPageDownManager.show();
        }
        else
        {

        }

        if(objectsData!=null)
        {
            var objectsArray=new Array();
            var blankNode=new Node({location:{x:930,y:150},type:"blank"});
            var lineToBlank=GraphManager.line(this.activeNode,blankNode);
            this.activeNode.setLineToBlank(lineToBlank);
            for(var j=0;j< objectsData.length;j++)
            {
                var remainder = j % this.maxObjectPreAge;
                objectsArray[j]=new Node({location:{x:1200,y:150+remainder*80},type:"object"});
                /**
                 * double click make current object node active
                 */
                SetdblclickForNode.call(objectsArray[j],that);

                this.activeNode.addNode(objectsArray[j].setText(objectsData[j].object)
                    .setLine(GraphManager.line(blankNode,objectsArray[j]))
                    .setPredicateText(GraphManager.text({x:1000,y:130+remainder*80},objectsData[j].predicate))
                    .hide(),{predicate:objectsData[j].predicate});
            }

            this.objectsPageUpManager.show();
            this.objectsPageDownManager.show();
        }
        else
        {

        }


        return this.activeNode;

    };



    var showNodeOfCurrentPage= function (maxNumPreAge) {
        for(var i=0;i<maxNumPreAge;i++)
        {
            var nodeOrLiteral=this[i];
            if(nodeOrLiteral!=null)
            {
                nodeOrLiteral.show();
            }
            else
            {
                //console.log("nodeOrLiteral is null");
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


    var hideAllHistoryData= function () {

        for(var i in this.historyArrayData)
        {
            for(var j in this.historyArrayData[i])
            {
                this.historyArrayData[i][j].hide();
            }

        }
    };

    NodeManager.prototype.setliteralsPage= function (literalsArray) {
        this.literalArrayData=literalsArray;
        if(this.literalArrayData!=null) {
            showNodeOfCurrentPage.call(this.literalArrayData[0], this.maxLiteralPreAge);
        }
        return this;
    };

    NodeManager.prototype.setObjectsPage= function (objectsArray) {

        this.objectArrayData=objectsArray;
        if(this.objectArrayData!=null) {
            showNodeOfCurrentPage.call(this.objectArrayData[0], this.maxObjectPreAge);
        }
        return this;
    };

    NodeManager.prototype.setHistoryPage= function (historyArray) {

        this.historyArrayData=historyArray;
        if(this.historyArrayData!=null) {
            showNodeOfCurrentPage.call(this.historyArrayData[0], this.maxHistoryPreAge);
        }
        return this;
    };

    NodeManager.prototype.refreshLiteralData= function () {
        hideAllLiteralData.call(this);
        showNodeOfCurrentPage.call(this.literalArrayData[this.currentLiteralPage],this.maxLiteralPreAge);
        return this;
    };

    NodeManager.prototype.refreshObjectData= function () {
        hideAllObjectData.call(this);
        showNodeOfCurrentPage.call(this.objectArrayData[this.currentObjectPage],this.maxObjectPreAge);
        return this;
    };

    NodeManager.prototype.refreshHistoryData= function () {
        hideAllHistoryData.call(this);
        showNodeOfCurrentPage.call(this.historyArrayData[this.currentHistoryPage],this.maxHistoryPreAge);
        return this;
    };

    NodeManager.prototype.setActiveNode= function (node) {

        this.activeNode=node;
        node.setActive();
        return this;
    };

    NodeManager.prototype.getActiveNode= function () {

        return this.activeNode;
    };

    NodeManager.prototype.drawLiteralsAndObjects= function (literalData,objectsData) {
        var that=this;
        if(literalData==null&&objectsData==null)
        {
            throw new Error(" This node has no literals and objects");
        }
        else
        {
            var activeNode;
            var statement=literalData[0];
            if(this.contains(statement.subject))
            {
                activeNode=this.get(statement.subject);
            }
            else
            {
                activeNode=this.add(literalData,objectsData);
            }

            var literals=activeNode.getLiterals();
            var literalNum=literals.size();
            if(literalNum!=0)
            {
            var literalpageNum=Math.ceil(literalNum/that.getMaxLiteralPreAge());

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
                    for(var j=0;j<that.getMaxLiteralPreAge();j++)
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
            }
            else
            {

            }

            var objects=activeNode.getObjects();
            var objectNum=objects.size();
            if(objectNum!=0)
            {
                var objectPageNum=Math.ceil(objectNum/that.getMaxObjectPreAge());

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
                        for(var j=0;j<that.getMaxObjectPreAge();j++)
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
            }
            else
            {

            }

            this.setliteralsPage(literalArray);
            this.setObjectsPage(objectArray);

        }

    };

    var scanAndRelocateHistoryList= function (historyList) {

        if(historyList==null)
        {
            throw new Error("historyList is null");
        }
        else
        {
            var that=this;
            var historyArray=new Array();
            var tmpArray=new Array();
            var headNode=historyList.getListHead();
            while(headNode.getSuccessor()!=null)
            {
                var tmpNode=headNode;
                headNode=headNode.getSuccessor();
                tmpArray.push(tmpNode.getObject());
            }
            tmpArray.push(headNode.getObject());

            var arrayNum=Math.ceil(historyList.size()/this.maxHistoryPreAge);
            (function () {
                for(var i=0;i<arrayNum;i++)
                {
                    historyArray.push(new Array());
                }
            }());

            (function () {
                for(var j=0;j<arrayNum;j++)
                {
                    for(var k=0;k<that.maxHistoryPreAge;k++)
                    {
                        var obj=tmpArray.pop();
                        if(obj!=undefined)
                        {
                            historyArray[j].push(obj);
                        }

                    }
                }
            }());


            (function () {
                for(var i=0;i<arrayNum;i++)
                {
                    for(var j=0;j<that.maxHistoryPreAge;j++)
                    {
                        var tmp=historyArray[i][j];
                        if(tmp!=undefined)
                        {
                            tmp.historySelf.attr({cx:200,cy:150+j*80});
                            tmp.historyText.attr({x:200,y:150+j*80});
                        }
                        else
                        {
                        }
                    }
                }
            }());

        }

        return historyArray;

    };

    NodeManager.prototype.addOneHistoryNode= function (node) {
        this.historyPageUpManager.show();
        this.historyPageDownManager.show();
        this.historyDoubleList.add(node);
        node.setHistory();
        this.setHistoryPage(scanAndRelocateHistoryList.call(this,this.historyDoubleList));
    };

    return NodeManager.getInstance();
});
