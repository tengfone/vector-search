import weaviate from "weaviate-ts-client";
import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Test Case? (1-6):", async (answer) => {
  console.log(`Test Case: ${answer}`);
  const testFile = Buffer.from(
    readFileSync(`./test/test${answer}.jpg`)
  ).toString("base64");

  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080",
  });

  const resImage = await client.graphql
    .get()
    .withClassName("Memes")
    .withFields(["image"])
    .withNearImage({
      image: testFile,
    })
    .withLimit(1)
    .do();

  const result = resImage.data.Get.Memes[0].image;
  writeFileSync("./result.jpg", result, "base64");
  readline.close();
});
