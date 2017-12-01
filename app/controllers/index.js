var VolleyPackage = require('com.android.volley.*'),
    VolleyToolbox = require('com.android.volley.toolbox.*'),
    Activity = require('android.app.Activity'),
    activity = new Activity(Ti.Android.currentActivity);
    spinner = ('android.widget.Spinner');

function startRequest() {

    var queue = VolleyToolbox.Volley.newRequestQueue(activity);
    var url = 'http://httpbin.org/get';

    var request = new VolleyToolbox.StringRequest(VolleyPackage.Request.Method.GET, url,
        new VolleyPackage.Response.Listener({
            onResponse: function(response) {
                Ti.API.info('Response is: ' + response);

                alert('Request completed!' + JSON.stringify(response));
                $.btn.setTitle('Start request!');
                $.btn.setEnabled(true);
            }
        }),
        new VolleyPackage.Response.ErrorListener({
            onErrrorResponse: function(error) {
                Ti.API.error('HTTP error');
            }
        })
    );

    $.btn.setEnabled(false);
    $.btn.setTitle('Loading ...');

    queue.add(request);
}
$.win.open();
