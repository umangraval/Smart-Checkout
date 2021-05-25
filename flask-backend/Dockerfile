FROM python:3.9.5-slim

WORKDIR /app
RUN apt-get update \
&& apt-get install gcc -y \
&& apt-get clean
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0", "--port=8123"]
