const queueOneJobOne = async (message: any) => {
    console.log("\n~queueOneJobOne~");
    console.log("message processed successfully", message);
}

const queueOneJobTwo = async (message: any) => {
    console.log("\n~queueOneJobTwo~");
    console.log("message processed successfully", message);
}

const queueTwoJobOne = async (message: any) => {
    console.log("\n~queueTwoJobOne~");
    console.log("message processed successfully", message);
}

const queueTwoJobTwo = async (message: any) => {
    console.log("\n~queueTwoJobTwo~");
    console.log("message processed successfully", message);
}


export {
    queueOneJobOne,
    queueOneJobTwo,
    queueTwoJobOne,
    queueTwoJobTwo
}