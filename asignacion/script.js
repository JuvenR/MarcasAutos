const marcasSelect = document.getElementById('marcas');
const modelosSelect = document.getElementById('modelos');

const coloresMarca = {
  Toyota: '#dc2626',
  Honda: '#2563eb', 
  Ford: '#059669',
  Chevrolet: '#d97706',
  Nissan: '#7c3aed',
  BMW: '#000000',
  Audi: '#e6e3e3ff',
  'Mercedes-Benz': '#1f2937',
  Hyundai: '#0369a1',
  Kia: '#be185d'
};

async function cargarMarcas() {
  try {
    const respuesta = await fetch('http://localhost:8888/marcas');
    const texto = await respuesta.text();
    const marcas = texto.split('\n')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    marcasSelect.innerHTML = '<option value="">Elige una marca</option>';
    
    marcas.forEach(marca => {
      const opcion = document.createElement('option');
      opcion.value = marca;
      opcion.textContent = marca;
      marcasSelect.appendChild(opcion);
    });
  } catch (error) {
    console.error('Error cargando marcas:', error);
    marcasSelect.innerHTML = '<option value="">Error al cargar</option>';
  }
}

async function cargarModelos(marca) {
  if (!marca) {
    modelosSelect.disabled = true;
    modelosSelect.style.backgroundColor = '';
    modelosSelect.innerHTML = '<option value="">Primero elige una marca</option>';
    return;
  }

  modelosSelect.disabled = true;
  modelosSelect.innerHTML = '<option value="">Buscando modelos...</option>';
  modelosSelect.style.backgroundColor = coloresMarca[marca] || '#6b7280';
  modelosSelect.style.color = '#ffffff';

  try {
    const respuesta = await fetch(`http://localhost:8888/modelos/${marca}`);
    const texto = await respuesta.text();
    const modelos = texto
      .split('\n')
      .map(linea => {
        const partes = linea.split(' - ');
        return partes[1] || partes[0];
      })
      .filter(modelo => modelo && modelo.trim().length > 0);

    modelosSelect.innerHTML = '<option value="">Selecciona modelo</option>';
    
    modelos.forEach(modelo => {
      const opcion = document.createElement('option');
      opcion.value = modelo;
      opcion.textContent = modelo;
      modelosSelect.appendChild(opcion);
    });

    modelosSelect.disabled = false;
  } catch (error) {
    console.error('Error cargando modelos:', error);
    modelosSelect.innerHTML = '<option value="">Error al cargar</option>';
  }
}

marcasSelect.addEventListener('change', (e) => {
  cargarModelos(e.target.value);
});

document.addEventListener('DOMContentLoaded', cargarMarcas);