import { getCollection } from "astro:content";
import {
  getSearchIndex,
  pagesGlobToDocuments,
  collectionToDocuments,
} from "@barnabask/astro-minisearch";

export async function get() {
  return await getSearchIndex([
    pagesGlobToDocuments(import.meta.glob(`./**/*.md*`)),
    collectionToDocuments(getCollection("scrolls"), "/articles/"),
    // collectionToDocuments(getCollection("blog"), "/blog/"),
  ]);
}