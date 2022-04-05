$(document).ready(function () {
    $("form:first").submit(async (e) => {
        e.preventDefault();
        let email = $("form:first input:first").val();
        let password = $("form:first input:last").val();
        const { data } = await axios.post("http://localhost:3000/usuario", {
            email,
            password,
        });
        $("#creado").removeClass("d-none");
        getUsuarios();
    });

    $("form:last").submit(async (e) => {
        e.preventDefault();
        let email = $("form:last input:first").val();
        let password = $("form:last input:last").val();
        try {
            const { data } = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });
            if (data.rowCount == 1) {
                $("#User").addClass("d-none");
                $("#user").removeClass("d-none");
            } else {
                $("#user").addClass("d-none");
                $("#User").removeClass("d-none");
            }
        } catch (e) {
            $("#user").addClass("d-none");
            $("#User").removeClass("d-none");
        }
    });
});

async function getUsuarios() {
    const { data } = await axios.get("http://localhost:3000/usuarios");
    $("tbody").html("");
    $.each(data, (i, u) => {
        $("tbody").append(`
                <tr>
                    <td>${u.email}</td>
                    <td>${u.password}</td>
                </tr>
    `);
    });
}
getUsuarios();