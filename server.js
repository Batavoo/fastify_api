const fastify = require("fastify");
const crypto = require("crypto");

const server = fastify();

const courses = [
  { id: "1", title: "Curso de Node.js" },
  { id: "2", title: "Curso de React" },
  { id: "3", title: "Curso de React Native" },
];

server.get("/courses", () => {
  return { courses };
});

server.get("/courses/:id", (request, response) => {
  const { id } = request.params;

  const course = courses.find((course) => course.id === id);

  if (course) {
    return { course };
  }

  return response.status(404).send();
});

server.post("/courses", (request, response) => {
  const courseId = crypto.randomUUID();
  const { title } = request.body;

  if (!title) {
    return response.status(400).send({ message: "Título obrigatório." });
  }

  courses.push({ id: courseId, title: title });

  return response.status(201).send({ courseId });
});

server.delete("/courses/:id", (request, response) => {
  const { id } = request.params;

  const course = courses.find((course) => course.id === id);

  // Fazer a lógica para deletar o item do array

  if (course) {
    return { course };
  }

  return response.status(404).send();
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
