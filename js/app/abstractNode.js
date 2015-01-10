/**
 * Created by Administrator on 14-12-17.
 */

/**
 * superclass of node and literal
 */
define(function () {

    var AbstractNode = function () {
        this.predecessor=null;
    };

    AbstractNode.prototype.getPredecessor= function () {

        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.setPredecessor= function (predecessor) {

        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.getType= function () {

        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.setType= function (type) {

        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.getLocation= function () {

        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.setLocation= function (location) {

        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.getObjects= function () {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.getLiterals= function () {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.setText= function (text) {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.getText= function () {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.show= function () {
        throw new Error("This method must be overridden !");
    };
    AbstractNode.prototype.hide= function () {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.getRaphaelObject= function () {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.setLine= function (line) {
        throw new Error("This method must be overridden !");
    };

    AbstractNode.prototype.setPredicateText= function (predicateText) {
        throw new Error("This method must be overridden !");
    };

    return AbstractNode;
});