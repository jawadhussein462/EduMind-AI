import { NextRequest, NextResponse } from 'next/server'

const CLARIFY_API_URL = "http://132.196.175.116/api/clarify"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const response = await fetch(CLARIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Clarify proxy error:", error)
    return NextResponse.json(
      {
        clarification_needed: false,
        clarification: "",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 