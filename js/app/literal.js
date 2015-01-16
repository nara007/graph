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
        this.self=GraphManager.paint(this.location,this.type);
        this.text=null;
        this.line=null;
        this.predicateText=null;

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

    Literal.prototype.setText= function (text) {
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

    Literal.prototype.show= function () {

        this.self.show();
        this.text.show();
        this.line.show();
        this.predicateText.show();
        return this;
    };

    Literal.prototype.hide= function () {
        this.self.hide();
        this.text.hide();
        this.line.hide();
        this.predicateText.hide();
        return this;
    };

    Literal.prototype.setLine=function(line){
        this.line=line;
        return this;
    };

    Literal.prototype.setPredicateText=function(predicateText){
        this.predicateText=predicateText;
        return this;
    };

    Literal.prototype.getRaphaelObject= function () {

        return this.self;
    };

    Literal.prototype.remove= function () {
        this.hide();
    };
    return Literal;

});