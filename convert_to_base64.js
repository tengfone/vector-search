const imgFiles = readdirSync("./img");

const promises = imgFiles.map(async (imgFile) => {
  const base64 = toBase64(`./img/${imgFile}`);
  await client.data
    .creator()
    .withClass("Memes")
    .withProperties({
      image: base64,
      text: imgFile.split(".")[0].split("_").join(" "), // remove extension and replace _ with space
    })
    .do();
});
