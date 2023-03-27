   	<script>
		/**
		 * Determine the mobile operating system.
		 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
		 *
		 * @returns {String}
		 */
		function getMobileOS() {
			var e = navigator.userAgent || navigator.vendor || window.opera;
            return /android|Android/i.test(e) ? "android" : /iPad|iPhone|iPod|Macintosh/.test(e) && !window.MSStream ? "iOS" : "android";
		}
   			
   		var clickTag = "";
   		if (getMobileOS()=="iOS"){
   			clickTag = "";
   		}

   		window.failedIndex = 0; 
		window.openStore = function(clickTag) {
			mraid.open(clickTag);
		}
	</script>  