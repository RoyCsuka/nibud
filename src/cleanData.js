// export functie zorgt voor database resultaten
export async function cleanedArr(mainArr, subArr) {

    let allData =  mainArr.concat(subArr);

    console.log(allData)

    allData = prepareData(allData)

    return allData
}


// Dezen functie cleaned alle data
function prepareData(allData) {
    // mergeMainAndSub(allData)
    groupByTargetAudience(allData)

}


//Nest the data per preference (this will be our x-axis value
//Rollup data so we get averages and totals for each variable
//Note: this could also be done when visualizing the values
//    and we could make this pattern more functional by creating a mean and total function
function groupByTargetAudience(source){
    let transformed =  d3.nest()
    .key(d => d.Huishouden)
    .entries(source);
    return transformed
}
