var KERNEL_DATA = (function() {
    var notes = [];
    var practice = [];
    var library = [];

    return {
        notes: notes,
        practice: practice,
        library: library,
        addNote: function(item) { notes.push(item); },
        addPractice: function(item) { practice.push(item); },
        addLibrary: function(item) { library.push(item); },
        getAll: function() { return notes.concat(practice).concat(library); }
    };
})();