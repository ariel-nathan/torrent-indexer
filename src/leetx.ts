import axios from "axios";
import ptt from "parse-torrent-title";
import stringSimilarity from "string-similarity";
import { tabletojson } from "tabletojson";
import { unHumanizeSize } from "./lib/utils";
import {
  Source,
  type FetchParams,
  type IndexParams,
  type ParseParams,
  type Torrent,
} from "./source";

// Define LEETxTorrent type
export type LEETxTorrent = {
  name: string;
  se: string;
  le: string;
  time: string;
  "size info": string;
  uploader: string;
};

// Class for LEETx source
export class LEETx extends Source {
  constructor() {
    super("1337x", "https://1337x.to");
  }

  // Fetch torrents from LEETx
  async fetch<LEETxTorrent>(
    params: FetchParams,
  ): Promise<LEETxTorrent[] | undefined> {
    const { query, category, page = 1 } = params;

    try {
      const queryString = query.replace(" ", "%20");
      const queryCategory = category === "movie" ? "Movies" : "TV";
      const queryUrl = `${this.url}/category-search/${queryString}/${queryCategory}/${page}/`;

      const response = await axios.get(queryUrl);

      if (response.status !== 200) {
        throw new Error("Failed to fetch page");
      }

      const rawTorrents = tabletojson.convert(
        response.data,
      ) as LEETxTorrent[][];

      if (!rawTorrents || rawTorrents.length === 0) {
        return undefined;
      }

      return rawTorrents[0];
    } catch (error) {
      console.error("Error fetching torrents:", error);
      return undefined;
    }
  }

  // Parse fetched torrents
  async parse(params: ParseParams): Promise<Torrent[] | undefined> {
    const { sourceTorrents, query, category, season, episode } = params;

    if (!sourceTorrents || sourceTorrents.length === 0) {
      return undefined;
    }

    try {
      const torrents: Torrent[] = sourceTorrents
        .map((torrent: LEETxTorrent) => {
          const title = torrent.name;
          const seeds = parseInt(torrent.se);
          const leeches = parseInt(torrent.le);
          const uploaded = torrent.time;
          const size = torrent["size info"];
          const uploader = torrent.uploader;

          const parsedTorrent = ptt.parse(title);
          const similarity = stringSimilarity.compareTwoStrings(
            query,
            parsedTorrent.title,
          );

          if (
            category === "tv" &&
            (parsedTorrent.season !== season ||
              parsedTorrent.episode !== episode)
          ) {
            return null;
          }

          if (similarity < 0.5) {
            return null;
          }

          return {
            ...parsedTorrent,
            seeds,
            leeches,
            uploaded,
            size: unHumanizeSize(size),
            uploader,
            score: parseFloat(similarity.toFixed(2)),
            episode,
            season,
            source: this.name,
          };
        })
        .filter((torrent) => torrent !== null) as Torrent[];

      return torrents;
    } catch (error) {
      console.error("Error parsing torrents:", error);
      return undefined;
    }
  }

  // Index torrents
  async index(params: IndexParams): Promise<Torrent[] | undefined> {
    const {
      query,
      category,
      season,
      episode,
      page = 1,
      accumulatedTorrents = [],
    } = params;

    try {
      const sourceTorrents = (await this.fetch({
        query,
        category,
        season,
        episode,
        page,
      })) as LEETxTorrent[];
      const parsedTorrents = await this.parse({
        query,
        category,
        season,
        episode,
        sourceTorrents,
      });

      const allTorrents = accumulatedTorrents.concat(parsedTorrents || []);

      if (allTorrents.length < 5) {
        // Recursively call index if results are less than 5
        return this.index({
          query,
          category,
          season,
          episode,
          page: page + 1,
          accumulatedTorrents: allTorrents,
        });
      }

      return allTorrents;
    } catch (error) {
      console.error("Error indexing torrents:", error);
      return undefined;
    }
  }
}
