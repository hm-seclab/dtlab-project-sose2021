# Sourcecode for secure web application setup

This sourcecode is the result of the course [IT-Sicherheit (Projektstudium)](https://zpa.cs.hm.edu/public/module/360/).	

The setup consists of the following components:

* Keycloak server as OpenID provider
* Vue.js based frontend
* express based backend (with postgresql as datastore)
* kubernetes setup including let's encrypt
* Secure communcation between backend and database using SPIFFE/SPIRE and envoy proxies

Personal/Indivdual data must be replaced inside the files. Therefore, the placeholder `yourdomain.com` must be replaced with the actual domain name.
