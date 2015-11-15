Template['searchBar'].helpers({
});

Template['searchBar'].events({
});

var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ['packageName', 'description'];

PackageSearch = new SearchSource('packages', fields, options);