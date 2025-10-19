import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import fs from "fs"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" },
})

app.use(cors())
app.use(express.json())

const shipments = JSON.parse(fs.readFileSync("./data.json", "utf8"))


// Get all shipments (with optional filters)
app.get("/api/shipments", (req, res) => {
  let data = [...shipments]
  const { riskLevel, riskType, region } = req.query

  if (riskLevel) data = data.filter(s => s.riskLevel === riskLevel)
  if (riskType) data = data.filter(s => s.riskType === riskType)
  if (region) data = data.filter(s => s.region === region)

  res.json(data)
})

// Get a specific shipment
app.get("/api/shipments/:id", (req, res) => {
  const shipment = shipments.find(s => s.shipmentId === req.params.id)
  if (!shipment) return res.status(404).json({ error: "Shipment not found" })
  res.json(shipment)
})

//Get all at-risk alerts 
app.get("/api/alerts", (req, res) => {
  const atRisk = shipments.filter(s => s.riskLevel !== "Low")
  res.json(atRisk)
})

// Update a shipment 
app.put("/api/shipments/:id", (req, res) => {
  const idx = shipments.findIndex(s => s.shipmentId === req.params.id)
  if (idx === -1) return res.status(404).json({ error: "Shipment not found" })

  // Update shipment 
  shipments[idx] = { ...shipments[idx], ...req.body, lastUpdate: Date.now() }

  // Emit WebSocket event for all clients
  io.emit("shipmentUpdated", shipments[idx])

  res.json(shipments[idx])
})
// ============ WEBSOCKET ============
io.on("connection", socket => {
  console.log("Client connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
