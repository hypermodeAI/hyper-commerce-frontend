import { generateSearchObjectFromLLM } from "../actions";

export default async function LLMResponse({query}: {query: string | null}) {
    const response = await generateSearchObjectFromLLM(query || "")
    const userResponse = response?.data?.generateSearchObjectFromLLM?.userResponse
    return (
        <div className="text-white text-xs bg-indigo-500 p-2 rounded italic">
            {userResponse}
        </div>
    )
}