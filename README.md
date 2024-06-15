# Torrent Indexer

**Torrent Indexer** is a tool designed to index torrents from various sources, making it easy to search for and find torrents for movies, TV shows, and more. This project leverages `bun`, a fast all-in-one JavaScript runtime, for efficient development and execution.

## Features

- **Multi-source Indexing:** Index torrents from various sources.
- **Search Functionality:** Easily search for movies and TV shows.
- **Lightweight and Fast:** Designed for quick performance.

## Getting Started

### Prerequisites

Ensure you have `bun` installed on your system. Follow the instructions on the [official Bun website](https://bun.sh) to install it.

### Installation

Clone the repository:

```bash
git clone https://github.com/ariel-nathan/torrent-indexer.git
```

Navigate to the project directory and install dependencies:

```bash
cd torrent-indexer
bun install
```

### Usage

To start the project, run:

```bash
bun start
```

For development, you can run the project in watch mode with:

```bash
bun dev
```

## Built With

- [Bun](https://bun.sh) - The JavaScript runtime used
- [Axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Cheerio](https://cheerio.js.org/) - Fast, flexible, and lean implementation of core jQuery designed specifically for the server
- [Parse Torrent Title](https://github.com/clement-escolano/parse-torrent-title) - A utility to parse torrent titles
- [String Similarity](https://github.com/aceakash/string-similarity) - A library to find similarity between strings
- [Tabletojson](https://github.com/maugenst/tabletojson) - Converts HTML tables to JSON

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE.txt](./LICENSE.txt) file for details.
