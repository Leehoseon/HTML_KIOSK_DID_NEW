var gl_xml_http;

var gl_arr_notice_list = new Array();
var gl_arr_store_list = new Array();
var gl_arr_pub_list = new Array();

//////////////////////////////////////////////////////////////
// 리턴할 페이지 불러오기
function setLoadContents(p_url){

    var str_ret = "";
    var http;

    if (window.XMLHttpRequest){
        gl_xml_http = new XMLHttpRequest();
    }else{
        gl_xml_http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    gl_xml_http.open("GET",p_url,true);

    gl_xml_http.onreadystatechange = onReadXmlContents;
    gl_xml_http.send();
}


function onReadXmlContents(){
    var ret_code = "FAIL";
    if (gl_xml_http.readyState != 4){
        //$("#id_progress_msg").html("Error!!<br>Please retry11");
        return;
    }
    if(gl_xml_http.status != 200){
        setTxtError("INIT","Error!!<br>Please retry");
        return;
    }

    var xml_doc = gl_xml_http.responseXML;
    var root_node = xml_doc.getElementsByTagName("KIOSK")[0];
    if(!root_node){
        setTxtError("INIT","Error!!<br>Please retry");
        return;
    }

    var i = 0;
    var child1 = root_node.firstChild;
    var child2;
    var child3;

    try{

        while(child1 != null && child1.nodeType != 4){

            if(child1.nodeType == 1){
                if(child1.nodeName == "HEADER"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "RET_CODE"){
                            ret_code = getCvtXmlTag(child2.childNodes[0].nodeValue);
                        }
                        child2 = child2.nextSibling;
                    }
                }else if(child1.nodeName == "NOTICE_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "NOTICE_INFO"){
                            child3 = child2.firstChild;
                            var CObj = new Object();

                            CObj.TYPE = getCvtXmlTag(child2.getAttribute("type"));

                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "SCH_TYPE"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.SDAY = getCvtXmlTag(child3.getAttribute("sday"));
                                    CObj.EDAY = getCvtXmlTag(child3.getAttribute("eday"));
                                    CObj.STIME = getCvtXmlTag(child3.getAttribute("stime"));
                                    CObj.ETIME = getCvtXmlTag(child3.getAttribute("etime"));
                                }

                                if(child3.nodeName == "SHOW_DAY"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.SHOW_SDAY = getCvtXmlTag(child3.getAttribute("show_sday"));
                                    CObj.SHOW_EDAY = getCvtXmlTag(child3.getAttribute("show_eday"));
                                }
                                if(child3.nodeName == "FILE_URL") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                child3 = child3.nextSibling;
                            }

                            CObj.SCH_TYPE = getCvtXmlTag(CObj.SCH_TYPE);
                            CObj.SDAY = getCvtXmlTag(CObj.SDAY);
                            CObj.EDAY = getCvtXmlTag(CObj.EDAY);
                            CObj.STIME = getCvtXmlTag(CObj.STIME);
                            CObj.ETIME = getCvtXmlTag(CObj.ETIME);
                            CObj.SHOW_SDAY = getCvtXmlTag(CObj.SHOW_SDAY);
                            CObj.SHOW_EDAY = getCvtXmlTag(CObj.SHOW_EDAY);
                            CObj.FILE_URL = getCvtXmlTag(CObj.FILE_URL);


                            if(CObj.FILE_URL != "" && CObj.TYPE == "IMG"){
                                gl_arr_notice_list.push(CObj);
                            }
                        }

                        child2 = child2.nextSibling;
                    }

                }else if(child1.nodeName == "STORE_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "STORE_INFO"){
                            child3 = child2.firstChild;

                            var CObj = new Object();

                            CObj.ID = getCvtXmlTag(child2.getAttribute("id"));
                            CObj.DP_TYPE = getCvtXmlTag(child2.getAttribute("dp_type"));
                            CObj.SEARCH_TYPE = getCvtXmlTag(child2.getAttribute("search_type"));

                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "CATE_CODE"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.SUB_CATE = getCvtXmlTag(child3.getAttribute("sub_cate"));
                                }
                                if(child3.nodeName == "STORE_FLOOR"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                    CObj.POS_X = getCvtXmlNum(child3.getAttribute("pos_x"),0);
                                    CObj.POS_Y = getCvtXmlNum(child3.getAttribute("pos_y"),0);
                                    CObj.GATE_POS_X = getCvtXmlNum(child3.getAttribute("gate_pos_x"),0);
                                    CObj.GATE_POS_Y = getCvtXmlNum(child3.getAttribute("gate_pos_y"),0);
                                }

                                if(child3.nodeName == "STORE_AREA"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                    CObj.AREA_X = getCvtXmlNum(child3.getAttribute("area_x"),0);
                                    CObj.AREA_Y = getCvtXmlNum(child3.getAttribute("area_y"),0);
                                    CObj.AREA_WIDTH = getCvtXmlNum(child3.getAttribute("area_width"),0);
                                    CObj.AREA_HEIGHT = getCvtXmlNum(child3.getAttribute("area_height"),0);
                                }

                                if(child3.nodeName == "STORE_VIEW_TYPE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_NAME_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_NUMBER") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_SUB_NUMBER") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_SERVICETIME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_PHONE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_TAG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "FONT_SIZE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_LOGO_URL") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_MAIN_URL") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_DESC_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_UNIT") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                child3 = child3.nextSibling;
                            }


                            CObj.CATE_CODE = getCvtXmlTag(CObj.CATE_CODE);
                            CObj.SUB_CATE = getCvtXmlTag(CObj.SUB_CATE);

                            CObj.STORE_FLOOR = getCvtXmlTag(CObj.STORE_FLOOR);
                            CObj.POS_X = getCvtXmlNum(CObj.POS_X,0);
                            CObj.POS_Y = getCvtXmlNum(CObj.POS_Y,0);
                            CObj.GATE_POS_X = getCvtXmlNum(CObj.GATE_POS_X,0);
                            CObj.GATE_POS_Y = getCvtXmlNum(CObj.GATE_POS_Y,0);

                            CObj.STORE_AREA = getCvtXmlTag(CObj.STORE_AREA);
                            CObj.AREA_X = getCvtXmlNum(CObj.AREA_X,0);
                            CObj.AREA_Y = getCvtXmlNum(CObj.AREA_Y,0);
                            CObj.AREA_WIDTH = getCvtXmlNum(CObj.AREA_WIDTH,0);
                            CObj.AREA_HEIGHT = getCvtXmlNum(CObj.AREA_HEIGHT,0);

                            CObj.STORE_VIEW_TYPE = getCvtXmlTag(CObj.STORE_VIEW_TYPE);
                            CObj.STORE_NAME_ENG = getCvtXmlTag(CObj.STORE_NAME_ENG);
                            CObj.STORE_NAME_SEARCH = getCvtSearchName(CObj.STORE_NAME_ENG);

                            CObj.STORE_NUMBER = getCvtXmlTag(CObj.STORE_NUMBER);
                            CObj.STORE_NUMBER = getCvtUnitName(CObj.STORE_NUMBER);
                            CObj.STORE_SUB_NUMBER = getCvtXmlTag(CObj.STORE_SUB_NUMBER);
                            CObj.STORE_SERVICETIME = getCvtXmlTag(CObj.STORE_SERVICETIME);
                            CObj.STORE_TAG = getCvtXmlTag(CObj.STORE_TAG);
                            CObj.FONT_SIZE = getCvtXmlNum(CObj.FONT_SIZE,14);

                            CObj.STORE_LOGO_URL = getCvtXmlTag(CObj.STORE_LOGO_URL);
                            CObj.STORE_SUB01_URL = getCvtXmlTag(CObj.STORE_SUB01_URL);

                            CObj.STORE_DESC_ENG = getCvtXmlTag(CObj.STORE_DESC_ENG);
                            CObj.STORE_UNIT = getCvtXmlTag(CObj.STORE_UNIT);

                            //CObj.STORE_LOGO_URL = CObj.STORE_LOGO_URL.replace(/commonfiles/gi,"commonfiles/" + gl_obj_init.brn_code); 
                            //CObj.STORE_SUB01_URL = CObj.STORE_SUB01_URL.replace(/commonfiles/gi,"commonfiles/" + gl_obj_init.brn_code); 

                            CObj.STORE_LOGO_URL = "infos/" + gl_obj_init.brn_code + "/" + CObj.STORE_LOGO_URL;
                            CObj.STORE_SUB01_URL = "infos/" + gl_obj_init.brn_code + "/" + CObj.STORE_SUB01_URL;
                            
                            /*
                            if(CObj.AREA_X != 0 && CObj.AREA_Y != 0){
                                gl_arr_store_list.push(CObj);
                                //console.log("NAME = " + CObj.STORE_NAME_ENG + " , " + CObj.STORE_NAME_SEARCH);
                            }
                            */

                            gl_arr_store_list.push(CObj);
                        }

                        child2 = child2.nextSibling;
                    }

                }else if(child1.nodeName == "PUB_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "PUB_INFO"){
                            child3 = child2.firstChild;

                            var CObj = new Object();

                            //CObj.DIRECTION = getCvtXmlTag(child2.getAttribute("direction"));
                            CObj.AREA = getCvtXmlTag(child2.getAttribute("area"));
                            //CObj.SECT = getCvtXmlTag(child2.getAttribute("sect"));

                            while(child3 != null && child3.nodeType != 4){
                                if(child3.nodeName == "PUB_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_CODE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_FLOOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_POS_X") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_POS_Y") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                child3 = child3.nextSibling;
                            }

                            CObj.PUB_ID = getCvtXmlTag(CObj.PUB_ID);
                            CObj.PUB_CODE = getCvtXmlTag(CObj.PUB_CODE);
                            CObj.PUB_FLOOR = getCvtXmlTag(CObj.PUB_FLOOR);
                            CObj.PUB_POS_X = getCvtXmlTag(CObj.PUB_POS_X);
                            CObj.PUB_POS_Y = getCvtXmlTag(CObj.PUB_POS_Y);

                            gl_arr_pub_list.push(CObj);
                        }

                        child2 = child2.nextSibling;
                    }
                }
            }

            child1 = child1.nextSibling;
        }
    }catch(err){
        $("#id_progress_msg").html("Error!!<br>Please retry44");
        return;
    }

    setInitSetting();
}


