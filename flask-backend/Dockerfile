FROM python:3.9.5-slim

WORKDIR /server
RUN apt-get update \
&& apt-get install gcc -y \
&& apt-get clean
COPY requirements.txt requirements.txt
RUN pip install wheel pep517 && pip install -r requirements.txt

COPY . .

CMD ["python", "run.py"]
