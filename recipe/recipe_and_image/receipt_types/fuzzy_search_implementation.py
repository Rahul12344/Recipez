from fuzzywuzzy import fuzz

def fuzzy_match(pot_match_1, pot_match_2):
    return fuzz.partial_ratio(pot_match_1, pot_match_2)