import { getRandomInt } from "./utils/getRandomInt";

const collectTextNodes = (): Node[] => {
  const textNodes: Node[] = [];
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );
  let currentNode = treeWalker.nextNode();
  while (currentNode !== null) {
    if (!(currentNode.parentNode as HTMLElement)?.id.includes("service-")) {
      textNodes.push(currentNode);
    }
    currentNode = treeWalker.nextNode();
  }
  return textNodes;
};

const messUpWords = (
  textNodes: Node[],
  wordsInTextNodes: Array<Array<{ length: number; position: number }>>
) => {
  for (let i = 0; i < textNodes.length; i++) {
    const node = textNodes[i];
    for (let j = 0; j < wordsInTextNodes[i].length; j++) {
      if (Math.random() > 1 / 10) {
        continue;
      }
      const wordMeta = wordsInTextNodes[i][j];
      if (node.nodeValue) {
        const word = node.nodeValue.slice(
          wordMeta.position,
          wordMeta.position + wordMeta.length
        );
        const before = node.nodeValue.slice(0, wordMeta.position);
        const after = node.nodeValue.slice(wordMeta.position + wordMeta.length);
        node.nodeValue = before + messUpWord(word) + after;
      }
    }
  }
};

const messUpWord = (word: string) => {
  if (word.length < 3) {
    return word;
  }
  return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
};

const messUpMessyPart = (messyPart: string) => {
  if (messyPart.length < 2) {
    return messyPart;
  }
  let a: number = 0;
  let b: number = 0;
  while (!(a < b)) {
    a = getRandomInt(0, messyPart.length - 1);
    b = getRandomInt(0, messyPart.length - 1);
  }
  return (
    messyPart.slice(0, a) +
    messyPart[b] +
    messyPart.slice(a + 1, b) +
    messyPart[a] +
    messyPart.slice(b + 1)
  );
};

export const simulateDyslexia = () => {
  const intervalId = setInterval(() => {
    const textNodes = collectTextNodes();

    const wordsInTextNodes: Array<Array<{ length: number; position: number }>> =
      [];

    for (const node of textNodes) {
      const words = [];
      const re = /\w+/g;
      let match;
      while ((match = re.exec(node.nodeValue || "")) != null) {
        const word = match[0];
        const position = match.index;
        words.push({
          length: word.length,
          position: position,
        });
      }
      wordsInTextNodes.push(words);
    }
    messUpWords(textNodes, wordsInTextNodes);
  }, 100);

  return () => clearInterval(intervalId);
};
