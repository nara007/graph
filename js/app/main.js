///**
// * Created by Administrator on 14-12-15.
// */
//
//
////require.config({paths:{
////    "raphael":"../lib/raphael/raphael",
////    "jquery":"../lib/jquery/jquery-2.1.3.js"
////}});
////
////
//////require(["graphManager","node","literal","jquery"], function (graphManager,Node,Literal,$)
////require(["jquery"], function ($)
////{
////
////    //var demo1=new Node(null,{x:200,y:400},"history");
////    //var demo2=new Node(demo1,{x:200,y:300},"history");
////    //var demo3=new Node(demo2,{x:200,y:200},"history");
////    //var demo4=new Node(demo3,{x:500,y:100},"active");
////    //var demo5=new Literal(demo4,{x:800,y:200});
////    //var demo6=new Literal(demo4,{x:800,y:300});
////    //var demo7=new Literal(demo4,{x:800,y:400});
////    //var demo8=new Literal(demo4,{x:800,y:500});
////    //
////    //var demo9=new Node(demo4,{x:500,y:100},"active");
////    //var demo10=new Node(demo4,{x:500,y:100},"active");
////    ////var demo5=new NonliteralNode(demo4,{x:300,y:500},"object");
////    //
////    //var objs=demo4.getObjects();
////    //var literals=demo4.getLiterals();
////
////    var abc=$("#btnShow");
////
////    //$("#btnShow").bind("click", function () {
////    //    console.log("abc");
////    //});
////    $.hello("nihao xiaoming!");
////});
//
//define(function (require){
//
//    var $=require("jquery"),
//        abc=require("bootstrap");
//
//    $('#myModalButton').show();
//    //alert(abc);
//    //var Node=require("app/node"),
//    //    Literal=require("app/literal");
//
//    //var node1=new Node({location:{x:200,y:600},type:"active"});
//    //var node2=new Node({location:{x:100,y:100},type:"history"});
//    //var node3=new Node({location:{x:500,y:500},type:"active"});
//    //var node4=new Literal({location:{x:100,y:200},type:"active"});
//    //var node5=new Literal({location:{x:300,y:500},type:"active"});
//    //
//    //node1.addNode(node2,{predicate:"place"}).addNode(node3,{predicate:"shijian"});
//    //node3.addLiteral(node4,{predicate:"xiaoming"}).addLiteral(node5,{predicate:"xiaohong"});
//    ////node2.addNode(node3,{predicate:"shijian"});
//    //alert(node1.getObjects().get("shijian").getType());
//    //alert(node3.getLiterals().get("xiaoming").getType());
//
//    //
//    ////$("#btnShow").bind("click", function () {
//    ////   alert("abc");
//    ////});
//    //
//    //var demo=new $.Hashtable();
//    //demo.add("xiaoming","12");
//    //demo.add("xiaoqiang","15");
//    //demo.add("daming","16");
//    //
//    //alert(demo.get("daming")+" "+demo.get("xiaoming")+" "+demo.get("xiaoqiang"));
//});

require(["jquery", "bootstrap","app/nodeManager","tinyscrollbar","app/node","app/graphManager","app/literal"], function ($,_,NodeManager,abc,Node,GraphManager,Literal){

    $("#submit").bind("click",function(){
        alert("abc");
    });

    $("#show").bind("click",function(){

        $.post("/model/showNodes",null,function(data)
        {
            console.log(data);
        });
        alert("abcdef");
    });

    $(document).bind('contextmenu', function (e) {
        e.preventDefault();
    });

    var data=[{subject:"http://abc",predicate:"predicate:en",object:"abcen"},
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


    var objectData=[{subject:"http://abc",predicate:"predicate:opg",object:"http://opg"},
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

    //console.log(DrawGraph);
    NodeManager.drawLiteralsAndObjects(data,objectData,"http://abc");

    //var node1=new Node({location:{x:$(window).width()/2-100,y:150},type:"active"});
    //var node4=new Literal({location:{x:$(window).width()/1.6,y:300},type:"literal"});
    //var node5=new Literal({location:{x:$(window).width()/1.6,y:350},type:"literal"});
    //var node6=new Literal({location:{x:$(window).width()/1.6,y:400},type:"literal"});
    //var node7=new Literal({location:{x:$(window).width()/1.6,y:450},type:"literal"});
    //var node8=new Literal({location:{x:$(window).width()/1.6,y:500},type:"literal"});
    //var node9=new Literal({location:{x:$(window).width()/1.6,y:550},type:"literal"});
    //var node10=new Literal({location:{x:$(window).width()/1.6,y:600},type:"literal"});
    //
    //var node11=new Node({location:{x:200,y:150},type:"history"});
    //var node12=new Node({location:{x:200,y:250},type:"history"});
    //var node13=new Node({location:{x:200,y:350},type:"history"});
    //var node14=new Node({location:{x:200,y:450},type:"history"});
    //
    //
    //var node15=new Node({location:{x:1000,y:150},type:"blank"});
    //
    //var node16=new Node({location:{x:1200,y:150},type:"object"});
    //var node17=new Node({location:{x:1200,y:250},type:"object"});
    //var node18=new Node({location:{x:1200,y:350},type:"object"});
    //var node19=new Node({location:{x:1200,y:450},type:"object"});
    //var node20=new Node({location:{x:1200,y:550},type:"object"});
    //
    //GraphManager.line(node1,node4);
    //GraphManager.line(node1,node5);
    //GraphManager.line(node1,node6);
    //GraphManager.line(node1,node7);
    //GraphManager.line(node1,node8);
    //GraphManager.line(node1,node9);
    //GraphManager.line(node1,node10);
    //
    //GraphManager.line(node1,node15);
    //
    //GraphManager.line(node15,node16);
    //GraphManager.line(node15,node17);
    //GraphManager.line(node15,node18);
    //GraphManager.line(node15,node19);
    //GraphManager.line(node15,node20);
    //
    //GraphManager.line(node14,node13);
    //GraphManager.line(node13,node12);
    //GraphManager.line(node12,node11);
    //GraphManager.line(node11,node1);
    //
    //
    //GraphManager.arrow("up",{x:200,y:100});
    //GraphManager.arrow("down",{x:200,y:500});
    //
    //GraphManager.arrow("up",{x:$(window).width()/1.6,y:250});
    //GraphManager.arrow("down",{x:$(window).width()/1.6,y:650});
    //
    //GraphManager.arrow("up",{x:1200,y:100});
    //GraphManager.arrow("down",{x:1200,y:600});
    //
    //node1.setText("abc");
    //node1.setText("");
    //node1.setText("abcefg");
});