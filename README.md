Material Design CSS Framework
======

¡¡Work in progress!!


## Avoid CORS (same origin policy)
If you are testing Material Design CSS Framework, **same origin police** restrict you access to local file `custom_styles.html`. 
The solution if you need to test it locally without a web server (on local) is disable your browser security policy temporaly. 
Read below to know how to disable local files security policy in common browsers.

### Change local files security policy

#### Safari

Enable the develop menu using the preferences panel, under Advanced -> "Show develop menu in menu bar"

Then from the safari "Develop" menu, select "Disable local file restrictions", it is also worth noting safari has some odd behaviour with caches, so it is advisable to use the "Disable caches" option in the same menu; if you are editing & debugging using safari.

#### OSX Chrome
Start Chrome executable with a command line flag:
```
open -a 'Google Chrome' --args -allow-file-access-from-files
```

#### Unix Chrome
Start Chrome from command line with flag:
```
google-chrome  --allow-file-access-from-files
```

#### Windows Chrome
Close all running chrome instances first. Then start Chrome executable with a command line flag:

```
chrome --allow-file-access-from-files
```

On Windows, the easiest is probably to create a special shortcut which has added flag (right-click on shortcut -> properties -> target).

#### Firefox

1. Go to `about:config`
2. Find `security.fileuri.strict_origin_policy` parameter
3. Set it to `false`

#### Internet Explorer 11
Tested over version 11.0.9600.16438 and shows ok.

### Checking which flags are Enabled in Google Chrome

####In the browser
Open new tab to the URL ‘chrome://version/’ shows common information about Google Chrome loaded environment. 
The block **Command Line** should show you the list of enabled flags. (ex. `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --flag-switches-begin --flag-switches-end`)