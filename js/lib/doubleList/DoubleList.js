/**
 * Created by Administrator on 15-1-14.
 */
    
define(function (require) {


    var DoubleList = function ()
    {
        this.len=0;
        this.head=null;
        this.tail=null;
        this.length=0;
    };

    DoubleList.prototype.add= function (item) {
        //this.len=this.items.push(item);

        var node=new ListNode();
        node.setObject(item);
        if(this.head==null)
        {
            this.head=node;
            this.tail=node;
            node.setPredecessor(null);
            node.setSuccessor(null);
        }
        else
        {
            this.tail.setSuccessor(node);
            node.setPredecessor(this.tail);
            this.tail=node;
            this.tail.setSuccessor(null);
        }
        this.length++;

        return this;
    };

    DoubleList.prototype.contains= function (node) {

        var myNode=this.head;
        if(myNode!=null)
        {
            while(myNode.getObject()!=node&&myNode.getSuccessor()!=null)
            {
                myNode=myNode.getSuccessor();
            }
            if(myNode==this.tail)
            {
                if(myNode.getObject()!=node)
                {
                    return null;
                }
                else
                    return myNode;

            }
            else
            {
                return myNode;
            }
        }
        else
        {
            return null;
        }
    };

    DoubleList.prototype.remove= function (node) {

        if(this.length<=0)
        {

        }
        else
        {
            var point=this.head;
            while(point.getObject()!=node&&point.getSuccessor()!=null)
            {
                point=point.getSuccessor();
            }
            if(point==this.tail)
            {
                if(point.getObject()!=node)
                {
                    throw new Error("This node does not exist!");
                }
                else
                {
                    if(this.length==1)
                    {
                        this.head=null;
                        this.tail=null;
                        this.length--;
                    }
                    else
                    {
                        this.tail=this.tail.getPredecessor();
                        this.tail.setSuccessor(null);
                        this.length--;
                    }
                }

            }
            else
            {
                if(point==this.head)
                {
                    this.head=this.head.getSuccessor();
                    this.head.setPredecessor(null);
                    this.length--;
                }
                else
                {
                    point.getPredecessor().setSuccessor(point.getSuccessor());
                    point.getSuccessor().setPredecessor(point.getPredecessor());
                    this.length--;
                }

            }
        }

        return this;
    };

    DoubleList.prototype.removeFrom= function (node) {

        var myNode=this.contains(node);
        if(myNode==null)
        {
            throw new Error("DoubleList does not contain this node");
        }
        else
        {

            while(myNode.getSuccessor()!=null)
            {
                var tmp=myNode;
                myNode=myNode.getSuccessor();
                this.remove(tmp.getObject());
            }
            this.remove(myNode.getObject());
        }

        return this;

    };

    DoubleList.prototype.size= function () {

        return this.length;
    };

    DoubleList.prototype.getListHead= function () {
        return this.head;
    };

    DoubleList.prototype.getListTail= function () {
        return this.tail;
    };

    /**
     * ListNode class
     * @constructor
     */
    var ListNode= function () {

        this.object=null;
        this.predecessor=null;
        this.successor=null;
        return this;
    };

    ListNode.prototype.setPredecessor= function (predecessor) {

        this.predecessor=predecessor;
        return this;
    };

    ListNode.prototype.setSuccessor= function (successor) {
        this.successor=successor;
        return this;
    };

    ListNode.prototype.getPredecessor= function () {

        return this.predecessor;
    };

    ListNode.prototype.getSuccessor= function () {
        return this.successor;
    };

    ListNode.prototype.setObject= function (object) {
        this.object=object;
        return this;
    };

    ListNode.prototype.getObject= function () {
        return this.object;
    };


    return DoubleList;
});
