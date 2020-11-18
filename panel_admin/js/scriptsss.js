//ocultar el sidebar
(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if (this.href === path) {
            $(this).addClass("active");
        }
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

// Validar formularios
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
//agregar pedido
function agregarPedido() {
    $.ajax({
        type: "POST",
        url: "php/agregarPedido.php",
        data: $("#formIngresoPedido").serialize(),
        success: function(r) {
            if (r == 1) {
                alertify.success("Pedido Ingresado Correctamente");
            } else {
                alertify.error("Error al ingresar el pedido");
            }
        }
    });
}
//alerta al cancelar modal
$('.salirModal').click(function() {
    alertify.warning("Se Canceló Proceso");
});

//ingresar datos a formulario editar pedido
function formEditarPedido(datos) {
    d = datos.split('||');
    $('.idPedidoEditar').val(d[0]);
    $('.nroPedidoEditar').val(d[1]);
    $('.clienteEdit').val(d[2]);
    $('.asesorEdit').val(d[3]);
    $('.inicioEditar').val(d[4]);
    $('.finEditar').val(d[5]);
    $('.undsEditar').val(d[7]);
    $('.procesosEditar').val(d[6]);
    $('.diasEditar').val(d[8]);
    $('.idProcesosEditar').val(d[9]);

}

//Editar Pedido
function editarPedido() {

    $.ajax({
        type: "POST",
        url: "php/editarPedido.php",
        data: $("#formEditarPedido").serialize(),
        datatype: "json",
        success: function(r) {
            if (r == 1) {
                $('#mostrarTabla').load('tablas/tablaPedido.php');
                alertify.success("Pedido Editado Correctamente");
            } else {
                alertify.error('Error al Editar Pedido');
            }
        }
    });
}
//Editar Proceso Pedido
function editarProceso() {
    $.ajax({
        type: "POST",
        url: "php/editarProceso.php",
        data: $("#formEditarProceso").serialize(),
        datatype: "json",
        success: function(r) {
            console.log(r);
            if (r == 1) {
                $('#mostrarTabla').load('tablas/tablaPedido.php');
                alertify.success("Proceso Editado Correctamente");
            } else {
                alertify.error('Error al editar Proceso');
            }
        }
    });
}

//confirmar anulado
function confirmarAnuladoPedido(datos) {
    d = datos.split('||');
    idPedido = "id=" + d[0];
    alertify.prompt('Anular Pedido', '<b>Pedido: </b>' + d[1] + '<br><b>Cliente: </b>' + d[2] + '<br><b>Asesor: </b>' + d[3] + '<br><b>Unds: </b>' + d[7] + '<br><b>Procesos: </b>' + d[6] + '<br><br>Motivo por la cual se anula el Pedido:<br>', '',
        function(evt, value) {
            input = idPedido + "&obs=" + value;
            anularPedido(input)
        },
        function() { alertify.warning('Se Canceló Proceso') }).set('labels', { ok: 'Anular', cancel: 'Cancelar' });
}
//anular Pedido
function anularPedido(datos) {


    $.ajax({
        type: "POST",
        url: "php/anularPedido.php",
        data: datos,
        dataType: "json",
        success: function(data) {
            if (data == 1) {
                $('#mostrarTabla').load('tablas/tablaPedido.php');
                alertify.success('Pedido Anulado Correctamente');
            } else {
                alertify.error('Error al Anular Pedido');
            }

        }
    });
}