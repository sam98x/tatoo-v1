<script src="https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js"></script> 
	<script>
		function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
            return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";
		}
   		var clickTag = "https://play.google.com/store/apps/details?id=com.abi.draw.onepart.dop";
   		if (getMobileOS()=="iOS"){
   			clickTag = "https://play.google.com/store/apps/details?id=com.abi.draw.onepart.dop";
   		}
   		window.failedIndex = 0; 

		window.openStore = function() {
			  window.openAppStore();
		}

	</script>  