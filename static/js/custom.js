// add anchors to headings from H2 to H6 on the content area, using AnchorJS (https://github.com/bryanbraun/anchorjs)
function addAnchorTags() {
    anchors.options = {
        visible: 'touch'
    }

    anchors.add('#docsContent h2, #docsContent h3, #docsContent h4, #docsContent h5, #docsContent h6');
}

$(function() {
    addAnchorTags();
});