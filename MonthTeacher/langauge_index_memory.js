function load_language_index(num_languages) {
    let val;
    try {
        val = localStorage["language_index"];
        if (val == undefined) {
            throw "error";
        }
        val = JSON.parse(val);
        if (typeof (val) != "number") {
            throw "error";
        }
        if (val >= num_languages) {
            throw "error";
        }
    } catch (error) {
        val = 0;
    }
    return val;
}

function save_language_index(language_index) {
    localStorage["language_index"] = JSON.stringify(language_index);
}