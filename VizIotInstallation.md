# VizIoT Installation

## Requirements and Notes

- This application was built and deployed with Ubuntu version 18.04
	- Recommend using Linux to deploy this application locally
- Deploying this application on a Linux machine requires administrator permissions on the machine
	- Recommend prefixing all commands with 'sudo' 
- All commands should be run from the command line
	- See individual deployment/termination instructions for information on where to run commands in the machine directory
- Dependencies:
	1. NodeJS
	2. MongoDB
	3. Python 3
		- scapy library
		- pymongo library

	- Note:: All JS components should be run with *yarn*; yarn will handle installing all necessary dependencies for JS components

## MongoDB

To run the application, install MongoDB and run an instance of MongoDB on the machine running the pypcap-monitor. By default, the application searches for the instance at localhost port 27017. To reconfigure the application to search for the MongoDB instance elsewhere, see documenation on the pypcap-monitor.

[MongoDB Installation Instructions](https://docs.mongodb.com/manual/installation/)

Note:: MongoDB must be running before any other part of the application in order for the application to work.

## Pypcap-Monitor

- To set up the pypcap-monitor, run the following commands at the top level directory of the pypcap-monitor:

	- To install scapy:

	```
	pip3 install scapy
	```

	- To install pymongo

	```
	pip3 install pymongo
	```

	Note:: These commands only need to be run once on initial installation of the pypcap-monitor; they do not need to be run more than once.

- To place devices into the MongoDB instance, navigate to the pypcap-monitor directory, and run the following command:

	```
	python3 addDevices.py
	````

	Note:: If a new device is added to the list, run this command again to see the device reflected in the application. Restart the application to reflect this change.

- To place IP address mappings into the MongoDB instance, navigate to the pypcap-monitor directory and run the following command:

	```
	python3 addIPs.py
	```

	Note:: If a new IP address mapping is added to the list, run this command again to see the device reflected in the application. Restart the application to reflect this change.

- To begin capturing data, run the following command in the pypcap-monitor directory:

	```
	sh make-run.sh
	``` 

	Note:: make-run.sh uses a static path to sniff.py and to the log tracking the status of the pypcap-monitor. These values may need to be adjusted depending on the machine.

- To stop the pypcap-monitor, run the following command at the command line from any directory: 

	```
	ps ax | grep -v grep | grep pypcap-monitor/sniff.py
	```

	- This will return two pids; run the *kill* command from any directory to terminate these processes


- To choose the interface over which data is captured, specify 'iface' in the sniff() function in the *main* function of sniff.py as follows:

    ```
    sniff(iface=<interface>, prn=http_header, filter="tcp or udp", store=0)
    ```

    For example, if the name of the interface is 'eth1', the sniff() function should be implemented as follows:

    ```
    sniff(iface='eth1', prn=http_header, filter="tcp or udp", store=0)
    ```

- config.py

	Note:: To specify a specific MongoDB instance, specify the IP of the instance and then the port running the instance as follows:

	```
	MONGO_DB_ADDRESS = '<IP>:<PORT>'
	```

	In the event this is a local MongoDB instance and MongoDB has been set up to use default values, this string should be:

	```
	MONGO_DB_ADDRESS = '127.0.0.1:27017'
	```

## VizIoT/viziot-server-2

- To set up the backend/frontend of the application, run the following command at the command line in the top level directory of VizIoT and viziot-server-2 before running the application for the first time:

	```
	yarn install
	```

	Note:: This is only required for first-time setup; this command does not need to be run more than once.

- To run the backend/frontend of the application, follow these steps:

	1. Navigate to the VizIoT project directory and run the following command from the top level of the directory:

	```
	yarn run build:production
	```

	- This will place a production-build of the front-end into a folder 'dist' at the top-level of the VizIoT directory.

	- Note:: If a dist folder is not automatically added, create 'dist' at the top-level of the VizIoT directory and run the build command again.

	2. Take the 'dist' folder and place it into the top-level directory of the viziot-server-2 directory.

	3. Navigate to the top level of the viziot-server-2 directory, and run the following command:

	```
	./node_modules/.bin/forever -m 5 ./index.js >/dev/null &
	```

	Note:: To change the port the program runs on, navigate to the .env file and specify the PORT variable

- To stop the backend/frontend of the application, follow these steps:

	1. Run the following command at the command line from any directory:

	```
	ps ax | grep -v grep | grep forever
	```

	- This command will return two pids

	2. Run the *kill* command followed by the pids returned in the last step from any directory to stop the process

	3. Run the following command at the command line from any directory:

	```
	ps ax | grep -v grep | grep viziot-server-2
	```

	- this command will return one pid

	4. Run the *kill* command followed the by pid returned in the last step from any directory to stop the process

### viziot-server-2 Configuration

- To specify an instance of MongoDB to access, specify the url and port of the MongoDB instance in the .env file in the top-level directory of the viziot-server-2 backend as follows:

    ```
    MONGO_URI=mongodb://<url>:<port>/scapy
    ```

    Note:: If the MongoDB instance is local and run with default configuration values, this line should be specified as follows:

    ```
    MONGO_URI=mongodb://localhost:27017/scapy
    ```

- To specify the port on which the backend/frontend should run, specify PORT in the .env file in the viziot-server-2 top-level directory as follows:

    ```
    PORT=<port>
    ```

    For example, to run the application on port 80, specify the PORT variable in the .env file as follows:

    ```
    PORT=80
    ```