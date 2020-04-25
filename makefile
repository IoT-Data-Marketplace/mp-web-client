build-and-push-to-ecr:
	aws ecr get-login-password --region eu-central-1 --profile mp-ops | docker login --username AWS --password-stdin 543164192837.dkr.ecr.eu-central-1.amazonaws.com/mp-web-client
	docker build -t mp-web-client .
	docker tag mp-web-client:latest 543164192837.dkr.ecr.eu-central-1.amazonaws.com/mp-web-client:latest
	docker push 543164192837.dkr.ecr.eu-central-1.amazonaws.com/mp-web-client:latest
