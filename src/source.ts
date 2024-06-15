import type { DefaultParserResult } from "parse-torrent-title";

// Define the Torrent interface extending DefaultParserResult
export interface Torrent extends DefaultParserResult {
  title: string;
  seeds: number;
  leeches: number;
  uploaded: string;
  size: number;
  uploader: string;
  score: number;
  episode?: number;
  season?: number;
  source: string;
}

// Define the Category type
export type Category = "movie" | "tv";

// Define FetchParams type
export type FetchParams = {
  query: string;
  category: Category;
  episode?: number;
  season?: number;
  page?: number;
};

// Define ParseParams type
export type ParseParams = {
  query: string;
  category: Category;
  sourceTorrents: any[];
  episode?: number;
  season?: number;
};

// Define IndexParams type
export type IndexParams = {
  query: string;
  category: Category;
  episode?: number;
  season?: number;
  page?: number;
  accumulatedTorrents?: Torrent[];
};

// Base class for sources
export class Source {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  // Fetch method to be overridden by subclasses
  async fetch<T>(params: FetchParams): Promise<T[] | undefined> {
    throw new Error("Fetch method not implemented");
  }

  // Parse method to be overridden by subclasses
  async parse(params: ParseParams): Promise<Torrent[] | undefined> {
    throw new Error("Parse method not implemented");
  }

  // Index method to be overridden by subclasses
  async index(params: IndexParams): Promise<Torrent[] | undefined> {
    throw new Error("Index method not implemented");
  }
}
