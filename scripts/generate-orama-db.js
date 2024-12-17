import { create, insertMultiple, save as saveOramaDB } from "@orama/orama";
import fs from "fs";
import path from "path";

const scrollsData = JSON.parse(fs.readFileSync("./src/data/scrolls_master_list.json"));

function ensureUniqueIds(data) {
  const seenIds = new Set();
  data.forEach((item, index) => {
    if (seenIds.has(item.id)) {
      console.log(`Duplicate ID ${item.id} found. Modifying it to be unique.`);
      item.id = `${item.id}-${index}`;
    }
    seenIds.add(item.id);
  });
  return data;
}

function addBooleanFields(data) {
  data.forEach((item) => {
    item.has_images = item.online_images ? true : false;
  });
  return data;
}

const schema = {
  id: "string",
  type: "enum",
  repository: "enum",
  repository_city: "enum",
  repository_nation: "enum",
  repository_name_and_city: "string",
  lib_latitude: "string",
  lib_longitude: "string",
  shelfmark: "string",
  date_start: "string",
  date_end: "string",
  date_quality: "enum",
  provenance: "string",
  provenance_quality: "string",
  provenance_latitude: "string",
  provenance_longitude: "string",
  length: "string",
  width: "string",
  number_of_pieces: "string",
  orientation: "string",
  completed: "string",
  language_1: "enum",
  language_2: "enum",
  contents: "string",
  description: "string",
  bibliography: "string",
  editor_initials: "string",
  online_images: "string",
  has_images: "boolean",
  online_bibliography_record: "string",
  wp_type: "string",
  wp_id: "string",
  meta_title: "string",
  slug: "string",
}

async function generateDatabase() {
  const db = create({
    schema,
    components: {
      tokenizer: {
        stemming: true,
        stemmerSkipProperties: [
          "repository",
          "repository_city",
          "repository_nation",
          "type",
          "language_1",
          "language_2",
        ],
      },
    },
  });
  const uniqueData = ensureUniqueIds(scrollsData);
  const data = addBooleanFields(uniqueData);
  await insertMultiple(db, data);

  const outputDir = path.resolve("dist/assets");
  const outputPath = path.join(outputDir, "oramaDB_scrolls.json");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const dbSnapshot = saveOramaDB(db);
  fs.writeFileSync(outputPath, JSON.stringify(dbSnapshot), { encoding: "utf-8" });

  console.log("Orama database generated and saved to", outputPath);
}

export { generateDatabase };
