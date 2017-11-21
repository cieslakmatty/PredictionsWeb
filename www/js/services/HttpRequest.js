var HttpRequest = {
    post(handle, data, response) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://' + serverUrl + handle);
        xhr.send(JSON.stringify(data));
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            response(data);
        }
    },

    get(handle, response) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                response(data);
            }
        };
        xhr.open("GET", 'http://' + serverUrl + handle, true);
        xhr.send();
    }
}