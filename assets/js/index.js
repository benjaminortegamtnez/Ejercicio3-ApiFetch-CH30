const btnApiFetch = document.getElementById("btnApiFetch");
const btnReset = document.getElementById("btnReset");
const dataContainer = document.getElementById("data");

btnReset.disabled = true;

const cacheTime = 60000; 

btnApiFetch.onclick = async () => {
    try {
        const savedUserData = localStorage.getItem("userData");
        const savedTime = localStorage.getItem("userDataTime");
        const currentTime = new Date().getTime();

        btnApiFetch.disabled = true;
        btnReset.disabled = false;

        if (savedUserData && savedTime) {
            if (currentTime - Number(savedTime) < cacheTime) {
                const parsedData = JSON.parse(savedUserData);
                showData(parsedData);
                return;
            }
        }

        const responseJson = await fetch("https://reqres.in/api/users?delay=3");
        const response = await responseJson.json();
        console.log(response);
        showData(response.data);

        localStorage.setItem("userData", JSON.stringify(response.data));
        localStorage.setItem("userDataTime", currentTime.toString());
    } catch (error) {
        alert("Se produjo un error.");
    }
};

const showData = (data) => {
    let body = '';
    for (const user of data) {
        body += `<tr class="tableData">
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td><img src="${user.avatar}" alt="Avatar" class="imgRedonda" /></td>
                </tr>`;
    }
    dataContainer.innerHTML = body;
};

btnReset.onclick = () => {
    dataContainer.innerHTML = '';
    btnApiFetch.disabled = false;
    btnReset.disabled = true;
};
