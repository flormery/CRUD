// URL del backend
const API_URL = 'http://localhost:3000/api/mascotas';


// Referencias a elementos del DOM
const formMascota = document.getElementById('form-mascota');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const tbodyMascotas = document.getElementById('tbody-mascotas');
const mensajeVacio = document.getElementById('mensaje-vacio');

// Variables para modo edición
let modoEdicion = false;
let idMascotaEditar = null;

// 🚀 Cargar mascotas al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarMascotas();
});

// 📋 Función para cargar todas las mascotas desde el backend
async function cargarMascotas() {
    try {
        const response = await fetch(API_URL);
        const mascotas = await response.json();

        // Limpiar la tabla
        tbodyMascotas.innerHTML = '';

        // Si no hay mascotas, mostrar mensaje
        if (mascotas.length === 0) {
            mensajeVacio.style.display = 'block';
            return;
        }

        mensajeVacio.style.display = 'none';

        // Llenar la tabla con las mascotas
        mascotas.forEach(mascota => {
            const fila = crearFilaMascota(mascota);
            tbodyMascotas.appendChild(fila);
        });

    } catch (error) {
        console.error('❌ Error al cargar mascotas:', error);
        alert('Error al cargar las mascotas. Verifica que el backend esté corriendo.');
    }
}

// 🏗️ Crear una fila de la tabla para una mascota
function crearFilaMascota(mascota) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${mascota.id}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.tipo}</td>
        <td>${mascota.edad} años</td>
        <td>${mascota.raza || 'N/A'}</td>
        <td>${mascota.dueno}</td>

        <td class="acciones">
            <button class="btn-editar" onclick="editarMascota(${mascota.id})">✏️ Editar</button>
            <button class="btn-eliminar" onclick="eliminarMascota(${mascota.id})">🗑️ Eliminar</button>
        </td>
    `;
    
    return tr;
}

// ➕ Enviar formulario (crear o actualizar)
formMascota.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
const mascota = {
    nombre: document.getElementById('nombre').value.trim(),
    tipo: document.getElementById('tipo').value,
    edad: parseInt(document.getElementById('edad').value),
    raza: document.getElementById('raza').value.trim(),
    dueno: document.getElementById('dueno').value.trim() // 👈 sin tilde
};


    try {
        let response;

        if (modoEdicion) {
            // Actualizar mascota existente (PUT)
            response = await fetch(`${API_URL}/${idMascotaEditar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mascota)
            });
        } else {
            // Crear nueva mascota (POST)
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mascota)
            });
        }

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            limpiarFormulario();
            cargarMascotas(); // Recargar la tabla
        } else {
            alert('Error: ' + data.error);
        }

    } catch (error) {
        console.error('❌ Error al guardar mascota:', error);
        alert('Error al guardar la mascota. Verifica la conexión con el backend.');
    }
});

// ✏️ Editar una mascota
async function editarMascota(id) {
    try {
        // Obtener los datos de la mascota desde el backend
        const response = await fetch(API_URL);
        const mascotas = await response.json();
        const mascota = mascotas.find(m => m.id === id);

        if (!mascota) {
            alert('Mascota no encontrada');
            return;
        }

        // Llenar el formulario con los datos de la mascota
        document.getElementById('nombre').value = mascota.nombre;
        document.getElementById('tipo').value = mascota.tipo;
        document.getElementById('edad').value = mascota.edad;
        document.getElementById('raza').value = mascota.raza || '';
        document.getElementById('dueño').value = mascota.dueño;

        // Cambiar a modo edición
        modoEdicion = true;
        idMascotaEditar = id;
        formTitle.textContent = '✏️ Actualizar Mascota';
        btnSubmit.textContent = 'Actualizar';
        btnCancel.style.display = 'inline-block';

        // Scroll hacia el formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('❌ Error al cargar datos de la mascota:', error);
        alert('Error al cargar los datos de la mascota');
    }
}

// 🗑️ Eliminar una mascota
async function eliminarMascota(id) {
    if (!confirm('¿Estás seguro de eliminar esta mascota?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            cargarMascotas(); // Recargar la tabla
        } else {
            alert('Error: ' + data.error);
        }

    } catch (error) {
        console.error('❌ Error al eliminar mascota:', error);
        alert('Error al eliminar la mascota');
    }
}

// 🧹 Limpiar formulario y salir del modo edición
function limpiarFormulario() {
    formMascota.reset();
    modoEdicion = false;
    idMascotaEditar = null;
    formTitle.textContent = '➕ Registrar Nueva Mascota';
    btnSubmit.textContent = 'Guardar';
    btnCancel.style.display = 'none';
}

// Botón cancelar
btnCancel.addEventListener('click', limpiarFormulario);