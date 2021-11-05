let date = new Date()


const dayFinder = (d) => {
    let num = d.toString().split(" ")[2]

    if (num[0] === "0") {
        return +num[1]
    } else {
        return +num
    }
};

console.log(dayFinder(date))
