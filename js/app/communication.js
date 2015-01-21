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

        if(subjectID=="http://knl")
        {
            return [{subject:"http://knl",predicate:"predicate:ccca",object:"knlccca"},
                {subject:"http://knl",predicate:"predicate:cccb",object:"knlcccb"},
                {subject:"http://knl",predicate:"predicate:cccc",object:"knlcccc"},
                {subject:"http://knl",predicate:"predicate:cccd",object:"knlcccd"},
                {subject:"http://knl",predicate:"predicate:ccce",object:"knlccce"},
                {subject:"http://knl",predicate:"predicate:cccf",object:"knlcccf"},
                {subject:"http://knl",predicate:"predicate:cccg",object:"knlcccg"},
                {subject:"http://knl",predicate:"predicate:ccch",object:"knlccch"},
                {subject:"http://knl",predicate:"predicate:ccci",object:"knlccci"}];
        }

        else if(subjectID=="http://cccm")
        {
            return [{subject:"http://cccm",predicate:"predicate:dddk",object:"http://cccmdddk"},
                {subject:"http://cccm",predicate:"predicate:dddl",object:"http://cccmdddl"},
                {subject:"http://cccm",predicate:"predicate:dddm",object:"http://cccmdddm"},
                {subject:"http://cccm",predicate:"predicate:dddn",object:"http://cccmdddn"},
                {subject:"http://cccm",predicate:"predicate:dddo",object:"http://cccmdddo"},
                {subject:"http://cccm",predicate:"predicate:dddp",object:"http://cccmdddp"},
                {subject:"http://cccm",predicate:"predicate:dddq",object:"http://cccmdddq"},
                {subject:"http://cccm",predicate:"predicate:dddr",object:"http://cccmdddr"},
                {subject:"http://cccm",predicate:"predicate:ddds",object:"http://cccmddds"},
                {subject:"http://cccm",predicate:"predicate:dddt",object:"http://cccmdddt"}];
        }

        else if(subjectID=="http://cccmdddh")
        {
            return [{subject:"http://cccmdddh",predicate:"predicate:acm",object:"http://cacm"},
                {subject:"http://cccmdddh",predicate:"predicate:acn",object:"http://cacn"},
                {subject:"http://cccmdddh",predicate:"predicate:aco",object:"http://caco"}];
        }

        else if(subjectID=="http://cacr")
        {
            return [{subject:"http://cacr",predicate:"predicate:dnh",object:"http://dnha"},
                {subject:"http://cacr",predicate:"predicate:dni",object:"http://dnia"}];
        }

        else if(subjectID=="http://woaini")
        {
            return [{subject:"http://woaini",predicate:"predicate:kgb",object:"http://akgba"},
                {subject:"http://woaini",predicate:"predicate:lgb",object:"http://bkgbb"},
                {subject:"http://woaini",predicate:"predicate:mgb",object:"http://ckgbc"},
                {subject:"http://woaini",predicate:"predicate:ngb",object:"http://dkgbd"},
                {subject:"http://woaini",predicate:"predicate:ogb",object:"http://ekgbe"},
                {subject:"http://woaini",predicate:"predicate:pgb",object:"http://fkgbf"},
                {subject:"http://woaini",predicate:"predicate:qgb",object:"http://gkgbg"},
                {subject:"http://woaini",predicate:"predicate:rgb",object:"http://hkgbh"},
                {subject:"http://woaini",predicate:"predicate:sgb",object:"http://ikgbi"},
                {subject:"http://woaini",predicate:"predicate:tgb",object:"http://jkgbj"}];
        }

        else if(subjectID=="http://abc")
        {
            return [{subject:"http://abc",predicate:"predicate:en",object:"abcen"},
                {subject:"http://abc",predicate:"predicate:fr",object:"abcfr"},
                {subject:"http://abc",predicate:"predicate:sl",object:"abcsl"},
                {subject:"http://abc",predicate:"predicate:es",object:"abces"},
                {subject:"http://abc",predicate:"predicate:it",object:"abcit"},
                {subject:"http://abc",predicate:"predicate:cn",object:"abccn"},
                {subject:"http://abc",predicate:"predicate:de",object:"abcde"},
                {subject:"http://abc",predicate:"predicate:zx",object:"abczx"},
                {subject:"http://abc",predicate:"predicate:zd",object:"abczd"},
                {subject:"http://abc",predicate:"predicate:ze",object:"abcze"},
                {subject:"http://abc",predicate:"predicate:zf",object:"abczf"},
                {subject:"http://abc",predicate:"predicate:zg",object:"abczg"},
                {subject:"http://abc",predicate:"predicate:zh",object:"abczh"},
                {subject:"http://abc",predicate:"predicate:zi",object:"abczi"},
                {subject:"http://abc",predicate:"predicate:zj",object:"abczj"},
                {subject:"http://abc",predicate:"predicate:zk",object:"abczk"},
                {subject:"http://abc",predicate:"predicate:zl",object:"abczl"},
                {subject:"http://abc",predicate:"predicate:zm",object:"abczm"},
                {subject:"http://abc",predicate:"predicate:zn",object:"abczn"}];
        }

    };

    Communication.prototype.getObjects= function (subjectID) {
        if(subjectID=="http://knl")
        {
            return [{subject:"http://knl",predicate:"predicate:cccj",object:"http://cccj"},
                {subject:"http://knl",predicate:"predicate:ccck",object:"http://ccck"},
                {subject:"http://knl",predicate:"predicate:cccl",object:"http://cccl"},
                {subject:"http://knl",predicate:"predicate:cccm",object:"http://cccm"},
                {subject:"http://knl",predicate:"predicate:cccn",object:"http://cccn"},
                {subject:"http://knl",predicate:"predicate:ccco",object:"http://ccco"},
                {subject:"http://knl",predicate:"predicate:cccp",object:"http://cccp"},
                {subject:"http://knl",predicate:"predicate:cccq",object:"http://cccq"},
                {subject:"http://knl",predicate:"predicate:cccr",object:"http://cccr"}];
        }
        else if(subjectID=="http://cccm")
        {
            return [{subject:"http://cccm",predicate:"predicate:ddda",object:"http://cccmddda"},
                {subject:"http://cccm",predicate:"predicate:dddb",object:"http://cccmdddb"},
                {subject:"http://cccm",predicate:"predicate:dddc",object:"http://cccmdddc"},
                {subject:"http://cccm",predicate:"predicate:dddd",object:"http://cccmdddd"},
                {subject:"http://cccm",predicate:"predicate:ddde",object:"http://cccmddde"},
                {subject:"http://cccm",predicate:"predicate:dddf",object:"http://cccmdddf"},
                {subject:"http://cccm",predicate:"predicate:dddg",object:"http://cccmdddg"},
                {subject:"http://cccm",predicate:"predicate:dddh",object:"http://cccmdddh"},
                {subject:"http://cccm",predicate:"predicate:dddi",object:"http://cccmdddi"},
                {subject:"http://cccm",predicate:"predicate:dddj",object:"http://cccmdddj"}];

            //return null;
        }

        else if(subjectID=="http://cccmdddh")
        {
            return [{subject:"http://cccmdddh",predicate:"predicate:acp",object:"http://cacp"},
                {subject:"http://cccmdddh",predicate:"predicate:acq",object:"http://cacq"},
                {subject:"http://cccmdddh",predicate:"predicate:acr",object:"http://cacr"}];
        }

        else if(subjectID=="http://cacr")
        {
            return [{subject:"http://cacr",predicate:"predicate:dnf",object:"http://woaini"},
                {subject:"http://cacr",predicate:"predicate:dng",object:"http://dnga"}];
        }

        else if(subjectID=="http://woaini")
        {
            return [{subject:"http://woaini",predicate:"predicate:ugb",object:"http://lkgbk"},
                {subject:"http://woaini",predicate:"predicate:vgb",object:"http://mkgbl"},
                {subject:"http://woaini",predicate:"predicate:wgb",object:"http://nkgbm"},
                {subject:"http://woaini",predicate:"predicate:xgb",object:"http://okgbn"},
                {subject:"http://woaini",predicate:"predicate:ygb",object:"http://pkgbo"}];
        }

        else if(subjectID=="http://abc")
        {
            return [{subject:"http://abc",predicate:"predicate:opg",object:"http://opg"},
                {subject:"http://abc",predicate:"predicate:kng",object:"http://kng"},
                {subject:"http://abc",predicate:"predicate:knh",object:"http://knh"},
                {subject:"http://abc",predicate:"predicate:kni",object:"http://kni"},
                {subject:"http://abc",predicate:"predicate:knj",object:"http://knj"},
                {subject:"http://abc",predicate:"predicate:knk",object:"http://knk"},
                {subject:"http://abc",predicate:"predicate:knl",object:"http://knl"},
                {subject:"http://abc",predicate:"predicate:knm",object:"http://knm"},
                {subject:"http://abc",predicate:"predicate:knn",object:"http://knn"},
                {subject:"http://abc",predicate:"predicate:kno",object:"http://kno"},
                {subject:"http://abc",predicate:"predicate:knp",object:"http://knp"}];
        }

    };
    return Communication.getInstance();
});