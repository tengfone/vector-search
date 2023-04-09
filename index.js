import weaviate from "weaviate-ts-client";
import { readdirSync, readFileSync } from "fs";

// Getting Client from Docker Compose (ResNet PyTorch)
const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const schemaRes = await client.schema.getter().do();

console.log(schemaRes);

// https://weaviate.io/developers/weaviate/configuration/schema-configuration

const schemaConfig = {
  class: "Memes",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};

// Update Vector DB Schema
// await client.schema.classCreator().withClass(schemaConfig).do();

// Convert Images to Base64
const imgFiles = readdirSync("./img");

const promises = imgFiles.map(async (imgFile) => {
  const byteFile = readFileSync(`./img/${imgFile}`);
  const base64 = Buffer.from(byteFile).toString("base64");

  // Add to vector Database
  await client.data
    .creator()
    .withClassName("Memes")
    .withProperties({
      image: base64,
      text: imgFile.split(".")[0], // Name of file
    })
    .do();
});

await Promise.all(promises);
