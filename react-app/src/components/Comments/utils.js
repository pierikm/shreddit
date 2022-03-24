export const countToStr = (count) => {
    if(count === 1) return "one";
    else if(count % 2 === 1) return "odd";
    else return "even";
}
