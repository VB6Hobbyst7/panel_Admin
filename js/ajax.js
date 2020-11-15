//manejo de jquery y ajax para inicio de sesion
$('#formLogin').submit(function(e) {
    e.preventDefault();
    var usuario = $.trim($('#usuario').val());
    var password = $.trim($('#password').val());
    if (usuario.length == "" || password.length == "") {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ingresa un usuario y contraseña',
            showConfirmButton: false,
            timer: 2000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });

    } else {
        $.ajax({
            type: "POST",
            url: "db/login.php",
            datatype: "json",
            data: { usuario: usuario, password: password },
            success: function(data) {
                if (data == -1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'El usuario y/o contraseña no son correctos',
                        showConfirmButton: false,
                        timer: 2000,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Conexión Exitosa',
                        showConfirmButton: false,
                        timer: 2000,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false
                    }).then((result) => {
                        window.location.href = "panel_admin/";


                    })

                }
            }
        });
    }
});

//recuperacion de usuario y contraseña
$('#formRecuperar').submit(function(e) {
    e.preventDefault();
    var correo = $.trim($('#correo').val());
    if (correo.length == "") {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No has ingresado ningún correo',
            showConfirmButton: false,
            timer: 2000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });

    } else {
        $.ajax({
            type: "POST",
            url: "db/loginRecuperar.php",
            datatype: "json",
            data: { correo: correo },
            success: function(data) {
                if (data == -1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'El correo digitado no está en la base de datos',
                        showConfirmButton: false,
                        timer: 2000,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha enviado el usuario y contraseña al correo ' + correo,
                        showConfirmButton: false,
                        timer: 3000,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false
                    }).then((result) => {
                        window.location.href = "index.php";


                    })

                }
            }
        });
    }
});