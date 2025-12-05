import { fastifySwagger } from "@fastify/swagger";
import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCoursesRoute } from "./src/routes/get-courses.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import scalarAPIReference from "@scalar/fastify-api-reference";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Desafio Node.js",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  });
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(createCourseRoute);
server.register(getCourseByIdRoute);
server.register(getCoursesRoute);

// server.delete("/courses/:id", (request, response) => {
//   const { id } = request.params as { id: string };

//   const courseIndex = courses.findIndex((course) => course.id === id);

//   if (courseIndex !== -1) {
//     courses.splice(courseIndex, 1);
//     return response.status(204).send();
//   }

//   return response.status(404).send();
// });

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
