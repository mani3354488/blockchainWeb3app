const {
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  existsSync,
  mkdirSync,
} = require("fs");
const sharp = require("sharp");

const template = `
    <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- bg -->
        <!-- leftEye -->
        <!-- rightEye -->
        <!-- mouth -->
        <!-- element -->
    </svg>
`;

const takenNames = {};
const takenFaces = {};
let idx = 50;

function randInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomName() {
  const adjectives =
    "fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical".split(
      " "
    );
  const names =
    "aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis".split(
      " "
    );

  const randAdj = randElement(adjectives);
  const randName = randElement(names);
  const name = `${randAdj}-${randName}`;

  if (takenNames[name] || !name) {
    return getRandomName();
  } else {
    takenNames[name] = name;
    return name;
  }
}

function getLayer(name, skip = 0.0) {
  const svg = readFileSync(`./layers/${name}.svg`, "utf-8");
  const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g;
  const layer = svg.match(re)[0];
  return Math.random() > skip ? layer : "";
}

async function svgToPng(name) {
  const src = `./out/${name}.svg`;
  const dest = `./out/${name}.png`;

  const img = await sharp(src);
  const resized = await img.resize(1024);
  await resized.toFile(dest);
}

function createImage(idx) {
  const bg = randInt(3);
  const leftEye = randInt(3);
  const rightEye = randInt(3);
  const mouth = randInt(3);
  const element = randInt(6);

  const face = [leftEye, rightEye, mouth, element].join("");

  if (face[takenFaces]) {
    createImage();
  } else {
    const name = getRandomName();
    console.log(name);
    face[takenFaces] = face;

    const final = template
      .replace("<!-- bg -->", getLayer(`bg${bg}`))
      .replace("<!-- leftEye -->", getLayer(`leftEye${leftEye}`))
      .replace("<!-- rightEye -->", getLayer(`rightEye${rightEye}`))
      .replace("<!-- mouth -->", getLayer(`mouth${mouth}`))
      .replace("<!-- element -->", getLayer(`element${element}`), 0.5);

    const meta = {
      name,
      description: `A drawing of ${name.split("-").join(" ")}`,
      image: `ipfs://YOUR_ASSET_CDI`,
      attributes: [
        {
          element: "",
          rarity: 0.5,
        },
      ],
    };
    writeFileSync(`./out/${idx}.json`, JSON.stringify(meta));
    writeFileSync(`./out/${idx}.svg`, final);
    svgToPng(idx);
  }
}

// Create dir if not exists
if (!existsSync("./out")) {
  mkdirSync("./out");
}

// Cleanup dir before each run
readdirSync("./out").forEach((f) => rmSync(`./out/${f}`));

do {
  createImage(idx);
  idx--;
} while (idx >= 0);
