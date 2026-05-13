
import { useState, useMemo } from "react";
export default function SimuladorFisicaUMG() {
 

  const g = 9.81;

  const [angulo, setAngulo] = useState(45);
  const [velocidad, setVelocidad] = useState(20);
  const [altura, setAltura] = useState(0);
  const [masa, setMasa] = useState(2);

  const resultados = useMemo(() => {
    const rad = (angulo * Math.PI) / 180;

    const vx = velocidad * Math.cos(rad);
    const vy = velocidad * Math.sin(rad);

    const tiempoVuelo =
      (vy + Math.sqrt(vy * vy + 2 * g * altura)) / g;

    const alcance = vx * tiempoVuelo;
    const alturaMaxima = altura + (vy * vy) / (2 * g);

    const energiaCinetica = 0.5 * masa * velocidad * velocidad;
    const energiaPotencial = masa * g * alturaMaxima;

    return {
      vx,
      vy,
      tiempoVuelo,
      alcance,
      alturaMaxima,
      energiaCinetica,
      energiaPotencial,
    };
  }, [angulo, velocidad, altura, masa]);

  const trayectoria = [];

  for (let t = 0; t <= resultados.tiempoVuelo; t += 0.1) {
    const rad = (angulo * Math.PI) / 180;

    const x = velocidad * Math.cos(rad) * t;
    const y =
      altura +
      velocidad * Math.sin(rad) * t -
      0.5 * g * t * t;

    if (y >= 0) {
      trayectoria.push({ x, y });
    }
  }

  const maxX = Math.max(...trayectoria.map((p) => p.x), 1);
  const maxY = Math.max(...trayectoria.map((p) => p.y), 1);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            Simulador de Física 1
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Proyecto Final Fisica 1 - Marlon Damian Diaz Paz 1490-253109
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                Variables de Entrada
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="font-medium block mb-2">
                    Ángulo de Lanzamiento: {angulo}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={angulo}
                    onChange={(e) => setAngulo(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-2">
                    Velocidad Inicial: {velocidad} m/s
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={velocidad}
                    onChange={(e) => setVelocidad(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-2">
                    Altura Inicial: {altura} m
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={altura}
                    onChange={(e) => setAltura(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-2">
                    Masa del Objeto: {masa} kg
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={masa}
                    onChange={(e) => setMasa(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                Resultados del Simulador
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-gray-500">Velocidad X</p>
                  <h3 className="text-2xl font-bold">
                    {resultados.vx.toFixed(2)} m/s
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-gray-500">Velocidad Y</p>
                  <h3 className="text-2xl font-bold">
                    {resultados.vy.toFixed(2)} m/s
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-gray-500">Tiempo de Vuelo</p>
                  <h3 className="text-2xl font-bold">
                    {resultados.tiempoVuelo.toFixed(2)} s
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-gray-500">Alcance Horizontal</p>
                  <h3 className="text-2xl font-bold">
                    {resultados.alcance.toFixed(2)} m
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-gray-500">Altura Máxima</p>
                  <h3 className="text-2xl font-bold">
                    {resultados.alturaMaxima.toFixed(2)} m
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                  <p className="text-gray-500">Energía Cinética</p>
                  <h3 className="text-2xl font-bold">
                    {resultados.energiaCinetica.toFixed(2)} J
                  </h3>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-xl p-4 shadow">
                <p className="text-gray-500 mb-2">Energía Potencial Máxima</p>
                <h3 className="text-3xl font-bold">
                  {resultados.energiaPotencial.toFixed(2)} J
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-gray-50 rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Gráfica de Trayectoria Parabólica
            </h2>

            <div className="overflow-x-auto">
              <svg
                width="100%"
                height="450"
                viewBox="0 0 900 450"
                className="bg-white rounded-xl border"
              >
                <line x1="50" y1="400" x2="850" y2="400" stroke="black" />
                <line x1="50" y1="50" x2="50" y2="400" stroke="black" />

                <text x="860" y="405" fontSize="14">
                  X
                </text>

                <text x="35" y="40" fontSize="14">
                  Y
                </text>

                <polyline
                  fill="none"
                  stroke="blue"
                  strokeWidth="3"
                  points={trayectoria
                    .map((p) => {
                      const px = 50 + (p.x / maxX) * 780;
                      const py = 400 - (p.y / maxY) * 320;
                      return `${px},${py}`;
                    })
                    .join(" ")}
                />
              </svg>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3">
                Temas Aplicados
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Movimiento parabólico</li>
                <li>Vectores y componentes</li>
                <li>Caída libre</li>
                <li>Cinemática en dos dimensiones</li>
                <li>Trabajo y energía</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3">
                Objetivo del Proyecto
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Simular el comportamiento de un objeto lanzado en movimiento
                parabólico, permitiendo analizar las variables físicas y
                comprender los conceptos desarrollados en el curso de Física 1.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3">
                Aplicación Académica
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Este simulador permite visualizar gráficamente el comportamiento
                de las ecuaciones físicas y facilita el aprendizaje interactivo
                para estudiantes de ingeniería.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white border rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Fórmulas Utilizadas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="mb-2 font-semibold">Movimiento Parabólico</p>
                <ul className="space-y-2">
                  <li>Vx = V cos(θ)</li>
                  <li>Vy = V sen(θ)</li>
                  <li>x = Vx · t</li>
                  <li>y = y₀ + Vy · t − ½gt²</li>
                </ul>
              </div>

              <div>
                <p className="mb-2 font-semibold">Energía</p>
                <ul className="space-y-2">
                  <li>Ec = ½mv²</li>
                  <li>Ep = mgh</li>
                  <li>g = 9.81 m/s²</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
