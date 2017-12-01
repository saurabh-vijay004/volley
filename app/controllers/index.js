var VolleyPackage = require('com.android.volley.*'),
    VolleyToolbox = require('com.android.volley.toolbox.*'),
    Activity = require('android.app.Activity'),
    activity = new Activity(Ti.Android.currentActivity);
spinner = ('android.widget.Spinner');

var AndroidAppPkg = require('android.app.*'),
    Button = require("android.widget.Button"),
    LayoutParams = require('android.widget.FrameLayout.LayoutParams'),
    Activity = require('android.app.Activity'),
    Color = require('android.graphics.Color'),
    TypedValue = require('android.util.TypedValue'),
    Gravity = require('android.view.Gravity'),
    OnClickListener = require('android.view.View.OnClickListener'),
    currentActivity = new Activity(Ti.Android.currentActivity),
    AlertDialog = AndroidAppPkg.AlertDialog,
    Builder = AlertDialog.Builder,
    DialogOnClickListener = require('android.content.DialogInterface.OnClickListener');

Toast = require('android.widget.Toast');
var Snackbar = require('android.support.design.widget.Snackbar');

// Create a new Button object with your current activity
var button = new Button(currentActivity);

// Set the width and height of the button layout
// In this case, we created it density-specific to
// look the same on different android-devices
var width = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 200, currentActivity.getResources().getDisplayMetrics());
var height = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 50, currentActivity.getResources().getDisplayMetrics());
var layoutParams = new LayoutParams(width, height, Gravity.CENTER);
button.setLayoutParams(layoutParams);

// Set a blue background-color (also try Color.RED or Color.GREEN!)
button.setBackgroundColor(Color.BlACK);

// Set a button title
button.setText("CLICK ME");

// Register a click-listener to the button
button.setOnClickListener(new OnClickListener({
	onClick : function(v) {
		startRequest();
	}
}));

// Add it to your titanium-view
$.win.add(button);

function startRequest() {

	var queue = VolleyToolbox.Volley.newRequestQueue(activity);
	var url = 'http://httpbin.org/get';

	var request = new VolleyToolbox.StringRequest(VolleyPackage.Request.Method.GET, url, new VolleyPackage.Response.Listener({
		onResponse : function(response) {
			Ti.API.info('Response is: ' + response);

			//	alert('Request completed!' + JSON.stringify(response));

			var builder = new Builder(new Activity(Titanium.App.Android.getTopActivity()));
			var res = JSON.stringify(response);
			builder.setTitle('My Title').setMessage(res).setCancelable(false);
			// modal
			builder.setPositiveButton('OK', new DialogOnClickListener({
				onClick : function(d, which) {
					// Display a toast message
					Toast.makeText(Ti.Android.currentActivity, "Ok Clicked!", Toast.LENGTH_LONG).show();
					button.setText("CLICK ME");
					button.setEnabled(true);
					Ti.API.warn(AndroidAppPkg);
				}
			}));
			builder.create().show();

			// Display a toast message
			Toast.makeText(Ti.Android.currentActivity, "Request Completed!", Toast.LENGTH_LONG).show();

			// Dsplay a Snackbar
			var snackbar = Snackbar.make($.win, "Request Completed!", Snackbar.LENGTH_LONG);
			snackbar.show();

		}
	}), new VolleyPackage.Response.ErrorListener({
		onErrrorResponse : function(error) {
			Ti.API.error('HTTP error');
		}
	}));

	button.setText("Loading...");
	button.setEnabled(false);

	queue.add(request);
}

$.win.open();
