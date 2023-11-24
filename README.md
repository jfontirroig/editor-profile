# Installation Guide and use of the application

## AMBIENTE DESARROLLO

### CREAR BUILD

```   
cd  /home/jfontirroig/pact/editor-profile
sudo npm install
sudo npm run build
sudo chmod 777 -R /home/jfontirroig/pact/editor-profile/build
copiar /home/jfontirroig/pact/editor-profile/build/*.* a directorio /srv/editorprofile/build  en servidor de producción
```

## DEPLOY 

```
cd /srv/editorprofile/build
sudo rm -rf /var/www/html

cd /var/www/html
cd ..
sudo mkdir html
cd html

cd /srv/editorprofile/build
sudo cp -r * /var/www/html

cd /var/www/html
sudo systemctl restart nginx
```

###  Verify the deployment by navigating to your server address in your preferred browser.

```
  https://profile.xck.app
```

## Certificado para profile editor

```
  sudo certbot --nginx -d profile.xck.app
  Generated certificated will be available under /etc/letsencrypt/live/profile.xck.app/
  /etc/letsencrypt/live/profile.xck.app/fullchain.pem
  /etc/letsencrypt/live/profile.xck.app/privkey.pem
```

## NGINX

```
sudo apt-get update
sudo apt-get install nginx
sudo ufw allow 'Nginx Full'
```


### sudo nano /etc/nginx/sites-available/default

Default server configuration

  server {
            listen [::]:443 ssl ipv6only=on; # managed by Certbot
            listen 443 ssl; # managed by Certbot
            ssl_certificate /etc/letsencrypt/live/profile.xck.app/fullchain.pem; # managed by Certbot
            ssl_certificate_key /etc/letsencrypt/live/profile.xck.app/privkey.pem; # managed by Certbot
            include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
            ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
            if ($host = www.profile.xck.app) {
                return 301 https://profile.xck.app$request_uri;
            } # managed by Certbot
            server_name profile.xck.app;
            root /var/www/editorprofile/html;
            index index.html index.htm index.nginx-debian.html;
            location / {
            try_files $uri $uri/ =404;
                add_header 'Access-Control-Allow-Origin' '*' always;
            }
  }

  server {
         if ($host = domains.paradigma.global) {
            return 301 https://$host$request_uri;
         } # managed by Certbot
         listen 80 ;
         listen [::]:80 ;
         server_name domains.paradigma.global;
         return 404; # managed by Certbot
  }


License
MIT
