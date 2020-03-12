# Web-Workers
PA1445 Bachelor’s Thesis in Software Engineering

# Docker
### To only view
- `docker build -t my-apache2 .`
- `docker run -p 8080:80 my-apache2`
- visit [localhost:8080](http://localhost:8080)

### To edit content inside container with a volume
- `docker build -t my-apache2 .`
- `docker run -p 8080:80 -v /absolute/path/to/public/:/usr/local/apache2/htdocs/ my-apache2`
- visit [localhost:8080](http://localhost:8080)
