function list(arr) {
    file.forEach((e, i) => {
        console.log(`${i+1}. ${e.name} - ${e.phone}`);
    });
}