# Paylocity time tracker
Simple paylocity CLI to see worked hours using data scrapping

# Install

* Download and uncompress the project into a folder
* Copy the .paylocity.example into your home directory
* Fill the params:
  - PAYLOCITY_COMPANY=xxx
  - PAYLOCITY_USER=xxx
  - PAYLOCITY_PASSWORD=xxx
  - PAYLOCITY_FINGERPRINT=xxx
  For the fingerprint, login first in a browser and using the developer console get the finger print remember to save the device in orfer to get the finger print
  `document.getElementById('PaylocityFingerprintData').value` copy and paste without the leading and last quotes.
* run `npm install`

# Usage
* Run the script using node `node index.js`

