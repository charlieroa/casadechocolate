document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('houseForm');
    const costForm = document.getElementById('costForm');
    const areaCuerpoResultSpan = document.getElementById('areaCuerpoResult');
    const areaTechoResultSpan = document.getElementById('areaTechoResult');
    const costCuerpoResultSpan = document.getElementById('costCuerpoResultValue');
    const costTechoResultSpan = document.getElementById('costTechoResultValue');
    const costTotalResultSpan = document.getElementById('costTotalResultValue');
    const svg = document.getElementById('houseSvg');
    const costSvg = document.getElementById('costHouseSvg');
    const changeMeasurementsBtn = document.getElementById('changeMeasurementsBtn');
    const revisemosCostosBtn = document.getElementById('revisemosCostosBtn');

    const calculadoraBtn = document.getElementById('calculadoraBtn');
    const costosBtn = document.getElementById('costosBtn');

    const calculadoraView = document.getElementById('calculadoraView');
    const costosView = document.getElementById('costosView');

    const chocolatePrices = {
        dark: 0.10,
        milk: 0.12
    };

    const chocolateColors = {
        dark: 'saddlebrown',
        milk: 'peru'
    };

    calculadoraBtn.addEventListener('click', function () {
        calculadoraView.style.display = 'block';
        costosView.style.display = 'none';
        setActiveButton(calculadoraBtn);
    });

    costosBtn.addEventListener('click', function () {
        calculadoraView.style.display = 'none';
        costosView.style.display = 'block';
        setActiveButton(costosBtn);
    });

    revisemosCostosBtn.addEventListener('click', function () {
        calculadoraView.style.display = 'none';
        costosView.style.display = 'block';
    });

    function setActiveButton(activeButton) {
        const buttons = [calculadoraBtn, costosBtn];
        buttons.forEach(button => {
            if (button === activeButton) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const base = parseFloat(document.getElementById('base').value);
        const height = parseFloat(document.getElementById('height').value);

        // Cálculo de áreas
        const areaCuerpo = length * width;
        const areaTecho = 0.5 * base * height;

        // Mostrar resultados
        areaCuerpoResultSpan.textContent = `Área del cuerpo: ${areaCuerpo.toFixed(2)} cm²`;
        areaTechoResultSpan.textContent = `Área del techo: ${areaTecho.toFixed(2)} cm²`;

        // Dibujar la casa en el SVG
        svg.innerHTML = ''; // Limpiar el SVG

        // Calcular el factor de escala basado en las dimensiones ingresadas
        const maxDimension = Math.max(length, width, base, height);
        const scaleFactor = 300 / maxDimension; // Escalar para que el máximo ajuste a 300px

        const svgWidth = (width + 10) * scaleFactor; // Añadir margen
        const svgHeight = (length + height + 10) * scaleFactor; // Añadir margen
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);

        // Dibujar el cuerpo (rectángulo)
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', 5 * scaleFactor);
        rect.setAttribute('y', 5 * scaleFactor + height * scaleFactor);
        rect.setAttribute('width', width * scaleFactor);
        rect.setAttribute('height', length * scaleFactor);
        rect.setAttribute('fill', 'lightblue');
        rect.setAttribute('stroke', 'black');
        svg.appendChild(rect);

        // Dibujar el techo (triángulo)
        const roof = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const roofPoints = [
            5 * scaleFactor, 5 * scaleFactor + height * scaleFactor, // Bottom left
            5 * scaleFactor + (base * scaleFactor / 2), 5 * scaleFactor, // Top middle
            5 * scaleFactor + base * scaleFactor, 5 * scaleFactor + height * scaleFactor // Bottom right
        ].join(' ');
        roof.setAttribute('points', roofPoints);
        roof.setAttribute('fill', 'lightgreen');
        roof.setAttribute('stroke', 'black');
        svg.appendChild(roof);

        // Añadir etiquetas de las dimensiones del cuerpo
        const lengthLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lengthLabel.setAttribute('x', 5 * scaleFactor + (width * scaleFactor / 2));
        lengthLabel.setAttribute('y', 5 * scaleFactor + height * scaleFactor + length * scaleFactor + 15);
        lengthLabel.setAttribute('text-anchor', 'middle');
        lengthLabel.textContent = `${length} cm`;

        const widthLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        widthLabel.setAttribute('x', 5 * scaleFactor + (width * scaleFactor / 2));
        widthLabel.setAttribute('y', 5 * scaleFactor + height * scaleFactor + (length * scaleFactor / 2));
        widthLabel.setAttribute('text-anchor', 'middle');
        widthLabel.textContent = `${width} cm`;

        // Añadir etiquetas de las dimensiones del techo
        const baseLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        baseLabel.setAttribute('x', 5 * scaleFactor + (base * scaleFactor / 2));
        baseLabel.setAttribute('y', 5 * scaleFactor - 5);
        baseLabel.setAttribute('text-anchor', 'middle');
        baseLabel.textContent = `${base} cm`;

        const heightLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        heightLabel.setAttribute('x', 5 * scaleFactor - 10);
        heightLabel.setAttribute('y', 5 * scaleFactor + (height * scaleFactor / 2));
        heightLabel.setAttribute('text-anchor', 'middle');
        heightLabel.textContent = `${height} cm`;

        svg.appendChild(lengthLabel);
        svg.appendChild(widthLabel);
        svg.appendChild(baseLabel);
        svg.appendChild(heightLabel);

        MathJax.typeset(); // Actualizar la renderización de MathJax
    });

    costForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const chocolateCuerpo = document.getElementById('chocolateCuerpo').value;
        const chocolateTecho = document.getElementById('chocolateTecho').value;
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const base = parseFloat(document.getElementById('base').value);
        const height = parseFloat(document.getElementById('height').value);

        // Cálculo de áreas
        const areaCuerpo = length * width;
        const areaTecho = 0.5 * base * height;

        // Cálculo de costos
        const costCuerpo = areaCuerpo * chocolatePrices[chocolateCuerpo];
        const costTecho = areaTecho * chocolatePrices[chocolateTecho];
        const costTotal = costCuerpo + costTecho;

        // Mostrar resultados
        costCuerpoResultSpan.textContent = `$${costCuerpo.toFixed(2)}`;
        costTechoResultSpan.textContent = `$${costTecho.toFixed(2)}`;
        costTotalResultSpan.textContent = `$${costTotal.toFixed(2)}`;

        // Dibujar la casa en el SVG
        costSvg.innerHTML = ''; // Limpiar el SVG

        // Calcular el factor de escala basado en las dimensiones ingresadas
        const maxDimension = Math.max(length, width, base, height);
        const scaleFactor = 300 / maxDimension; // Escalar para que el máximo ajuste a 300px

        const svgWidth = (width + 10) * scaleFactor; // Añadir margen
        const svgHeight = (length + height + 10) * scaleFactor; // Añadir margen
        costSvg.setAttribute('width', svgWidth);
        costSvg.setAttribute('height', svgHeight);

        // Dibujar el cuerpo (rectángulo)
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', 5 * scaleFactor);
        rect.setAttribute('y', 5 * scaleFactor + height * scaleFactor);
        rect.setAttribute('width', width * scaleFactor);
        rect.setAttribute('height', length * scaleFactor);
        rect.setAttribute('fill', chocolateColors[chocolateCuerpo]);
        rect.setAttribute('stroke', 'black');
        costSvg.appendChild(rect);

        // Dibujar el techo (triángulo)
        const roof = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const roofPoints = [
            5 * scaleFactor, 5 * scaleFactor + height * scaleFactor, // Bottom left
            5 * scaleFactor + (base * scaleFactor / 2), 5 * scaleFactor, // Top middle
            5 * scaleFactor + base * scaleFactor, 5 * scaleFactor + height * scaleFactor // Bottom right
        ].join(' ');
        roof.setAttribute('points', roofPoints);
        roof.setAttribute('fill', chocolateColors[chocolateTecho]);
        roof.setAttribute('stroke', 'black');
        costSvg.appendChild(roof);

        // Añadir etiquetas de las dimensiones del cuerpo
        const lengthLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lengthLabel.setAttribute('x', 5 * scaleFactor + (width * scaleFactor / 2));
        lengthLabel.setAttribute('y', 5 * scaleFactor + height * scaleFactor + length * scaleFactor + 15);
        lengthLabel.setAttribute('text-anchor', 'middle');
        lengthLabel.textContent = `${length} cm`;

        const widthLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        widthLabel.setAttribute('x', 5 * scaleFactor + (width * scaleFactor / 2));
        widthLabel.setAttribute('y', 5 * scaleFactor + height * scaleFactor + (length * scaleFactor / 2));
        widthLabel.setAttribute('text-anchor', 'middle');
        widthLabel.textContent = `${width} cm`;

        // Añadir etiquetas de las dimensiones del techo
        const baseLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        baseLabel.setAttribute('x', 5 * scaleFactor + (base * scaleFactor / 2));
        baseLabel.setAttribute('y', 5 * scaleFactor - 5);
        baseLabel.setAttribute('text-anchor', 'middle');
        baseLabel.textContent = `${base} cm`;

        const heightLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        heightLabel.setAttribute('x', 5 * scaleFactor - 10);
        heightLabel.setAttribute('y', 5 * scaleFactor + (height * scaleFactor / 2));
        heightLabel.setAttribute('text-anchor', 'middle');
        heightLabel.textContent = `${height} cm`;

        costSvg.appendChild(lengthLabel);
        costSvg.appendChild(widthLabel);
        costSvg.appendChild(baseLabel);
        costSvg.appendChild(heightLabel);
    });

    changeMeasurementsBtn.addEventListener('click', function () {
        costosView.style.display = 'none';
        calculadoraView.style.display = 'block';
        setActiveButton(calculadoraBtn);
    });
});
