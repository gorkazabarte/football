FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ../api ./

COPY ../db ./

COPY . ./

CMD ["university.handler"]

