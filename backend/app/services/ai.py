from google import genai
from google.genai import types
from app.core.config import settings

_gemini_client = None

if settings.GEMINI_API_KEY:
    try:
        _gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
    except Exception as e:
        print(f"Error initializing Gemini client: {e}")
        _gemini_client = None
else:
    print("Warning: GEMINI_API_KEY is not set. AI generation will not work.")


async def generate_text_with_ai(prompt: str, temperature: float = 0.7) -> str:
    """
    Generates text using the Google Gemini model via the new client API.
    """
    if not _gemini_client:
        raise ValueError("Google Gemini API client is not initialized. Check API key and configuration.")

    try:
        response = _gemini_client.models.generate_content(
            model="gemini-2.5-flash", # Ou "gemini-1.5-flash" ou "gemini-2.5-flash"
            contents=[{"parts": [{"text": prompt}]}], # Le contenu doit être dans ce format pour les requêtes plus complexes
            config=types.GenerateContentConfig(
                temperature=temperature,
            )
        )

        if response.text is None:
            print(f"Gemini API returned no text content for prompt: '{prompt}'. Full response: {response}")
            return ""

        return response.text.strip()
    except Exception as e:
        print(f"Error calling Google Gemini API: {e}")
        if "429 Quota" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
             raise Exception("Gemini API Quota Exceeded. Please check your Google Cloud Console for limits.")
        elif "authentication" in str(e) or "invalid API key" in str(e):
             raise Exception("Gemini API Key invalid or not configured correctly.")
        else:
             raise Exception(f"Failed to generate text with AI: {e}")