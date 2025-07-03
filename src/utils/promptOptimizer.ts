export function optimizePrompt(userPrompt: string): string {
  // Extract key information from the user prompt
  const extractedInfo = {
    count: extractCount(userPrompt),
    jobFunctions: extractJobFunctions(userPrompt),
    industry: extractIndustry(userPrompt),
    location: extractLocation(userPrompt),
    companySize: extractCompanySize(userPrompt),
    emailRestrictions: extractEmailRestrictions(userPrompt),
    outputFormat: extractOutputFormat(userPrompt)
  };

  // Build optimized prompt
  const optimizedPrompt = `
TASK: Generate a list of ${extractedInfo.count} professional email contacts based on the following criteria.

TARGET PROFESSIONALS:
- Job Functions: ${extractedInfo.jobFunctions}
- Industry: ${extractedInfo.industry}
- Location: ${extractedInfo.location}
- Company Size: ${extractedInfo.companySize}

EMAIL REQUIREMENTS:
- Only corporate email addresses (no personal emails like @gmail.com, @yahoo.com)
- No generic emails (info@, admin@, contact@, support@)
- Must be individual professional email addresses
- ${extractedInfo.emailRestrictions}

OUTPUT FORMAT:
Return ONLY a JSON array with objects containing these exact fields:
{
  "firstName": "string",
  "lastName": "string", 
  "jobTitle": "string",
  "emailAddress": "string",
  "companyName": "string",
  "context": "string explaining why this person matches the criteria"
}

IMPORTANT:
- Generate realistic, professional email addresses following corporate naming conventions
- Ensure job titles accurately reflect the requested functions
- Provide meaningful context for each selection
- Focus on quality over quantity
- Make emails appear authentic and professional

Generate the JSON array now:`.trim();

  return optimizedPrompt;
}

function extractCount(prompt: string): string {
  const countMatch = prompt.match(/(\d+)\s*email/i);
  return countMatch ? countMatch[1] : '25';
}

function extractJobFunctions(prompt: string): string {
  const functions = [];
  
  if (prompt.toLowerCase().includes('deal sourcer') || prompt.toLowerCase().includes('deal sourcing')) {
    functions.push('Deal Sourcers');
  }
  if (prompt.toLowerCase().includes('deal originator')) {
    functions.push('Deal Originators');
  }
  if (prompt.toLowerCase().includes('investment')) {
    functions.push('Investment Professionals');
  }
  if (prompt.toLowerCase().includes('analyst')) {
    functions.push('Investment Analysts');
  }
  if (prompt.toLowerCase().includes('associate')) {
    functions.push('Investment Associates');
  }
  if (prompt.toLowerCase().includes('principal')) {
    functions.push('Principals');
  }
  if (prompt.toLowerCase().includes('partner')) {
    functions.push('Partners');
  }

  return functions.length > 0 ? functions.join(', ') : 'Investment professionals, deal sourcers, analysts';
}

function extractIndustry(prompt: string): string {
  if (prompt.toLowerCase().includes('venture capital') || prompt.toLowerCase().includes('vc')) {
    return 'Venture Capital';
  }
  if (prompt.toLowerCase().includes('private equity') || prompt.toLowerCase().includes('pe')) {
    return 'Private Equity';
  }
  if (prompt.toLowerCase().includes('investment bank')) {
    return 'Investment Banking';
  }
  return 'Investment/Financial Services';
}

function extractLocation(prompt: string): string {
  const locations = [];
  
  if (prompt.toLowerCase().includes('uk') || prompt.toLowerCase().includes('united kingdom')) {
    locations.push('United Kingdom');
  }
  if (prompt.toLowerCase().includes('london')) {
    locations.push('London');
  }
  if (prompt.toLowerCase().includes('us') || prompt.toLowerCase().includes('united states')) {
    locations.push('United States');
  }
  if (prompt.toLowerCase().includes('europe')) {
    locations.push('Europe');
  }

  return locations.length > 0 ? locations.join(', ') : 'Global';
}

function extractCompanySize(prompt: string): string {
  if (prompt.toLowerCase().includes('mid to low tier') || prompt.toLowerCase().includes('not one of the biggest')) {
    return 'Mid-tier to smaller firms (not top-tier)';
  }
  if (prompt.toLowerCase().includes('small') || prompt.toLowerCase().includes('boutique')) {
    return 'Small/boutique firms';
  }
  if (prompt.toLowerCase().includes('large') || prompt.toLowerCase().includes('big')) {
    return 'Large firms';
  }
  return 'Various sizes';
}

function extractEmailRestrictions(prompt: string): string {
  const restrictions = [];
  
  if (prompt.toLowerCase().includes('not @gmail')) {
    restrictions.push('No personal email domains (@gmail.com, @yahoo.com, @hotmail.com)');
  }
  if (prompt.toLowerCase().includes('corporate email')) {
    restrictions.push('Must be corporate domain emails');
  }
  if (prompt.toLowerCase().includes('not info@') || prompt.toLowerCase().includes('not admin@')) {
    restrictions.push('No generic company emails (info@, admin@, contact@)');
  }

  return restrictions.join(', ') || 'Professional corporate emails only';
}

function extractOutputFormat(prompt: string): string {
  if (prompt.toLowerCase().includes('spreadsheet') || prompt.toLowerCase().includes('csv')) {
    return 'Structured data format suitable for spreadsheet export';
  }
  return 'Structured format';
}
