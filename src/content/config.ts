// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
// const scrollsCollection = defineCollection({
const scrolls = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string().optional(),
        wp_id: z.string().optional(),
        meta_title: z.string(),
        wp_slug: z.string(),
        type: z.string().optional(),
        repository_city: z.string().optional(),
        repository_nation: z.string().optional(),
        repository_name_and_city: z.string().optional(),
        shelfmark: z.string().optional(),
        language_1: z.string().optional(),
        language_2: z.string().optional(),
        // date_start: z.date(),
        // date_end: z.date(),
        date_start: z.string().optional(),
        date_end: z.string().optional(),
        date_quality: z.string().optional(),
        provenance: z.string().optional(),
        provenance_quality: z.string().optional(),
        number_of_pieces: z.string().optional(),
        orientation: z.string().optional(),
        // completed: z.boolean(),
        completed: z.string().optional(),
        languages: z.string().optional(), // array of strings?
        notes: z.string().optional(),
        editorial_notes: z.string().optional(),
        length: z.string().optional(),
        width: z.string().optional(),
        bibliography: z.string().optional(), // references? 
        online_images: z.string().optional(),
        online_bibliography_record: z.string().optional(),
        lib_city: z.string().optional(),
        lib_nat: z.string().optional(),
        lib_lat: z.string().optional(),
        lib_lon: z.string().optional(),
        prov_lat: z.string().optional(),
        prov_lon: z.string().optional(),
        contents: z.string().optional(),
        description: z.string().optional(),
        mirador_viewer_link: z.string().optional(),
        _scrolls_id: z.string().optional(),
    })
});
// const postsCollection = defineCollection({
//     type: 'content',
//     schema: z.object({
//       title: z.string(),
//       pubDate: z.date(),
//       description: z.string(),
//       author: z.string(),
//       image: z.object({
//         url: z.string(),
//         alt: z.string()
//       }),
//       tags: z.array(z.string())
//     })
// });

// Export a single `collections` object to register your collection(s)
// export const collections = {
// //   posts: postsCollection,
//     scrolls: scrollsCollection
// };
export const collections = { scrolls }