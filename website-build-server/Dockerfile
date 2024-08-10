FROM ubuntu:focal

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install git -y

WORKDIR /home/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY tsconfig.json .
COPY src ./src
COPY main.sh .

# Build TypeScript code
RUN npm run build

# Copy certificates to the services folder in the dist directory
COPY certificates/kafka.pem ./dist/services/kafka.pem

# Make main.sh executable
RUN chmod +x main.sh

# Set environment variables
# ENV NODE_ENV=production

ENTRYPOINT ["/home/app/main.sh"]