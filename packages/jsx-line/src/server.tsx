import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import { fastify } from "fastify";
import { LineService } from "./__generated__/tskaigikansai/line_pb";
import { lineService } from "./lineService";

const server = fastify();

server
  .register(fastifyConnectPlugin, {
    routes: (router) => {
      router.service(LineService, lineService);
    },
  })
  .then(() => {
    console.log("Server running at http://localhost:8080");
    server.listen({
      host: "localhost",
      port: 8080,
    });
  });
