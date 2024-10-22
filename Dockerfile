# Sử dụng Node.js làm base image
FROM node:18 AS build

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Bước chạy ứng dụng
FROM nginx:alpine

# Sao chép build từ bước trước vào thư mục phục vụ của nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
