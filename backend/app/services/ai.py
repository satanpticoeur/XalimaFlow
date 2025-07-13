import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

async def generate_text_with_ai(prompt: str, max_tokens: int = 500, temperature: float = 0.7) -> str:
    """
    Generates text using the OpenAI GPT-3.5 Turbo model.
    """
    if not openai.api_key:
        raise ValueError("OpenAI API key is not configured.")

    try:
        response = await openai.AsyncClient().chat.completions.create(
            model="gpt-3.5-turbo", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant for content creation."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=max_tokens,
            temperature=temperature,
        )
        # Accessing the content from the response object
        return response.choices[0].message.content.strip()
    except Exception as e:
        # Log the error for debugging
        print(f"Error calling OpenAI API: {e}")
        raise