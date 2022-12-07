function sum(array) {

    let val = 0;
    for (let index = 0; index < array.length; index++) {
        val += array[index];
    }
    return val;
}

function random_choice(weights) {
    let total_weights = sum(weights);

    let r_val = Math.random() * total_weights;
    for (let index = 0; index < weights.length; index++) {
        r_val -= weights[index];
        if (r_val <= 0) {
            return index;
        }
    }
}