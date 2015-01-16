/**
 * Created by Administrator on 14-12-17.
 */
define(function (require){
    var AbstractNode=require("app/abstractNode"),
        GraphManager=require("app/graphManager"),
        $=require("jquery"),
        HashtablePlugin=require("Hashtabel"),
        MenuManager=require("app/rightClickMenu"),
        Communication=require("app/communication");
    /**
     *
     * @param property type=object,contains location,type("history","active","object")
     * @constructor
     */
    var Node= function (property) {
        AbstractNode.apply(this);
        this.location=property.location;
        this.type=property.type;
        this.literals=new $.Hashtable();
        this.objects=new $.Hashtable();
        this.text=null;
        this.self=null;

        this.activeSelf=null;
        this.activeText=null;

        this.historySelf=null;
        this.historyText=null;

        this.currentSelf=null;

        this.lineToBlank=null;
        this.line=null;
        this.predicateText=null;
        this.id=null;
        if(this.type=="active")
        {
            this.width=160;
            this.height=60;
            this.activeSelf=GraphManager.paint(this.location,this.type);
            this.currentSelf=this.activeSelf;
        }
        else if(this.type=="history")
        {
            this.width=160;
            this.height=60;
        }
        else if(this.type=="object")
        {
            this.width=160;
            this.height=60;
            this.self=GraphManager.paint(this.location,this.type);
            this.currentSelf=this.self;
        }
        else if(this.type=="blank")
        {
            this.width=0;
            this.height=0;
        }
        else
        {
        }
        if(property.type=="literal")
        {
            throw new Error("Literal node must not have child node");
        }
        var that=this;
        //this.self=GraphManager.paint(this.location,this.type);
        /**
         * right click event
         */
        //this.self.attr("cursor","pointer").mouseup(function (e) {
        //    if(e.which==3)
        //    {
        //        MenuManager.createMenu.call(that.self,e);
        //    }
        //});


    };
    /**
     *  inherit AbstractNode
     * @type {AbstractNode}
     */
    Node.prototype=new AbstractNode();

    Node.prototype.getPredecessor= function () {
        return this.predecessor;
    };
    Node.prototype.setPredecessor= function (predecessor) {
        this.predecessor=predecessor;
        return this;
    };
    Node.prototype.setType= function (type) {
        this.type=type;
        return this;
    };
    Node.prototype.getType= function () {
        return this.type;
    };
    Node.prototype.setLocation= function (location) {
        this.location=location;
        //this.self.attr(x:location.x,);
        return this;
    };
    Node.prototype.getLocation= function () {

        if(this.type=="blank")
        {
            return {x:930,y:150};
        }
        else
        {
            if(this.currentSelf==this.activeSelf)
            {
                return {x:$(window).width()/2-100,y:150};
            }
            else
                return this.location;
        }

    };

    /**
     *  add a subnode to the container of a node
     * @param successor
     * @param property
     * @returns {Node}
     */
    Node.prototype.addNode= function (successor,property) {
        if(successor.getType()=="literal")
        {
            throw new Error("literal cannot be added by addNode() !");
        }
        else
        {
            this.objects.add(property.predicate,successor);
            successor.setPredecessor(this);
            return this;
        }
    };

    /**
     * remove a subnode from the container of a node
     * @param predicate
     * @returns {Node}
     */
    Node.prototype.removeNode= function (predicate) {
        if(this.objects.containsKey(predicate))
        {
            this.objects.remove(predicate);
            return this;
        }
        else
        {
            throw new Error(predicate+" does not exist!");
        }
    };
    /**
     * remove a subnode from the container of a node
     * @param predicate
     * @returns {Node}
     */
    Node.prototype.removeLiteral= function (predicate) {
        if(this.literals.containsKey(predicate))
        {
            this.literals.remove(predicate);
            return this;
        }
        else
        {
            throw new Error(predicate+" does not exist!");
        }
    };

    /**
     * add a subnode from the container of a node
     * @param literal
     * @param property
     * @returns {Node}
     */
    Node.prototype.addLiteral= function (literal,property) {
        if(literal!=null&&literal!=undefined)
        {
            this.literals.add(property.predicate,literal);
            literal.setPredecessor(this);
            return this;
        }
    };

    /**
     * get objects set of a node
     * @returns {$.Hashtable|*}
     */
    Node.prototype.getObjects= function () {

        return this.objects;
    };

    /**
     * get literals set of a node
     * @returns {$.Hashtable|*}
     */
    Node.prototype.getLiterals= function () {
        return this.literals;
    };

    /**
     * set text of a node
     * @param text
     * @returns {Node}
     */
    Node.prototype.setText= function (text) {
        if(this.text==null)
        {
            this.text=GraphManager.text(this.location,text);
            this.id=text;
        }
        else
        {
            this.text.attr({text:text});
            this.id=text;
        }
        return this;
    };

    Node.prototype.getID= function () {
      return this.id;
    };

    Node.prototype.setLine=function(line){
        this.line=line;
        return this;
    };

    Node.prototype.setPredicateText=function(predicateText){
        this.predicateText=predicateText;
        return this;
    };

    /**
     * get text of a node
     * @returns {null|*}
     */
    Node.prototype.getText= function () {
        return this.text;
    };

    Node.prototype.show= function () {
        if(this.currentSelf==this.self)
        {
            this.self.show();
            if(this.text)
            {
                this.text.show();
            }
            if(this.line)
            {
                this.line.show();
            }
            if(this.predicateText)
            {
                this.predicateText.show();
            }
        }
        else if(this.currentSelf==this.activeSelf)
        {
            this.activeSelf.show();
            if(this.activeText)
            {
                this.activeText.show();
            }
            if(this.lineToBlank)
            {
                this.lineToBlank.show();
            }
        }

        else if(this.currentSelf==this.historySelf)
        {
            this.historySelf.show();
            if(this.historyText)
            {
                this.historyText.show();
            }
        }
        else
        {
            alert("TODO");
        }
        return this;
    };

    Node.prototype.hide= function () {
        if(this.currentSelf==this.self)
        {
            this.self.hide();
            if(this.text)
            {
                this.text.hide();
            }
            if(this.line)
            {
                this.line.hide();
            }
            if(this.predicateText)
            {
                this.predicateText.hide();
            }
        }

        else if(this.currentSelf==this.activeSelf)
        {
            this.activeSelf.hide();
            if(this.activeText)
            {
                this.activeText.hide();
            }
            if(this.lineToBlank)
            {
                this.lineToBlank.hide();
            }
        }

        else if(this.currentSelf==this.historySelf)
        {
            this.historySelf.hide();
            if(this.historyText)
            {
                this.historyText.hide();
            }
        }
        else
        {
            alert("TODO");
        }

        return this;
    };

    Node.prototype.getRaphaelObject= function () {
        return this.currentSelf;
    };

    Node.prototype.remove= function () {
        if(this.type=="object") {
            this.hide();
        }
        else if(this.type=="active")
        {
            this.hide();
            for(var i in this.objects.items)
            {
                this.objects.items[i].remove();
            }

            for(var j in this.literals.items)
            {
                this.literals.items[j].remove();
            }
        }

        return this;
    };

    Node.prototype.setActive= function(){

        if(this.activeSelf==null)
        {
            this.activeSelf=GraphManager.paint({x:$(window).width()/2-100,y:150},"active");
            this.activeText=GraphManager.text({x:$(window).width()/2-100,y:150},this.id);
        }
        this.currentSelf=this.activeSelf;
        this.setType("active");
        this.show();
        return this;
    };

    Node.prototype.setHistory= function () {
        if(this.historySelf==null)
        {
            this.historySelf=GraphManager.paint({x:200,y:200},"history");
            this.historyText=GraphManager.text({x:200,y:200},this.id);
        }
        this.currentSelf=this.historySelf;
        this.setType("history");
        this.show();
        return this;
    };

    Node.prototype.setLineToBlank= function (line) {
      this.lineToBlank=line;
    };
    return Node;

});