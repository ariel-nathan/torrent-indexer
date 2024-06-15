import { LEETx } from "./leetx";

async function main() {
  const leetx = new LEETx();

  try {
    const starWarsResult = await leetx.index({
      query: "star wars The empire strikes back",
      category: "movie",
    });
    console.log("Star Wars Results:", starWarsResult?.slice(0, 5));

    const mandalorianResults = await leetx.index({
      query: "The Mandalorian",
      category: "tv",
      season: 1,
      episode: 1,
    });
    console.log("The Mandalorian Results:", mandalorianResults?.slice(0, 5));
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();
