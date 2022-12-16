fetch("http://localhost:3000/minions")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    });