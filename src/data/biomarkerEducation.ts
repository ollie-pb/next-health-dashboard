export interface BiomarkerEducation {
  id: string;
  title: string;
  description: string;
  whatItMeasures: string;
  whyItMatters: string;
  howToImprove: string;
}

export const biomarkerEducationData: Record<string, BiomarkerEducation> = {
  'glucose-fasting': {
    id: 'glucose-fasting',
    title: 'Fasting Glucose',
    description: 'Your blood sugar level after not eating for at least 8 hours.',
    whatItMeasures: 'The amount of glucose (sugar) in your blood when you haven\'t eaten recently.',
    whyItMatters: 'High fasting glucose can indicate insulin resistance or diabetes risk. Optimal levels support energy stability and metabolic health.',
    howToImprove: 'Reduce refined carbs, increase fiber intake, exercise regularly, maintain healthy weight, and consider intermittent fasting.'
  },
  'hba1c': {
    id: 'hba1c',
    title: 'HbA1c',
    description: 'Average blood sugar over the past 2-3 months.',
    whatItMeasures: 'The percentage of red blood cells that have glucose attached, showing long-term blood sugar control.',
    whyItMatters: 'Elevated HbA1c indicates poor blood sugar control and increased risk of diabetes complications.',
    howToImprove: 'Focus on low-glycemic foods, regular exercise, weight management, and consistent meal timing.'
  },
  'triglycerides': {
    id: 'triglycerides',
    title: 'Triglycerides',
    description: 'A type of fat found in your blood.',
    whatItMeasures: 'The level of triglyceride fats in your bloodstream, often elevated after eating.',
    whyItMatters: 'High triglycerides increase risk of heart disease and can indicate metabolic dysfunction.',
    howToImprove: 'Limit sugar and refined carbs, increase omega-3 fatty acids, exercise regularly, and lose excess weight.'
  },
  'vitamin-d': {
    id: 'vitamin-d',
    title: 'Vitamin D',
    description: 'The sunshine vitamin essential for bone health and immunity.',
    whatItMeasures: 'The level of 25-hydroxyvitamin D in your blood, the best indicator of vitamin D status.',
    whyItMatters: 'Adequate vitamin D supports bone health, immune function, mood regulation, and may reduce disease risk.',
    howToImprove: 'Get safe sun exposure, eat vitamin D-rich foods like fatty fish, and consider supplementation as recommended.'
  },
  'b12': {
    id: 'b12',
    title: 'Vitamin B12',
    description: 'Essential vitamin for nerve function and red blood cell formation.',
    whatItMeasures: 'The amount of vitamin B12 in your blood, crucial for neurological function.',
    whyItMatters: 'B12 deficiency can cause fatigue, neurological problems, and anemia. Essential for DNA synthesis.',
    howToImprove: 'Include B12-rich foods like meat, fish, eggs, and dairy. Vegans should consider supplementation.'
  },
  'insulin-fasting': {
    id: 'insulin-fasting',
    title: 'Fasting Insulin',
    description: 'The hormone that regulates blood sugar levels.',
    whatItMeasures: 'The amount of insulin in your blood after fasting, indicating how hard your body works to control blood sugar.',
    whyItMatters: 'Elevated fasting insulin suggests insulin resistance, increasing risk of diabetes and metabolic syndrome.',
    howToImprove: 'Reduce refined carbohydrates, practice intermittent fasting, exercise regularly, and maintain healthy weight.'
  },
  'processed-food-ratio': {
    id: 'processed-food-ratio',
    title: 'Processed Food Ratio',
    description: 'The percentage of your calories from ultra-processed foods.',
    whatItMeasures: 'How much of your diet consists of packaged, processed foods versus whole, natural foods.',
    whyItMatters: 'High processed food intake is linked to inflammation, weight gain, and chronic disease risk.',
    howToImprove: 'Focus on whole foods, cook at home more often, read ingredient labels, and choose minimally processed options.'
  },
  'eating-window': {
    id: 'eating-window',
    title: 'Eating Window',
    description: 'The number of hours per day you consume calories.',
    whatItMeasures: 'The time span between your first and last caloric intake each day.',
    whyItMatters: 'A shorter eating window may support metabolic health, weight management, and cellular repair processes.',
    howToImprove: 'Practice time-restricted eating, avoid late-night snacking, and maintain consistent meal timing.'
  }
};