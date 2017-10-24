@ECHO OFF
ECHO building browser
CALL .\_cordova_browser_build.bat
ECHO running browser
CALL .\_cordova_browser_run.bat
PAUSE