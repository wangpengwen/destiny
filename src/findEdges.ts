import fs from "fs";

const importRegex = /(?:from\s+|require\()["']((?:\.|\.\.)\/.+)["']/gm;

export function findEdges(filePath: string) {
  const text = fs.readFileSync(filePath).toString();
  const edges: Array<[string, string]> = [];
  let m;
  while ((m = importRegex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === importRegex.lastIndex) {
      importRegex.lastIndex++;
    }
    edges.push([filePath, m[1]]);
  }
  return edges;
}
