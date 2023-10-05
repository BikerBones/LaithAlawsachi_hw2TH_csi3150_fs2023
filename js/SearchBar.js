const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", highlightSearch);

function highlightSearch() {
  const searchQuery = searchInput.value.toLowerCase();

  const textNodes = getTextNodes(document.body);

  removeHighlights(textNodes);

  highlightText(textNodes, searchQuery);
}

function getTextNodes(element) {
  const textNodes = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  return textNodes;
}

function removeHighlights(textNodes) {
  textNodes.forEach((node) => {
    node.nodeValue = node.nodeValue.replace(
      /<span class="highlight">|<\/span>/gi,
      ""
    );
  });
}

function highlightText(textNodes, searchTerm) {
  textNodes.forEach((node) => {
    const text = node.nodeValue.toLowerCase();
    const searchIndex = text.indexOf(searchTerm);
    if (searchIndex !== -1) {
      const span = document.createElement("span");
      span.className = "highlight";
      const highlightedText = node.splitText(searchIndex);
      highlightedText.splitText(searchTerm.length);
      const highlightedClone = highlightedText.cloneNode(true);
      span.appendChild(highlightedClone);
      highlightedText.parentNode.replaceChild(span, highlightedText);
    }
  });
}
