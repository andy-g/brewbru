var activefile;
var editor;
window.onload=function(){
	// Set ACE editor settings based on wcreen width
	editor = ace.edit("editor");
	// editor.setTheme("ace/theme/monokai");
	editor.$blockScrolling = Infinity;
	//editor.getSession().setMode("ace/mode/lua");
	editor.getSession().setUseSoftTabs(false);
	document.getElementById('editor').style.fontSize='14px';

	//editor.setShowPrintMargin(false);
	// editor.setOptions({
	// 	maxLines: Infinity
	// });

	// var files = {"init.lua":3544,"xchips-ide.lua":4297,"api.lc":3320,"wifi_credentials.json":168,"editor.html":1736,"api.lua":3607}

	$( document ).on("click", "#files li, nav li",function(){
		var filename = $(this).text()
		$('#files li').removeClass("active");
		$(this).addClass("active");
		$(this).addClass("loading");
		editor.getSession().setValue('');
		editor.getSession().setMode("ace/mode/"+filename.substr(filename.lastIndexOf('.')+1));
		// $.get("/file?filename="+filename, function(file){
		$.get("/files/"+filename, function(file){
			activefile = filename;
			console.log(activefile);
			$("#files li").removeClass("loading");
			editor.getSession().setValue(file);
		});

		// editor.getSession().setValue("[\n\t{\n\t\t\"ssid\": \"ignitionroom\",\n\t\t\"password\": \"florence\"\n\t},\n\t{\n\t\t\"ssid\": \"mukuru wireless\",\n\t\t\"password\": \"boom-boom2\"\n\t}\n]");
		// editor.getSession().setMode("ace/mode/"+"json");

		$('nav').removeClass("nav-is-open");
	})

	$( document ).on("click", ".nav-button",function(){
		console.log('nav');
		$('nav').toggleClass("nav-is-open");
	});

	$( document ).on("click", ".fa-cloud-upload",function(){
		save();
	});

	$( window ).resize(function() {
		console.log('resize');
		if (screen.width > 700) {
			editor.setTheme("ace/theme/monokai");
			editor.renderer.setShowGutter(true);
			editor.setHighlightActiveLine(true);
		} else {
			editor.setTheme("ace/theme/tomorrow");
			editor.renderer.setShowGutter(false);
			editor.setHighlightActiveLine(false);
		}
	});

	//Load files on device, create file links
	$.get("/files", function(files){
		for (var file in files) {
			$('#files ul').append( "<li>"+file+"<div class='spinner'><div></div><div></div><div></div><div></div><div></div></div></li>" );
			$('nav ul').append( "<li><a><i class='fa fa-fw fa-code'></i>"+file+"</a></li>" );
		}
	});

	function save(){
		// $.post("/file?filename="+activefile, editor.getValue(), function(data){
		$.post("/files/"+activefile, editor.getValue(), function(data){
			console.log(data);
		}, "text");
	}
	$( window ).resize();
}
