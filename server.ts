import fastify from "fastify";
import crypto from "node:crypto";

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
});

const courses = [
  { id: "1", title: "Curso de Node.js" },
  { id: "2", title: "Curso de React" },
  { id: "3", title: "Curso de React Native" },
];

server.get("/courses", () => {
  return { courses };
});

server.get("/courses/:id", (request, response) => {
  const { id } = request.params as { id: string };

  const course = courses.find((course) => course.id === id);

  if (course) {
    return { course };
  }

  return response.status(404).send();
});

server.post("/courses", (request, response) => {
  const courseId = crypto.randomUUID();
  const { title } = request.body as { title: string };

  if (!title) {
    return response.status(400).send({ message: "Título obrigatório." });
  }

  courses.push({ id: courseId, title: title });

  return response.status(201).send({ courseId });
});

server.delete("/courses/:id", (request, response) => {
  const { id } = request.params as { id: string };

  const courseIndex = courses.findIndex((course) => course.id === id);

  if (courseIndex !== -1) {
    courses.splice(courseIndex, 1);
    return response.status(204).send();
  }

  return response.status(404).send();
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
