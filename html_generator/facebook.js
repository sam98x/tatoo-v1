	<script>
	
		function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
            return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";
		}
   			
   		var clickTag = "https://play.google.com/store/apps/details?id=com.lorybleur.bubbleshooter";
   		if (getMobileOS()=="iOS"){
   			clickTag = "https://play.google.com/store/apps/details?id=com.lorybleur.bubbleshooter";
   		}
   		window.failedIndex = 0; 

		window.openStore = function() {
			FbPlayableAd.onCTAClick();
		}

	</script>  