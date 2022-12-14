function load_weights() {
    let val;
    try {
        val = localStorage["weights"];
        if (val == undefined) {
            throw "error";
        }
        val = JSON.parse(val);
        if (val.length != 12) {
            throw "error";
        }
    } catch (error) {
        val = [1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1];
    }
    return val;
}

function save_weights(weights) {

    weights = normalize_weights(weights);
    localStorage["weights"] = JSON.stringify(weights);
}

function reset_memory() {
    localStorage["weights"] = NaN;
}

function normalize_weights(weights) {
    let old_sum = sum(weights);
    let new_sum = 1;

    for (let index = 0; index < weights.length; index++) {
        weights[index] = weights[index] * new_sum / old_sum;
    }

    return weights;
}