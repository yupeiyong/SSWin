$(function(){
function GetRequest() {
var url = location.search; //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
var str = url.substr(1);
strs = str.split("&");
for(var i = 0; i < strs.length; i ++) {
theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
}
}
return theRequest;
}
var Request = new Object();
Request = GetRequest()
if(Request["uid"]!=undefined){
var uid = Request["uid"];
}
console.log(uid)

$.ajax({
             type: "post",
             url: "https://www.jindi163.com:8443/JDLot/lottype/pagelist",
             data: {"uid":uid,"PageSize":"100"},
             async:true,
             dataType: "json",
             contentType:"application/json",
             function(XMLHttpRequest) {
                              $("body").append('<div  id="load" style="z-index:10; position:fixed; top:0;left:0;right:0;bottom:0;margin:auto;width:4rem;height:4rem"><img alt="数据加载中..." src="img/massage/4c3ba25d7384dee10d565e7f20c89400_t014be238bb089e1e42.gif" style="width:100%"/></div>');
                               },
             success: function(data){
                   data=data.datas;
                   console.log(data)

                   $('#caizhongjiekou').empty();  
                   var html="";
                    // if (uid!="") {
                    //   return uid
                    // }else{
                    //   uid="";
                    // }
                    var fuds="";
                    var dat=new Array();
                    var nams=new Array();
                   $.each(data,function(i){
                      var good_name=data[i].lottery_name;
                      var good=good_name.substring(5);
                          good=good+"_trend.html?uid=";//链接
                        dat.push(good)

                       var sss= data[i].lottery_full_name;
                       nams.push(sss);
                    
            html+='<li><a href="'+good+uid+'">'+data[i].lottery_full_name+'</a></li>'
                       })
          

                      $("#dsf").text(nams[0])
                   $('#caizhongjiekou').append(html);
                    $('#caizhongjiekou li').each(function(i){
                      $(this).click(function(){
                        var index=i;
                        $(".caipiao_leixing").empty();
                         $(".caipiao_leixing").text(nams[index])
                         // alert(nams[index])
                      })
                    })
                 },
      complete: function(XMLHttpRequest, textStatus) {$("#load").remove(); }

       })
   
})