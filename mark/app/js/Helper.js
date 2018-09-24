function xhrRequest (page, callback) {

    xhr(`${location.protocol}//${location.host}/list.php?page=${page}&per_page=4`, "GET", null, callback);
};

function xhr (url, method,  data, callBack) {
    var xmlhttp 	 = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) return callBack(xmlhttp.responseText);
    };

    xmlhttp.open(method, url);
    xmlhttp.send(data);
};

