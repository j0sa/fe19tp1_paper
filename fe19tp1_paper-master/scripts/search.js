(function(document) {
  "use strict";

  let tableFilter = (function(Arr) {
    let _input;

    function _onInputEvent(e) {
      _input = e.target;
      let tables = document.getElementsByClassName(
        _input.getAttribute("data-table")
      );
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      let text = row.textContent.toLowerCase(),
        val = _input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? "none" : "table-row";
    }

    return {
      init: function() {
        let inputs = document.getElementsByClassName("search-bar");
        Arr.forEach.call(inputs, function(input) {
          input.oninput = _onInputEvent;
        });
      }
    };
  })(Array.prototype);

  document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
      tableFilter.init();
    }
  });
  
})(document);