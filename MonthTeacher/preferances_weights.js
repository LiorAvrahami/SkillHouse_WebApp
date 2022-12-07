function load_weights() {
    try {
        val = JSON.parse(localStorage["weights"]);
        if (val == undefined || val.length != 12) {
            throw "error"
        }
    } catch (error) {
        val = [1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1];
    }
    return val;
}

function save_weights(weights) {
    let old_sum = sum(weights);
    let new_sum = 1200;

    for (let index = 0; index < weights.length; index++) {
        weights[index] = weights[index] * new_sum / old_sum;
    }

    localStorage["weights"] = JSON.stringify(weights);
}

function reset_memory(){
    localStorage["weights"] = NaN;
}