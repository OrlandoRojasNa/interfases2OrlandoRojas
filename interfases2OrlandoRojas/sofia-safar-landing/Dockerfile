# Etapa 1: Construcción
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor Nginx para el despliegue
FROM nginx:alpine
# Ajusta 'interfases2-orlando-rojas' al nombre exacto en tu folder dist/
COPY --from=build /app/dist/sofia-safar-landing /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80