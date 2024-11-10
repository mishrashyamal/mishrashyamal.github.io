# Use the official NGINX image as a base image
FROM nginx:alpine

# Copy the contents of the 'website' directory to the default NGINX web directory
COPY website /usr/share/nginx/html

# Expose port 80 to access the website
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
