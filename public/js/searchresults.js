function SearchResultsView(root) {
    this.results = [];
    this.root = root.toString();
}

SearchResultsView.prototype = {
    _getResultRow: function(result) {
        var add = '<div class="thin-button add"><a class="search-add-result" href onclick="return false;">+</a></div>';
        var play ='<div class="thin-button play"><a class="search-play-result" href onclick="return false;"><span class="caret caret-right"></span></a></div>';
        var actions = '<div class="search-actions">' + add + play + '</div>';
        var desc = '<div class="desc">' + result.author + " - " + result.mediaName + '</div>';
        return "<li>" + ' ' + actions + desc + "</li>";
    },
    setSearchResults: function(results) {
        this.results = results;
        var i, rows = [];
        for (i in results) {
            rows.push(this._getResultRow(results[i]));
        }
        $(this.root).html(rows.join("")).disableSelection();
    }
};

var searchResultsView = new SearchResultsView("#search-results");