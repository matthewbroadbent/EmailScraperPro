import OpenAI from 'openai';
import type { EmailResult } from '../types';

export async function generateEmails(optimizedPrompt: string, apiKey: string): Promise<EmailResult[]> {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional email research assistant. Generate realistic, professional email contacts based on the given criteria. Always return valid JSON format."
        },
        {
          role: "user",
          content: optimizedPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const emailResults: EmailResult[] = JSON.parse(jsonMatch[0]);
    
    // Validate and clean results
    return emailResults.filter(result => 
      result.firstName && 
      result.lastName && 
      result.emailAddress && 
      result.emailAddress.includes('@') &&
      !result.emailAddress.includes('@gmail.com') &&
      !result.emailAddress.includes('@yahoo.com') &&
      !result.emailAddress.includes('@hotmail.com') &&
      !result.emailAddress.startsWith('info@') &&
      !result.emailAddress.startsWith('admin@') &&
      !result.emailAddress.startsWith('contact@')
    );

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate emails. Please check your API key and try again.');
  }
}
