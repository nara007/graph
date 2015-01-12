/**
 * Created by Administrator on 15-1-11.
 */
define(function(require){

    var $=require("jquery");


    var instance=null;

    var Communication=function()
    {
        if(instance!=null)
        {
            throw new Error("Cannot instantiate more than one Singleton of Communication");
        }
        else
        {
            this.intialize();
        }
    };


    Communication.getInstance=function()
    {
        if(instance==null)
        {
            instance=new Communication();
            return instance;
        }
        else
        {
            return instance;
        }
    };

    Communication.prototype.intialize= function (){

    };

    Communication.prototype.getLiterals= function (subjectID) {
        alert(subjectID);
    };

    Communication.prototype.getObjects= function (subjectID) {
        alert(subjectID);
    };
    return Communication.getInstance();
});