export interface ResearchResult {
  summary: string
  sources: { title: string; url: string; note?: string }[]
}

export async function researchStateLawWeb(
  stateName: string,
  issueDescription: string
): Promise<ResearchResult> {
  // Simulated research function
  // In a real application, this would query actual legal databases
  
  const stateAbbr = getStateAbbreviation(stateName)
  
  const sources = [
    {
      title: `${stateName} Official Legislature Website`,
      url: `https://www.leg.state.${stateAbbr.toLowerCase()}.us/`,
      note: 'Official state statutes and bills',
    },
    {
      title: `Cornell Law School - ${stateName} Legal Resources`,
      url: `https://www.law.cornell.edu/topn/state_law`,
      note: 'Comprehensive legal information by state',
    },
    {
      title: `FindLaw - ${stateName} Laws`,
      url: `https://statelaws.findlaw.com/${stateAbbr.toLowerCase()}/`,
      note: 'Searchable database of state laws',
    },
    {
      title: `${stateName} State Bar Association`,
      url: `https://www.statebar${stateAbbr.toLowerCase()}.org/`,
      note: 'Official bar association resources',
    },
  ]

  const summary = `Research Checklist for ${stateName}:

1. Review relevant ${stateName} statutes related to your issue
2. Check for recent case law in ${stateName} courts
3. Consult the ${stateName} State Bar for guidance
4. Verify any applicable federal laws
5. Document all communications with the other party
6. Gather evidence supporting your claims

Note: This is a research checklist only, not legal advice. Consult a licensed ${stateName} attorney before taking legal action.`

  return {
    summary,
    sources,
  }
}

function getStateAbbreviation(stateName: string): string {
  const abbreviations: Record<string, string> = {
    Alabama: 'AL',
    Alaska: 'AK',
    Arizona: 'AZ',
    Arkansas: 'AR',
    California: 'CA',
    Colorado: 'CO',
    Connecticut: 'CT',
    Delaware: 'DE',
    Florida: 'FL',
    Georgia: 'GA',
    Hawaii: 'HI',
    Idaho: 'ID',
    Illinois: 'IL',
    Indiana: 'IN',
    Iowa: 'IA',
    Kansas: 'KS',
    Kentucky: 'KY',
    Louisiana: 'LA',
    Maine: 'ME',
    Maryland: 'MD',
    Massachusetts: 'MA',
    Michigan: 'MI',
    Minnesota: 'MN',
    Mississippi: 'MS',
    Missouri: 'MO',
    Montana: 'MT',
    Nebraska: 'NE',
    Nevada: 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    Ohio: 'OH',
    Oklahoma: 'OK',
    Oregon: 'OR',
    Pennsylvania: 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    Tennessee: 'TN',
    Texas: 'TX',
    Utah: 'UT',
    Vermont: 'VT',
    Virginia: 'VA',
    Washington: 'WA',
    'West Virginia': 'WV',
    Wisconsin: 'WI',
    Wyoming: 'WY',
  }
  return abbreviations[stateName] || 'US'
}
