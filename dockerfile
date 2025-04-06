FROM mcr.microsoft.com/playwright:v1.38.1-focal
RUN apt-get -y update && apt install default-jdk -y