/**
 * Created by Administrator on 14-12-17.
 */

/**
 * GraphManager is a singelton, paint graph line arrow.
 */
define(["raphael","jquery"], function (raphael,$){

    var instance=null;

    /**
     *
     * @constructor
     *
     * "new" is forbidden, just require the singelton to use GraphManager
     */
    var GraphManager=function()
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

    GraphManager.getInstance=function()
    {
        if(instance==null)
        {
            instance=new GraphManager();
            return instance;
        }
        else
        {
            return instance;
        }
    };

    /**
     * intialize the main canvas
     */
    GraphManager.prototype.intialize= function () {

        //this.canvas=Raphael("canvas", $(window).width()-30, $(window).height());
        //this.canvas=Raphael(0, 0, 1200, 800);
        this.canvas=Raphael(0, 0, $(window).width(), $(window).height());
        this.canvas.canvas.style.backgroundColor = "#DDDDDD";
        //this.canvasOfActive=Raphael("active",$(window).width()/3, $(window).height()/2);
        //this.canvasOfLiteral=Raphael("literal",$(window).width()/3, $(window).height()/2);
        //this.canvasOfHistory=Raphael("historyZone",$(window).width()/3, $(window).height());
        //this.canvasOfObject=Raphael("objectZone",$(window).width()/3, $(window).height());
        //this.canvas={literalCanvas:this.canvasOfLiteral,
        //    historyCanvas:this.canvasOfHistory,
        //    objectCanvas:this.canvasOfObject};
    };

    GraphManager.prototype.setCanvas= function (canvas) {
        this.canvas=canvas;
        return this;
    };

    GraphManager.prototype.getCanvas= function () {
        return this.canvas;
    };
    GraphManager.prototype.setBackgroundColor=function(color){
        this.canvas.canvas.style.backgroundColor=color;
        return this;
    };
    GraphManager.prototype.getBackgroundColor= function () {
      return this.canvas.canvas.style.backgroundColor;
    };

    /**
     * paint raphael graph  oval rectangle
     * @param position  (object   x ,y)
     * @param type (String  "history,active,literal,object,blank")
     * @returns {*}  (object    an element of raphael.js)
     */
    GraphManager.prototype.paint= function (position,type) {
        var graph;
        var width=160;
        var height=60;
        var literalWidth=160;
        var literalHeight=30;
        if(type=="history")
        {
            graph=this.canvas.ellipse(position.x,position.y,width/2,height/2);
            graph.attr("fill", "gray");
        }
        else if(type=="active")
        {
            graph=this.canvas.ellipse(position.x,position.y,width/2,height/2);
            graph.attr("fill", "red");
        }
        else if(type=="literal")
        {

            graph=this.canvas.rect(position.x-literalWidth/2,position.y-literalHeight/2,literalWidth,literalHeight);
            graph.attr("fill", "green");
        }
        else if(type=="object")
        {
            graph=this.canvas.ellipse(position.x,position.y,width/2,height/2);
            graph.attr("fill", "orange");
        }

        else if(type=="blank")
        {
            graph=this.canvas.ellipse(position.x,position.y,0,0);
        }
        else
        {

        }
        return graph;
    };
    /**
     * paint text in a node
     * @param location (object   x ,y)
     * @param text (String text in a node)
     * @returns {*} (Object an element of raphael.js)
     */
    GraphManager.prototype.text= function (location,text) {
        var _text=this.canvas.text(location.x,location.y,text);
        _text.attr({"font-family":"Sans-serif","font-size":20,"font-weight":"bold"});
        return _text;
    };

    /**
     * paint line between two nodes
     * @param node1 (object  source node)
     * @param node2 (object  destination node)
     */
    GraphManager.prototype.line= function (node1,node2) {
        var path;
        var width=160;
        var height=60;
        if(node1==null||node1=="undefined"||node2==null||node2=="undefined")
        {

        }
        else
        {
            if(node1.getLocation().x==node2.getLocation().x)
            {
                if(node1.getLocation().y<node2.getLocation().y)
                {
                    path="M"+ node1.getLocation().x+" "
                    +(node1.getLocation().y+node1.height/2)
                    +"L"+node2.getLocation().x
                    +" "+(node2.getLocation().y-node2.height/2);
                }
                else
                {
                    path="M"+ node1.getLocation().x+" "
                    +(node1.getLocation().y-node1.height/2)
                    +"L"+node2.getLocation().x
                    +" "+(node2.getLocation().y+node2.height/2);
                }
            }
            else
            {
                if(node1.getLocation().y==node2.getLocation().y)
                {
                    if(node1.getLocation().x<node2.getLocation().x)
                    {
                        path="M"+ (node1.getLocation().x+node1.width/2)+" "
                        +node1.getLocation().y
                        +"L"+(node2.getLocation().x-node2.width/2)
                        +" "+node2.getLocation().y
                    }
                    else
                    {
                        path="M"+ (node1.getLocation().x-node1.width/2)+" "
                        +node1.getLocation().y
                        +"L"+(node2.getLocation().x+node2.width/2)
                        +" "+node2.getLocation().y
                    }
                }
                else
                {
                    if(node1.getLocation().y<node2.getLocation().y)
                    {
                        if(node1.getLocation().x<node2.getLocation().x)
                        {
                            path = "M" + node1.getLocation().x + " "
                            + (node1.getLocation().y + node1.height / 2)
                            + "L" + node1.getLocation().x
                            + " " + node2.getLocation().y
                            + "L" + (node2.getLocation().x-node2.width/2)
                            +" "+node2.getLocation().y;
                        }
                        else
                        {
                            path = "M" + node1.getLocation().x + " "
                            + (node1.getLocation().y + node1.height / 2)
                            + "L" + node1.getLocation().x
                            + " " + node2.getLocation().y
                            + "L" + (node2.getLocation().x+node2.width/2)
                            +" "+node2.getLocation().y;
                        }
                    }
                    else
                    {
                        if(node1.getLocation().x<node2.getLocation().x)
                        {
                            path = "M" + node1.getLocation().x + " "
                            + (node1.getLocation().y - node1.height / 2)
                            + "L" + node1.getLocation().x
                            + " " + node2.getLocation().y
                            + "L" + (node2.getLocation().x-node2.width/2)
                            +" "+node2.getLocation().y;
                        }
                        else
                        {
                            path = "M" + node1.getLocation().x + " "
                            + (node1.getLocation().y - node1.height / 2)
                            + "L" + node1.getLocation().x
                            + " " + node2.getLocation().y
                            + "L" + (node2.getLocation().x+node2.width/2)
                            +" "+node2.getLocation().y;
                        }
                    }
                }
            }

            if(node2.getType()=="blank")
            {
                this.canvas.path(path).attr({'stroke-width':2});
            }
            else
            {
                this.canvas.path(path).attr({'stroke-width':2,'arrow-end':'classic-wide-long'});
            }
        }
    };

    /**
     * paint uparrow  downarrow
     * @param type (String "up","down")
     * @param location (object x,y)
     */
    GraphManager.prototype.arrow= function (type,location) {
        var radius=28;
        //var L=radius*4*Math.tan(Math.PI/8)/3;
        //var x1=location.x; var y1=location.y-radius;
        //var x2=location.x-L; var y2=y1;
        //var x3=location.x-radius; var y3=location.y-L;
        //var x4=location.x-radius; var y4=location.y;
        //var x5=x4; var y5=y4+L;
        //var x6=x2; var y6=location.y+radius;
        //var x7=x1; var y7=y6;
        //var x8=x7+L; var y8=y7;
        //var x9=location.x+radius; var y9=location.y+L;
        //var x10=x9; var y10=location.y;
        //var x11=x10; var y11=y3;
        //var x12=x8; var y12=y1;
        //
        //var circle="M"+x1+","+y1+"C"+x2+","+y2+","+x3+","+y3+","+x4+","+y4+"C"+
        //    x5+","+y5+","+x6+","+y6+","+x7+","+y7+"C"+x8+","+y8+","+x9+","
        //    +y9+","+x10+","+y10+"C"+x11+","+y11+","+x12+","+y12+","+x1+","+y1+"z";

        var x13=location.x-radius/2; var y13=location.y+radius/2;
        var x14=x13-radius/4; var y14=y13-radius/4;
        var x15=location.x; var y15=location.y-radius/2;
        var x16=2*location.x-x14; var y16=y14;
        var x17=2*location.x-x13; var y17=y13;

        var arrowUp="M"+location.x+","+location.y+"L"+x13+","+y13
            +"L"+x14+","+y14+"L"+x15+","+y15+"L"+x16+","+y16
            +"L"+x17+","+y17+"L"+location.x+","+location.y+"z";

        var x18=location.x-radius/2; var y18=location.y-radius/2;
        var x19=x18-radius/4; var y19=y18+radius/4;
        var x20=location.x; var y20=location.y+radius/2;
        var x21=2*location.x-x19; var y21=y19;
        var x22=2*location.x-x18; var y22=y18;


        var arrowDown="M"+x18+","+y18+"L"
            +x19+","+y19+"L"+x20+","+y20+"L"+x21+","+y21+"L"+x22+","+
            y22+"L"+location.x+","+location.y+"L"+x18+","+y18+"z";

        var path=null;
        if(type==="up")
        {
            path=arrowUp;
        }
        else if(type==="down")
        {
            path=arrowDown;
        }
        else
        {
            path=null;
        }
        var arrowCursor=this.canvas.path(path).attr({fill: "#000", stroke: this.getBackgroundColor(),"stroke-width": 3});
        arrowCursor.hover(function (){
            arrowCursor.stop().animate({
                "stroke-width": 3,
                "fill-opacity": 0.7,
                stroke:"#FFFFFF"
            }, 150);
            arrowCursor.attr({cursor:"pointer"});
        }, function () {
            arrowCursor.stop().animate({
                "stroke-width": 3,
                "fill-opacity": 1,
                stroke:"#DDDDDD"
            }, 150);
        });
        arrowCursor.click(function () {
            alert("abc");
        });
    };

    return GraphManager.getInstance();
});