function getChkNull(p_src){
    if(p_src == null || p_src == undefined){
        return "";
    }else{
        return p_src + "";
    }
}

function getCvtXmlTag(p_src){
    if(p_src == null || p_src == undefined){
        return "";
    }
    var p1 = /<p>/gi;
    var p2 = /<\/p>/gi;

    p_src = p_src.replace(p1,"");
    p_src = p_src.replace(p2,"");
    p_src = p_src.trim();
    return p_src;
}

function getCvtSearchName(p_src){

    if(p_src == null || p_src == undefined){
        return "";
    }

    //var p1 = / /gi;
    var p1 = /[^a-z^0-9]/gi;
    //var p1 = /[^a-z]/gi;
    p_src = p_src.toLowerCase();
    p_src = p_src.replace(p1,"");
    //p_src = p_src.trim();
    return p_src;
}

function getCvtUnitName(p_src){
    var p1 = ///gi;
    p_src = p_src.replace(p1,"-");
    p_src = p_src.trim();
    return p_src;
}


function getCvtXmlTag_old(p_src){

    var p1 = /&amp;/gi;
    var p2 = /&lt;/gi;
    var p3 = /&gt;/gi;
    var p4 = /&quot;/gi;
    var p5 = /&apos;/gi;

    if(p_src == null || p_src == undefined){
        return "";
    }

    p_src = p_src + "";
    p_src = p_src.replace(p1,"&");
    p_src = p_src.replace(p2,"<");
    p_src = p_src.replace(p3,">");
    p_src = p_src.replace(p4,"\"");
    p_src = p_src.replace(p5,"\'");
    p_src = p_src.trim();
    return p_src;
}

function getCvtXmlNum(p_src,p_default){
    if(p_default == undefined) p_default = 0;
    if(p_src == null ) return p_default;
    if(isNaN(p_src) == true) return p_default;
    return Number(p_src);
}
