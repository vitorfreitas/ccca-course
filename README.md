# ccca-course
Clean Code and Code Architecture Course

## Running

1. `docker-compose up -d`
2. Get your container pid with `docker ps`
3. `docker exec -it [container_pid] bash`
4. `psql postgres -h 127.0.0.1 -d postgres -f dump.sql`
