const perfTest = (name: string, method: { apply: () => void; }) => {
    console.time(`Method - ${name}`);
    method.apply();
    console.timeEnd(`Method - ${name}`);
}