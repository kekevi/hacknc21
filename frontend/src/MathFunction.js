import React from "react";

function getPercentages(current, initial, paid) {
    let num = [];
    let paid2 = paid * 10;

    num[0] = parseInt((100 * (initial - current + paid2) / (initial)));
    num[1] = parseInt(100 * (paid2) / (initial - current + paid2));
    num[2] = parseInt(current)

    return num;
}

function getSpent(current) {
    let sum = current.reduce((a, b) => a + b, 0);



    let spent = [];

    for (let i = 0; i < current.length; i++) {

        let val = parseInt(100 * (current[i] / sum))

        if (val == 0) {
            continue;
        } else { spent[i] = parseInt(100 * (current[i] / sum)) }


    }
    return spent;

}

export { getPercentages, getSpent };