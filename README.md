# Paylocity time tracker
Simple paylocity CLI to see worked hours using data scrapping

# Using npm 
* Run `npm install -g paylocity-cli`
* Copy the .paylocity.example into your home directory
  - `cp .paylocity.example ~/.paylocity`
* Fill the params:
  - PAYLOCITY_COMPANY=xxx
  - PAYLOCITY_USER=xxx
  - PAYLOCITY_PASSWORD=xxx
  - PAYLOCITY_FINGERPRINT=xxx
    - Please take a look at How to obtain the Fingerprint
 * Simply run `paylocity` on the command line

# Manual Install
* Download and uncompress the project into a folder
* Copy the .paylocity.example into your home directory
  - `cp .paylocity.example ~/.paylocity`
* Fill the params:
  - PAYLOCITY_COMPANY=xxx
  - PAYLOCITY_USER=xxx
  - PAYLOCITY_PASSWORD=xxx
  - PAYLOCITY_FINGERPRINT=xxx
    - Please take a look at How to obtain the Fingerprint
* run `npm install`
* Run the script using node `node index.js`

# How to obtain the Fingerprint
  * For the fingerprint:
    - Go to Paylocity (https://access.paylocity.com/)
    - Open a javascript console command line.
    - Use the following command to get the FingerPrint: `document.getElementById('PaylocityFingerprintData').value`
    - Remember **NOT** to copy the first and last quotes.
    - Example: the finger print may look like the following:
    `{"uaPlatform":"Mac OS11.15.1","language":"en-US","timezone":"Central Standard Time","depth":24,"resolution":"1440x2537","browser":"Chrome85","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.3945.88 Safari/537.36","plugins":"Chrome PDF Plugin, Chrome PDF Viewer, Native Client","fonts":"Arial Black, Arial, Bauhaus 93, ","canvas":"3985551669"}`
    
    
