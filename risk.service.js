

const shipments = loadShipments()
console.log('shipments', shipments)


function isShipmentAtRisk(shipmentId) {
    const shipment = shipments.find(s => s.shipmentId === shipmentId)
    const now = Date.now()
    const eta = new Date(shipment.ETA).getTime()
    const daysToETA = (eta - now) / (1000 * 60 * 60 * 24)
     //  Logic 1: Stage Progress Rule 
    // If delivery is close (<=3 days) and shipment still early in process
    const earlyStages = ["Processing", "Sorting Facility", "At Port"]
    const isLateProgress = daysToETA <= 3 && earlyStages.includes(shipment.currentStage)

    //  Logic 2: Inactivity Rule 
    // If no update for more than 48 hours and not yet delivered
    const hoursSinceUpdate = (now - shipment.lastUpdate) / (1000 * 60 * 60)
    const isInactive = hoursSinceUpdate > 48 && shipment.currentStage !== "Delivered"

    // === Logic 3: External Rule (simplified) ===
    // If ETA within 5 days and riskType indicates an external factor
    const isExternalRisk = daysToETA <= 5 && shipment.riskType === "External"

    return isLateProgress || isInactive || isExternalRisk
}

console.log('"SHP-0923"', isShipmentAtRisk("SHP-0923"))
console.log('"SHP-0931"', isShipmentAtRisk("SHP-0931"))


function loadShipments() {
    return [
        {
            "shipmentId": "SHP-0923",
            "origin": "Tel Aviv",
            "destination": "Berlin",
            "ETA": "2025-10-22T12:00:00Z",
            "currentStage": "In Transit",
            "riskType": "Inactivity",
            "riskLevel": "High",
            "lastUpdate": 1760863350000
        },
        {
            "shipmentId": "SHP-0931",
            "origin": "Warsaw",
            "destination": "Paris",
            "ETA": "2025-10-23T09:30:00Z",
            "currentStage": "Customs",
            "riskType": "External",
            "riskLevel": "Medium",
            "lastUpdate": 1760867350000
        },
        {
            "shipmentId": "SHP-0942",
            "origin": "Prague",
            "destination": "Vienna",
            "ETA": "2025-10-21T15:20:00Z",
            "currentStage": "Out for Delivery",
            "riskType": "Operational",
            "riskLevel": "Low",
            "lastUpdate": 1760869550000
        },
        {
            "shipmentId": "SHP-1015",
            "origin": "Madrid",
            "destination": "Rome",
            "ETA": "2025-10-24T18:00:00Z",
            "currentStage": "In Transit",
            "riskType": "Operational",
            "riskLevel": "Medium",
            "lastUpdate": 1760837350000
        },
        {
            "shipmentId": "SHP-1077",
            "origin": "Osaka",
            "destination": "Seattle",
            "ETA": "2025-10-25T07:45:00Z",
            "currentStage": "At Port",
            "riskType": "External",
            "riskLevel": "High",
            "lastUpdate": 1760860000000
        },
        {
            "shipmentId": "SHP-1102",
            "origin": "London",
            "destination": "Dublin",
            "ETA": "2025-10-20T13:15:00Z",
            "currentStage": "Out for Delivery",
            "riskType": "Operational",
            "riskLevel": "Low",
            "lastUpdate": 1760850000000
        },
        {
            "shipmentId": "SHP-1110",
            "origin": "Toronto",
            "destination": "New York",
            "ETA": "2025-10-23T16:00:00Z",
            "currentStage": "In Transit",
            "riskType": "Inactivity",
            "riskLevel": "High",
            "lastUpdate": 1760750000000
        },
        {
            "shipmentId": "SHP-1133",
            "origin": "Athens",
            "destination": "Milan",
            "ETA": "2025-10-21T08:00:00Z",
            "currentStage": "Processing",
            "riskType": "Operational",
            "riskLevel": "Medium",
            "lastUpdate": 1760845550000
        },
        {
            "shipmentId": "SHP-1154",
            "origin": "Shanghai",
            "destination": "Sydney",
            "ETA": "2025-10-26T11:00:00Z",
            "currentStage": "At Port",
            "riskType": "External",
            "riskLevel": "High",
            "lastUpdate": 1760840000000
        },
        {
            "shipmentId": "SHP-1169",
            "origin": "Copenhagen",
            "destination": "Amsterdam",
            "ETA": "2025-10-22T09:00:00Z",
            "currentStage": "Sorting Facility",
            "riskType": "Operational",
            "riskLevel": "Low",
            "lastUpdate": 1760856000000
        },
        {
            "shipmentId": "SHP-1181",
            "origin": "Chicago",
            "destination": "Los Angeles",
            "ETA": "2025-10-23T20:30:00Z",
            "currentStage": "In Transit",
            "riskType": "Inactivity",
            "riskLevel": "Medium",
            "lastUpdate": 1760830000000
        },
        {
            "shipmentId": "SHP-1205",
            "origin": "Stockholm",
            "destination": "Berlin",
            "ETA": "2025-10-24T10:45:00Z",
            "currentStage": "In Transit",
            "riskType": "Operational",
            "riskLevel": "Low",
            "lastUpdate": 1760869000000
        },
        {
            "shipmentId": "SHP-1220",
            "origin": "New Delhi",
            "destination": "Dubai",
            "ETA": "2025-10-25T05:30:00Z",
            "currentStage": "Customs",
            "riskType": "External",
            "riskLevel": "High",
            "lastUpdate": 1760862000000
        },
        {
            "shipmentId": "SHP-1247",
            "origin": "Budapest",
            "destination": "Zurich",
            "ETA": "2025-10-20T22:00:00Z",
            "currentStage": "Sorting Facility",
            "riskType": "Inactivity",
            "riskLevel": "Medium",
            "lastUpdate": 1760755550000
        },
        {
            "shipmentId": "SHP-1268",
            "origin": "Lisbon",
            "destination": "Brussels",
            "ETA": "2025-10-22T18:15:00Z",
            "currentStage": "In Transit",
            "riskType": "Operational",
            "riskLevel": "Low",
            "lastUpdate": 1760860000000
        }
    ]

}