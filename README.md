# Vidispine Job Tool

**Requirements**

- A World Wide Web server
- A World Wide Web browser

**Functions**

1. View pages of Vidispine jobs.
2. View information on an individual Vidispine job.

**Installation and Set Up**

1. Install the supplied files in the route of your Web server. Make sure the permissions are correct for the Web server to be able to read them.
2. Make sure the Web server is configured to pass all requests to index.html. On Nginx you can do this by placing a line like 'try_files $uri /index.html;' at the bottom of the location block of the configuration file.
3. At the moment the Vidispine host, username, and password are hardcoded into VidispineJobTool.jsx and JobPage.jsx. If the defaults are not suitable you will need to change these with an editor and save them.
4. Access your Web server with your Web browser. If everything is working you should see the job list page.

**Notes**

Please note this software is early in development and may not work as expected.
