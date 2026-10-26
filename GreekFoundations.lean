/-
  Music of the Spheres: Greek-native foundational *formal analogy*.
  Modern Lean is an external metalanguage, not historical Greek mathematics.
  No non-being or zero constructor is admitted in the native object grammar.
  Euclid VII.1–2 distinguishes a unity from a multitude.
-/
namespace MusicOfTheSpheres

/-- Unity is distinct in type from a multitude. -/
inductive Unity where
  | given : Unity
  deriving DecidableEq, Repr

/-- Multitudes start from a dyad, rather than defining unity to be a number. -/
inductive Multitude where
  | dyad : Multitude
  | extend : Multitude → Multitude
  deriving DecidableEq, Repr

/-- Add one admitted unity to an existing multitude. -/
def adjoin (_u : Unity) (m : Multitude) : Multitude := .extend m

theorem adjoin_is_extension (u : Unity) (m : Multitude) :
    adjoin u m = Multitude.extend m := rfl

/-- Expressions of magnitude; "given" is an admitted positive kind
    by external stipulation, not a theorem that an arbitrary string exists. -/
inductive MagnitudeForm where
  | given : String → MagnitudeForm
  | compose : MagnitudeForm → MagnitudeForm → MagnitudeForm
  deriving Repr

/-- The only primitive comparison outcomes for admissible magnitudes. -/
inductive Comparison where
  | less | same | greater
  deriving DecidableEq, Repr

/-- An abstract Euclid-V-style language of positive repetitions and comparison.
    Laws beyond the supplied data must be separately established. -/
structure ProportionLanguage (α : Type) where
  repeat : Multitude → α → α
  compare : α → α → Comparison

/-- An abstract equimultiple criterion patterned on Elements V.5.
    This is a *definition*, not a derivation of all Euclid V. -/
def InProportion {α : Type} (L : ProportionLanguage α)
    (a b c d : α) : Prop :=
  ∀ (m n : Multitude),
    L.compare (L.repeat m a) (L.repeat n b) =
    L.compare (L.repeat m c) (L.repeat n d)

theorem proportion_reflexive {α : Type} (L : ProportionLanguage α)
    (a b : α) : InProportion L a b a b := by
  intro m n
  rfl

theorem proportion_symmetric {α : Type} (L : ProportionLanguage α)
    {a b c d : α} (h : InProportion L a b c d) :
    InProportion L c d a b := by
  intro m n
  exact (h m n).symm

theorem proportion_transitive {α : Type} (L : ProportionLanguage α)
    {a b c d e f : α}
    (h₁ : InProportion L a b c d)
    (h₂ : InProportion L c d e f) :
    InProportion L a b e f := by
  intro m n
  exact (h₁ m n).trans (h₂ m n)

end MusicOfTheSpheres
