/**
 * Created by Administrator on 14-12-17.
 */
define(function (require) {
    var AbstractNode=require("app/abstractNode"),
        GraphManager=require("app/graphManager"),
        $=require("jquery"),
        HashtablePlugin=require("Hashtabel"),
        MenuManager=require("app/rightClickMenu");
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
        if(this.type=="active")
        {
            this.width=160;
            this.height=60;
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
        this.self=GraphManager.paint(this.location,this.type);
        this.self.attr("cursor","pointer").mouseup(function (e) {
            if(e.which==3)
            {
                MenuManager.createMenu.call(that.self,e);
            }
        });
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
        return this;
    };
    Node.prototype.getLocation= function () {
        return this.location;
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
        }
        else
        {
            this.text.attr({text:text});
        }
        return this;
    };

    /**
     * get text of a node
     * @returns {null|*}
     */
    Node.prototype.getText= function () {
        return this.text;
    };
    //Node.prototype.print= function () {
    //  console.log(this.getType()+"\n");
    //  for(var index in this.successors)
    //  {
    //      this.successors[index].print();
    //  }
    //};

    //Node.prototype.paint= function(position,type) {
    //   GraphManager.paint(position,type);
    //};

    return Node;

});