FROM node:18

ARG service_account_key_url
ARG gh_token
ARG stadia_key

RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV SERVICE_ACCOUNT_KEY_URL=$service_account_key_url
ENV GH_TOKEN=$gh_token
ENV NEXT_PUBLIC_STADIA_KEY=$stadia_key

RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]
