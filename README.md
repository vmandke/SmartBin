# SmartBin
TFG2015 ABI GHC2015 Hackathon

Keeping environment in mind, Smartbin app is an innovative solution which tells the cleaning service which garbage bin is full and is to be replaced, which one is half filled and so on.
The bins show up in different colours to show their filled capacity while also throwing up the fastest route to get to them.


There are many steps you will have to follow once you clone this repository.

Setup API KEY :
1. First of all get a Zomato-Api Key
2. Create a file smart-bin-api/config.json
3. Add the above KEY as 'user_key' in this file.

Setup for the server :
This server runs on Python2.7  

    >> sudo easy_install virtualenv
    >> cd smart-bin-api
    >> virtualenv flask
    >> flask/bin/pip install flask
    >> source flask/bin/activate
    >> python app.py 

  This will start the server

