FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . ./

WORKDIR ./coach

CMD ["coach.handler"]

