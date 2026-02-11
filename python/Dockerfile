FROM python:3.10

ENV FLASK_APP=app:app

WORKDIR /var/www/html/back

COPY --link . ./

RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

RUN pip3 install -r requirements.txt

COPY --link --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint

# CMD [ "python3", "-m" , "flask", "--debug", "run", "--host=0.0.0.0"]
ENTRYPOINT [ "docker-entrypoint"]