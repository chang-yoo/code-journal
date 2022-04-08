/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function storage(event) {
  var JSONData = JSON.stringify(data);
  localStorage.setItem('localData', JSONData);
});

var previousJSON = localStorage.getItem('localData');
if (previousJSON !== null) {
  data = JSON.parse(localStorage.getItem('localData'));
}
