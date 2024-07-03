import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Task:- Node.js Express TypeScript Sequelize API Client Task',
    description: 'API Documentation for Node.js Express TypeScript Sequelize project Client Task',
  },
  host: '45.59.167.43:5353',
  basePath: '/api',
  schemes: ['http'],
  tags: [],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "authorization", // name of the header, query parameter or cookie
      description: "JWT authorization token in the format 'Bearer {token}'",
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
