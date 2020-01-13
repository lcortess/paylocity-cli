# Paylocity time tracker

Simple paylocity CLI to see worked hours using data scrapping

# Using npm

- Run `npm install -g paylocity-cli`
- Once installed `paylocity --setup` and respond the questions
- Simply run `paylocity` on the command line

# Other commands

- `paylocity --config-path` Shows you the config path, all the values are saved in base64
- `paylocity --config-hour` Allows you to change the hour format that is showed in the _leave by_ column of the pace table

# How to obtain the Fingerprint

To use the fingerprint, you should indicate first to remember your username in order to prevent paylocity keep asking 
for security questions.

- For the fingerprint:
  - Go to Paylocity (https://access.paylocity.com/)
  - Open a javascript console command line.
  - Use the following command to get the FingerPrint: `document.getElementById('PaylocityFingerprintData').value`
  - Remember **TO NOT** copy the first and last quotes.
  - Example: the finger print may look like the following:
    `{"uaPlatform":"Mac OS11.15.1","language":"en-US","timezone":"Central Standard Time","depth":24,"resolution":"1440x2537","browser":"Chrome85","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.3945.88 Safari/537.36","plugins":"Chrome PDF Plugin, Chrome PDF Viewer, Native Client","fonts":"Arial Black, Arial, Bauhaus 93, ","canvas":"3985551669"}`
    
# Contributing
- Fork the repository. 
- Create a Pull request using Develop branch as base.
