/**
 * Created by Administrator on 14-12-19.
 */
define(function (require) {
    var AbstractNode=require("app/abstractNode"),
        GraphManager=require("app/graphManager");

    /**
     * literal node inherit AbstractNode
     * @param property
     * @constructor
     */
    var Literal= function (property) {
        AbstractNode.apply(this);
        this.location=property.location;
        this.type="literal";
        this.width=160;
        this.height=30;

        GraphManager.paint(this.location,this.type);
        //GraphManager.line(predecessor,this);
    };

    Literal.prototype=new AbstractNode();

    Literal.prototype.getPredecessor= function () {
        return this.predecessor;
    };

    Literal.prototype.setPredecessor= function (predecessor) {
        this.predecessor=predecessor;
        return this;
    };

    Literal.prototype.getType= function () {
        return this.type;
    };

    Literal.prototype.setType= function (type) {
        console.log("The type of literal node cannot be reset !");
        return this;
    };

    Literal.prototype.getLocation= function () {
        return this.location;
    };
    Literal.prototype.setLocation= function (location) {
        this.location=location;
        return this;
    };
    return Literal;

});