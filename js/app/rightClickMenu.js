/**
 * Created by Administrator on 15-1-5.
 */
define(function (require) {

    var GraphManager=require("app/graphManager");

    var instance=null;
    var group = null;

    /**
     * remove menu objects form group in order to clear existing contextmenu
     */
    var removeMenu= function () {
      if(group)
      {
          group.remove();
      }
    };

    var MenuManager=function()
    {
        if(instance!=null)
        {
            throw new Error("Cannot instantiate more than one Singleton of MenuManager");
        }
        else
        {
            this.intialize();
        }
    };

    MenuManager.getInstance=function()
    {
        if(instance==null)
        {
            instance=new MenuManager();
            return instance;
        }
        else
        {
            return instance;
        }
    };

    MenuManager.prototype.intialize= function () {

    };


    /**
     * create a contextmenu for a existing node
     * @param e (event contains location of the event)
     */
    MenuManager.prototype.createMenu= function (e) {

        var paper=GraphManager.getCanvas();

        removeMenu();

        group=paper.set();
        var menu = paper.rect(e.pageX, e.pageY,208,90);
        menu.attr({stroke:"#BABABA", fill:"white", opacity:1.0});
        var sub_group_1 = paper.rect(e.pageX, e.pageY,208,30);
        var sub_group_2 = paper.rect(e.pageX, e.pageY + 30,208,30);
        var sub_group_3 = paper.rect(e.pageX, e.pageY + 60,208,30);

        sub_group_1.attr({fill:'white', opacity:0});
        sub_group_2.attr({fill:'white', opacity:0});
        sub_group_3.attr({fill:'white', opacity:0});

        var text_1 = paper.text(e.pageX + 50, e.pageY + 15, "Zoom in");
        text_1.attr({"font-family": "Consolas",
            "text-anchor":"start",
            fill:'black',
            "font-size": 14});

        var text_2 = paper.text(e.pageX + 50, e.pageY + 45, "Delete");
        text_2.attr({"font-family": "Consolas",
            "text-anchor":"start",
            fill:'black',
            "font-size": 14});

        var text_3 = paper.text(e.pageX + 50, e.pageY + 75, "Cancel");
        text_3.attr({"font-family": "Consolas",
            "text-anchor":"start",
            fill:'black',
            "font-size": 14});

        group.push(sub_group_1);
        group.push(sub_group_2);
        group.push(sub_group_3);
        group.push(menu);
        group.push(text_1);
        group.push(text_2);
        group.push(text_3);
        /**
         * set hover effect of items of the contextmenu
         * @param target (items of contextmenu)
         */
        var bind = function(target) {
            target.hover(

                function(){
                    target.attr({fill:'#4281F4', opacity:1});
                    //$('div').css({cursor: 'default'});
                },
                function(){
                    target.attr({fill:'white', opacity:0});
                    //$('div').css({cursor: 'default'});
                }
            );
        };


        bind(sub_group_1);
        bind(sub_group_2);
        bind(sub_group_3);

        /**
         * bind click event for items of contextmenu
         */
        sub_group_1.click(function () {
            alert("TODU");
            removeMenu();
        });

        sub_group_2.click(function () {
            alert("TODU");
            removeMenu();
        });
        sub_group_3.click(function () {
            alert("TODU");
            removeMenu();
        });
    };

    return MenuManager.getInstance();
});