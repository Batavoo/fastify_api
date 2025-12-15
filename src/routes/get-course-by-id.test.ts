import { expect, test } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";

test("get a course by it's id", async () => {
  await server.ready();

  const course = await makeCourse();

  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 for non existing courses", async () => {
  await server.ready();

  const response = await request(server.server).get(
    `/courses/04bbd921-d24d-48c4-a9c0-145cfbcc1fc0`
  );

  expect(response.status).toEqual(404);
});
