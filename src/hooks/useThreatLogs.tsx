import { useQuery } from "@tanstack/react-query";

export const useThreatLogs = () => {
  return useQuery({
    queryKey: ["threat-logs"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        "/api/admin/threat-logs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      return data.logs.map((log: any, index: number) => ({
        id: index,
        raw_input: log.raw_input,
        model_output: log.model_output,
        decision: log.decision,
        is_compromised: log.is_compromised,
        arabguard_decision: log.arabguard_decision,
        character: log.character,
        target: log.target,
        blocked: log.blocked,
        normalized_text:
          log.arabguard_trace?.phase_1_normalization?.normalized_text,
        intent_score:
          log.arabguard_trace?.phase_1_normalization?.intent_score,
        code_score:
          log.arabguard_trace?.phase_1_normalization?.code_score,
        arabic_kw_score:
          log.arabguard_trace?.phase_1_normalization?.arabic_kw_score,
        keyword_score:
          log.arabguard_trace?.phase_1_normalization?.keyword_score,
        base_score:
          log.arabguard_trace?.phase_1_normalization?.base_score,
        pipeline_decision:
          log.arabguard_trace?.phase_1_normalization?.pipeline_decision,
        regex_fired:
          log.arabguard_trace?.phase_2_regex?.arabic?.fired ||
          log.arabguard_trace?.phase_2_regex?.english?.fired,
        regex_matches:
          (log.arabguard_trace?.phase_2_regex?.arabic?.match_count || 0) +
          (log.arabguard_trace?.phase_2_regex?.english?.match_count || 0),
        regex_score_bump:
          log.arabguard_trace?.phase_2_regex?.regex_score_bump,
        score_after_regex:
          log.arabguard_trace?.phase_2_regex?.score_after_regex,
        decision_after_regex:
          log.arabguard_trace?.phase_2_regex?.decision_after_regex,
        ai_activated:
          log.arabguard_trace?.phase_3_ai?.activated,
        ai_label:
          log.arabguard_trace?.phase_3_ai?.label,
        ai_confidence:
          log.arabguard_trace?.phase_3_ai?.confidence,
        ai_reason:
          log.arabguard_trace?.phase_3_ai?.reason,
        score_contribution:
          log.arabguard_trace?.phase_3_ai?.score_contribution,
        decision_after_ai:
          log.arabguard_trace?.phase_3_ai?.decision_after_ai,
        final_score:
          log.arabguard_trace?.final_score,
        final_decision:
          log.arabguard_trace?.final_decision,
      }));
    },
  });
};