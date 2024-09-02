// Inicializar EmailJS con tu ID de usuario
emailjs.init('zVL1E1HDUgsTYEj1N');

// Variable para almacenar la app seleccionada
let selectedApp = null;

// Función para seleccionar una aplicación de streaming
function selectApp(appName, appPrice) {
    if (appName === 'Netflix') {
        // Mostrar alerta si la app es Netflix
        showAlert('Netflix no está disponible por el momento. Por favor, selecciona otra app.');
        return; // Salir de la función para no actualizar la app seleccionada
    }

    // Actualizar la app seleccionada
    selectedApp = { name: appName, price: appPrice };

    // Actualiza el campo de app seleccionada en el formulario
    document.getElementById('app').value = `${appName} - Precio: $${appPrice}/mes`;

    // Actualiza el área para mostrar la app seleccionada
    document.getElementById('app-name').textContent = appName;
    document.getElementById('app-price').textContent = `Precio: $${appPrice}/mes`;

    // Desplaza la página al formulario de contacto
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar una alerta en la parte superior de la página
function showAlert(message) {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 5000);
}

// Añadir un evento 'submit' al formulario para manejar el envío
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que la página se recargue al enviar el formulario

    // Verificar si se ha seleccionado una app
    if (!selectedApp) {
        alert('Por favor, selecciona una aplicación para poder enviar la solicitud.');
        return;
    }

    // Cambiar el valor del botón a "Enviando..." mientras se procesa el envío
    const btn = document.getElementById('button');
    btn.value = 'Enviando...';

    // ID del servicio y de la plantilla de EmailJS
    const serviceID = 'default_service';
    const templateID = 'template_djq9v8f';

    // Asignar la app seleccionada al campo del formulario
    this.app.value = selectedApp.name;

    // Enviar el formulario usando EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // Restaurar el texto del botón
            btn.value = 'Enviar Solicitud';

            // Mostrar el mensaje de confirmación
            const userName = document.getElementById('from_name').value;
            const message1 = 'Correo enviado exitosamente!'; // Mensaje de confirmación del envío
            const message2 = `Gracias ${userName} por enviar su solicitud. Pronto te responderemos por WhatsApp.`; // Mensaje adicional

            // Mostrar ambos mensajes en el div de confirmación
            document.getElementById('confirmation-text').innerHTML = `<p>${message1}</p><p>${message2}</p>`;
            document.getElementById('confirmation-message').style.display = 'block';

            // Desplazar la página al mensaje de confirmación
            document.getElementById('confirmation-message').scrollIntoView({ behavior: 'smooth' });
        }, (err) => {
            // Restaurar el texto del botón si ocurre un error
            btn.value = 'Enviar Solicitud';
            alert(JSON.stringify(err));
        });
});

// Función para alternar la visibilidad del menú en dispositivos móviles
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});

// Función para cerrar el menú al hacer clic en un enlace
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});
