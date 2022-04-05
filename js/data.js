/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function storage(event) {
  var JSONData = JSON.stringify(data);
  localStorage.setItem('data', JSONData);
});
