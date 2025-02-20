# Use Nginx Image to Serve Our Frontend
FROM nginx:alpine

# Copy Frontend File to the Nginx HTML Directory
COPY index.html /usr/share/nginx/html/index.html

# Expose Nginx Default HTTP Port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
