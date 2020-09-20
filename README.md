New Things Co. - NASA API
--------------
* Written by Oliver Lillie <buggedcom@gmail.com>    
* CV - [https://www.dropbox.com/s/e60phexa2mgazty/oliver-lillie-cv-and-projects.pdf?dl=0](https://www.dropbox.com/s/e60phexa2mgazty/oliver-lillie-cv-and-projects.pdf?dl=0)
* LinkedIn - [https://linkedin.com/in/oliverlillie/](https://linkedin.com/in/oliverlillie/)
* This package - [https://www.dropbox.com/sh/rmfynjvn62kbo5b/AAAaxzTdLVmGRbIbi4Mt07LCa?dl=0](https://www.dropbox.com/sh/rmfynjvn62kbo5b/AAAaxzTdLVmGRbIbi4Mt07LCa?dl=0)

Brief
-------------
Build a simple web service that connects to the below API and shows the following data;       
• Regions with the most solar flares in 2016                                                 
• The most common class type of solar flare in 2016 (classType in the API)                   
API : NASA DONKI : https://api.nasa.gov/api.html#donkiFLR                                     

Prerequisites
-------------
Vagrant and Virtualbox are required for this demo.

* `Vagrant` - [https://www.vagrantup.com/downloads.html](https://www.vagrantup.com/downloads.html)
* `Virtualbox` - [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

Quickstart
-------------
IMPORTANT: This has sounds of explosions. Turn your volume down, or wear earphones.

```
cd ~/path/to/directory/
vagrant up server
```

Running the above command will import a vagrant box `ubuntu/xenial64`, provision, and boot the machine. It may take a few minutes to create the machine since none of the node modules required for either the backend or frontend are shipped with the distribution.  

After vagrant setup has completed you should see a box will final instructions.

However for completeness the frontend has already been built for production and the node app server will have already been started on boot of the machine.

Visit [http://192.168.33.10](http://192.168.33.10) to start.


Things to note
--------------
The UI is simple and fun, there are no interactive elements, just sit back and watch. Whilst the task only ask for information for 2016, the UI will automatically process the data all the way up to current day because it's really just a fun thing and nothing too serious.

Due to the short time frame for the task, no tests have been written as the priority was getting the working UI up and running.            

Also, thibshas only been cross browser tested for Chrome, Firefox and Safari on desktop, although should probably work on mobile devices too. IE/Edge - who knows!