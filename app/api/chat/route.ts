import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      generateExam: tool({
        description: "Generate a math exam based on the user requirements",
        parameters: z.object({
          title: z.string().describe("The title of the exam"),
          grade: z.string().describe("The grade level (e.g., 9th, 10th, 11th, 12th)"),
          topic: z.string().describe("The main topic or subject area"),
          questionCount: z.number().describe("Number of questions to generate"),
          difficulty: z.enum(["easy", "medium", "hard"]).describe("Difficulty level"),
        }),
        execute: async ({ title, grade, topic, questionCount, difficulty }) => {
          // In a real implementation, this would:
          // 1. Query the vector database for relevant questions
          // 2. Use LangChain to generate contextual questions
          // 3. Format the exam properly

          // Mock exam generation
          const questions = Array.from({ length: questionCount }, (_, i) => ({
            id: i + 1,
            question: `Sample ${difficulty} ${topic} question ${i + 1} for grade ${grade}`,
            options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
            correctAnswer: "A",
            solution: `This is the solution explanation for question ${i + 1}`,
          }))

          return {
            title,
            grade,
            topic,
            difficulty,
            questions,
            generatedAt: new Date().toISOString(),
          }
        },
      }),
    },
    system: `You are an AI assistant specialized in creating math exams for teachers. 
    You help educators generate custom math assessments by understanding their requirements 
    and creating appropriate questions with solutions.
    
    When a user describes what kind of exam they need, use the generateExam tool to create it.
    Always ask clarifying questions if the requirements are not specific enough.`,
  })

  return result.toDataStreamResponse()
}
