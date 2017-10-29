@ECHO OFF
ECHO building android
call cordova build android
ECHO running android
call cordova emulate android
PAUSE