"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Line, PerspectiveCamera, Html } from "@react-three/drei"
import { useEffect, useState } from "react"

// Generate mock 3D stock data (replace with real data via props or API)
function generateStockData3D(points = 120) {
  const data = []
  let x = 0, y = 100, z = 0
  for (let i = 0; i < points; i++) {
    x += 1
    y += Math.sin(i / 10) * 2 + Math.random() * 2
    z += Math.cos(i / 15) * 1.5 + Math.random() * 1.5
    data.push([x, y, z])
  }
  return data
}

export default function StockChart3D({ data }) {
  const [chartData, setChartData] = useState(data || generateStockData3D())
  useEffect(() => {
    if (data) setChartData(data)
  }, [data])
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl bg-black/60 border border-violet-800 relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[60, 40, 60]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        <Line
          points={chartData}
          color="#a78bfa"
          lineWidth={3}
          dashed={false}
        />
        <OrbitControls enablePan enableZoom enableRotate />
        <Html position={[chartData[chartData.length - 1][0], chartData[chartData.length - 1][1], chartData[chartData.length - 1][2]]}>
          <div className="bg-violet-700/80 text-white px-2 py-1 rounded shadow-lg text-xs">
            Latest: {chartData[chartData.length - 1][1].toFixed(2)}
          </div>
        </Html>
      </Canvas>
      <div className="absolute top-2 left-2 text-white text-lg font-bold drop-shadow-lg">3D Stock Chart</div>
    </div>
  )
}
