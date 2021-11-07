import React from "react";

function getPercentages(current, initial, paid) {
    let num = [];
    let paid2 = paid*10;

    num[0] = parseInt((100 * (initial - current + paid2) / (initial)));
    num[1] = parseInt(100 * (paid2) / (initial - current + paid2));

    return num;
}

export { getPercentages };