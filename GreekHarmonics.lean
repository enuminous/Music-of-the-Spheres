/-
  Music of the Spheres: traditional harmonic ratios checked in an
  OUTSIDE mathematical metalanguage. Ancient string relations are described
  in the native historical layer without modern algebraic equivalences.
  No physical proposition about literal celestial sound is asserted.
-/
namespace MusicOfTheSpheres

/-- A measured sounding length is positive by its constructor witness.
    Nat and its zero are used only by the EXTERNAL Lean verifier. -/
structure PositiveLength where
  units : Nat
  admissible : 0 < units

/-- Comparison of string-length ratios by cross-composition of measures.
    This is a modern auditing representation of a classical proportion. -/
def SameLengthRatio (a b c d : PositiveLength) : Prop :=
  a.units * d.units = c.units * b.units

def lengthOne   : PositiveLength := ⟨1, by decide⟩
def lengthTwo   : PositiveLength := ⟨2, by decide⟩
def lengthThree : PositiveLength := ⟨3, by decide⟩
def lengthFour  : PositiveLength := ⟨4, by decide⟩
def lengthSix   : PositiveLength := ⟨6, by decide⟩
def lengthEight : PositiveLength := ⟨8, by decide⟩

/-- Double proportion and its equal enlarged construction. -/
theorem octave_pair :
    SameLengthRatio lengthTwo lengthOne lengthFour lengthTwo := by
  change (2 : Nat) * 2 = 4 * 1
  decide

/-- Sesquialter and its corresponding enlarged construction. -/
theorem fifth_pair :
    SameLengthRatio lengthThree lengthTwo lengthSix lengthFour := by
  change (3 : Nat) * 4 = 6 * 2
  decide

/-- Sesquitertian and its corresponding enlarged construction. -/
theorem fourth_pair :
    SameLengthRatio lengthFour lengthThree lengthEight lengthSix := by
  change (4 : Nat) * 6 = 8 * 3
  decide

theorem same_length_ratio_refl (a b : PositiveLength) :
    SameLengthRatio a b a b := by
  rfl

theorem same_length_ratio_symm {a b c d : PositiveLength}
    (h : SameLengthRatio a b c d) :
    SameLengthRatio c d a b := by
  exact h.symm

/- No theorem here establishes that the heavens sound or that music
   imposes a force law on astronomical bodies. -/
end MusicOfTheSpheres
