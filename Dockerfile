# Estágio de compilação
FROM node:22.11.0-slim AS build-stage

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Compila o código TypeScript
RUN npm run build

# Etapa 2: Servir aplicação
FROM nginx:alpine

# Copia apenas os arquivos essenciais do estágio de compilação para o estágio de implantação
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expõe a porta em que o servidor está ouvindo
EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]
