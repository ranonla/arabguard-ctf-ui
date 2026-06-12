export type PromptAnalysis = {
  id: number;
  prompt: string;
  normalized: string;
  intent_score: number;
  code_score: number;
  arabic_kw_score: number;
  keyword_score: number;
  decision: "SAFE" | "WARNING" | "BLOCKED";
};