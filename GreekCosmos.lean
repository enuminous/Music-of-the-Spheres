/-
  Epistemic record for the Greek-native/EFMW comparison.
  This file proves only facts about explicitly defined audit statuses.
  It does not prove the existence or dynamics of a cosmic harmony.
-/
namespace MusicOfTheSpheres

inductive EvidenceOrigin where
  | primaryText
  | historicalScholarship
  | formalAnalogy
  | experimentalReconstruction
  | physicalObservation
  deriving DecidableEq, Repr

inductive Verdict where
  | pass
  | fail
  | unresolved
  | notApplicable
  deriving DecidableEq, Repr

structure ResearchClaim (statement : Type) where
  claim : statement
  provenance : EvidenceOrigin
  verdict : Verdict

def Determined (v : Verdict) : Prop :=
  v = .pass ∨ v = .fail

theorem unresolved_not_determined : ¬ Determined .unresolved := by
  simp [Determined]

theorem not_applicable_not_determined : ¬ Determined .notApplicable := by
  simp [Determined]

/-- Reject the common mistake of upgrading "not applicable" to "pass". -/
theorem not_applicable_is_not_a_pass :
    Verdict.notApplicable ≠ Verdict.pass := by
  decide

/-- A dependency of unresolved status cannot itself be treated as
    a determined result by a rule that preserves dependency status. -/
def inheritQualification (premise conclusion : Verdict) : Verdict :=
  if premise = .unresolved then .unresolved
  else if premise = .fail then .fail
  else conclusion

theorem unresolved_propagates (v : Verdict) :
    inheritQualification .unresolved v = .unresolved := by
  rfl

theorem failed_premise_propagates (v : Verdict) :
    inheritQualification .fail v = .fail := by
  rfl

end MusicOfTheSpheres
