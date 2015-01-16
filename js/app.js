/**
 * Created by Administrator on 14-12-22.
 */
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app":"../app",
        "jquery": "jquery/jquery-2.1.3",
        "bootstrap":"bootstrap/bootstrap",
        "Hashtabel": "jquery/jsHashtable",
        "raphael":"raphael/raphael",
        "tinyscrollbar":"tinyscrollbar/jquery.tinyscrollbar.min",
        "DoubleList":"doubleList/doubleList"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    }
});

requirejs(["app/main"]);
