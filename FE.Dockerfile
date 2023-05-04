# Sử dụng base image là Node.js
FROM node:14-alpine

# Tạo thư mục app và set nó làm working directory
WORKDIR /app

# Copy tất cả các file package.json và package-lock.json vào thư mục app
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ source code vào trong container
COPY . .

# Serve ứng dụng trên port 80
EXPOSE 80
CMD [ "npm", "run", "dev" ]