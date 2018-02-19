var observer = new MutationObserver(function (mutations) {

    var findAndClick = function (node, selector) {
        var matchedNode = node.querySelector(selector);
        if (matchedNode) {
            matchedNode.click();
            return true;
        }
        return false;
    }

    var findAndClickDifferentElements = function (node, identifierSelector, clickSelector) {
        var autoPlayPresent = node.querySelector(identifierSelector);
        if (autoPlayPresent) {
            return findAndClick(node, clickSelector);
        }
        return false;
    }

    mutations.forEach(function (mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            if (node && node instanceof Element) {

                var matched = findAndClick(node, '[aria-label="Skip Intro"]');

                if (!matched) {
                    matched = findAndClickDifferentElements(node, '.WatchNext-autoplay', '.PlayIcon-size-medium')
                    if (!matched) {
                        matched = findAndClick(node, '[aria-label ^= "Next episode in"]');
                        console.log(matched);
                    }
                }
            }
        }
    })
});
observer.observe(document, { childList: true, subtree: true });
